const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const request = require('request')
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

router.get('/:friendID', rejectUnauthenticated, (req, res) => {
    const friendID = req.params.friendID
    const userID = req.user.id
    const userCity = req.user.current_location
    const query = `SELECT A.restaurant_id, restaurant.address, restaurant.city, restaurant.name, restaurant.phone, restaurant.photo1, restaurant.photo2, restaurant.photo3, restaurant.photo4, restaurant.photo5, restaurant.place_id, restaurant.rating, restaurant.id, restaurant.website, COUNT(A.restaurant_id) FROM favorite A
    INNER JOIN (SELECT restaurant_id, COUNT(*)
                FROM favorite
                GROUP BY restaurant_id
                HAVING COUNT(*) > 1
            ) B ON A.restaurant_id = B.restaurant_id
    JOIN restaurant ON restaurant.id = A.restaurant_id
    JOIN "user" ON "user".id = A.user_id		
    WHERE user_id = $1 OR user_id = $2 AND restaurant.city = $3
    GROUP BY A.restaurant_id, restaurant.address, restaurant.city, restaurant.name, restaurant.phone, restaurant.photo1, restaurant.photo2, restaurant.photo3, restaurant.photo4, restaurant.photo5, restaurant.place_id, restaurant.rating, restaurant.id, restaurant.website
    HAVING COUNT(*) > 1;`

    pool
    .query(query, [userID, friendID, userCity])
    .then(results => {
        console.log(results.rows)
        res.send(results.rows)
    })
    .catch(err => {
        console.log(err)
    })
  });

  
module.exports = router