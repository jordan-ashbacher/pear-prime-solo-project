const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware.js");

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log('restaurant post user:', req.user)
  console.log(req.body)

  const restaurantQuery = `INSERT INTO restaurant (name, image, place_id)
                VALUES ($1, $2, $3)
                RETURNING id`

    pool
    .query(restaurantQuery, [req.body.name, req.body.image, req.body.place_id])
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
});

module.exports = router;