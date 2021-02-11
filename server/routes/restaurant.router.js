const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require("dotenv").config();
const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware.js");


router.post('/:id', rejectUnauthenticated, (req, res) => {
    // GET route code here

    const databaseQuery = `SELECT "id" from restaurant
    WHERE "place_id" LIKE '${req.params.id}';`

    pool
    .query(databaseQuery)
    .then(results => {
        console.log(results.rows)
        if (results.rows.place_id === req.params.id) {
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
  
  });

 router.get('/', rejectUnauthenticated, (req, res) => {
     const query = `SELECT restaurant.address, restaurant.city, restaurant.name, restaurant.phone, restaurant.photo1, restaurant.photo2, restaurant.photo3, restaurant.photo4, restaurant.photo5, restaurant.place_id, restaurant.rating, restaurant.id, restaurant.website FROM restaurant
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

module.exports = router;