const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require("dotenv").config();
const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware.js");

//Post to add restaurant to database and new favorite entry for current user
router.post('/:id', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log('IN ADD NEW RESTAURANT ROUTER')
    console.log(req.params.id)

    //Query to see if restaurant is already a favorite of current user
    const favoriteQuery = `SELECT user_id, restaurant_id from favorite
    JOIN restaurant ON favorite.restaurant_id = restaurant.id
    WHERE restaurant.place_id LIKE $1 AND favorite.user_id = $2`

    pool
    .query(favoriteQuery, [req.params.id, req.user.id])
    .then(result => {
        //If user has already added as a favorite, exit post
        if(result.rows.length > 0) {
            res.sendStatus(200)
        } else {
            //Query to see if restaurant is already in database
            const databaseQuery = `SELECT id from restaurant
            WHERE "place_id" LIKE $1;`

            pool
            .query(databaseQuery, [req.params.id])
            .then(results => {
                //If restaurant is already in database, only add to user's favorites
                if (results.rows.length > 0) {
                    const restaurantID = results.rows[0].id
                
                        const favoriteQuery = `INSERT INTO favorite (user_id, restaurant_id)
                                VALUES ($1, $2)`
                
                        pool
                        .query(favoriteQuery, [req.user.id, restaurantID])
                        .then(result => {
                            res.sendStatus(201)
                        }).catch(err => {
                            console.log(err)
                            res.sendStatus(500)
                        })
                } else {
                    //If restaurant isn't in database. Get place details from Google and add restaurant to database with new favorite for current user
                    const id = req.params.id
                    axios
                    .get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${process.env.GOOGLE_API_KEY}`)
                    .then(results => {
                        const restaurant = {
                            city: results.data.result.address_components[3].long_name,
                            address: results.data.result.formatted_address,
                            phone: results.data.result.formatted_phone_number,
                            name: results.data.result.name,
                            photo1: results.data.result.photos[0].photo_reference,
                            photo2: results.data.result.photos[1].photo_reference,
                            photo3: results.data.result.photos[2].photo_reference,
                            photo4: results.data.result.photos[3].photo_reference,
                            photo5: results.data.result.photos[4].photo_reference,
                            place_id: results.data.result.place_id,
                            rating: results.data.result.rating,
                            website: results.data.result.website
                        }
                
                        console.log(restaurant)
                
                        const restaurantQuery = `INSERT INTO restaurant (city, address, phone, name, photo1, photo2, photo3, photo4, photo5, place_id, rating, website)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                        RETURNING id`
                
                        pool
                        .query(restaurantQuery, [restaurant.city, restaurant.address, restaurant.phone, restaurant.name, restaurant.photo1, restaurant.photo2, restaurant.photo3, restaurant.photo4, restaurant.photo5, restaurant.place_id, restaurant.rating, restaurant.website])
                        .then(result => {
                        console.log('new restaurant id:', result.rows[0].id)
                
                        const restaurantID = result.rows[0].id
                
                        const favoriteQuery = `INSERT INTO favorite (user_id, restaurant_id)
                                VALUES ($1, $2)`
                
                        pool
                        .query(favoriteQuery, [req.user.id, restaurantID])
                        .then(result => {
                            res.sendStatus(201)
                        }).catch(err => {
                            console.log(err)
                            res.sendStatus(500)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.sendStatus(500)
                    })
                
                
                    })
                    .catch(err => {
                        console.log(err)
                    }) 
                }
            }) 
                }
            })
            .catch(err => {
                console.log(err)
            })

    
  
  });

  //Get favorite restaurant details for users current location
 router.get('/', rejectUnauthenticated, (req, res) => {
     const query = `SELECT restaurant.address, restaurant.city, restaurant.name, restaurant.phone, restaurant.photo1, restaurant.photo2, restaurant.photo3, restaurant.photo4, restaurant.photo5, restaurant.place_id, restaurant.rating, restaurant.id, restaurant.website, favorite.notes, favorite.id AS "favorite_id" FROM restaurant
     JOIN favorite ON restaurant.id = favorite.restaurant_id
     JOIN "user" on "user".id = favorite.user_id
     WHERE "user".id = $1 AND "user".current_location = restaurant.city`

     pool
     .query(query, [req.user.id])
     .then(result => {
         res.send(result.rows)
     })
     .catch(err => {
         console.log('Error fetching restaurants', err)
         res.sendStatus(500)
     })
 }) 

 router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
     const query = `DELETE FROM favorite WHERE id = $1`

     pool
     .query(query, [req.params.id])
     .then(result => {
         res.sendStatus(200)
     })
     .catch(err => {
         console.log(err)
         res.sendStatus(500)
     })
 })

 router.put('/note', rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    const note = req.body.note
    const id = req.body.id 
    const query = `UPDATE favorite
                    SET notes = $1
                    WHERE id = $2`

    pool
    .query(query, [note, id])
    .then(results => {
        res.sendStatus(200)
    })
    .catch(err => {
        console.log(err)
    })
 })

module.exports = router;