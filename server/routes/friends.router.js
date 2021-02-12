const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const request = require('request')
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

router.get('/all', rejectUnauthenticated, (req, res) => {
    // GET route code here
    const query = `SELECT id, first_name, last_name, username, current_location FROM "user" WHERE id NOT IN ($1)`

    pool
    .query(query, [req.user.id])
    .then(results => {
        res.send(results.rows)
    })
    .catch(err => {
        console.log(err)
    })
  });
  
  
  router.post('/:id', rejectUnauthenticated, (req, res) => {
    const newFriendID = req.params.id
    const userID = req.user.id
    
    //check if friendship already exists in the database
    const friendshipQuery = `SELECT id FROM friend
    WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1);`

    pool
    .query(friendshipQuery, [userID, newFriendID])
    .then(results => {
        if (results.rows.length > 0) {
            res.sendStatus(200)
        } else {
            // Add friend if friendship doesn't already exist in database
            const newFriendQuery = `INSERT INTO friend (user1_id, user2_id)
            VALUES ($1, $2)`

            pool
            .query(newFriendQuery, [req.user.id, newFriendID])
            .then(results => {
            res.sendStatus(201)
            })
            .catch(err => {
            console.log(err)
            })
        }
    })
    .catch(err => {
        console.log('Error in checking existing friendship:', err)
    })
  });

  router.get('/', rejectUnauthenticated, (req, res) => {
      const userID = req.user.id
      const query = `SELECT user2_id, "user".first_name, "user".last_name, "user".username, "user".current_location FROM friend
                    JOIN "user" ON "user".id = friend.user2_id
                    WHERE user1_id = $1
                    UNION
                    SELECT user2_id, "user".first_name, "user".last_name, "user".username, "user".current_location FROM friend
                    JOIN "user" ON "user".id = friend.user1_id
                    WHERE user2_id = $1;`

    pool
    .query(query, [userID])
    .then(results => {
        res.send(results.rows)
    })
    .catch(err => {
        console.log('Error fetching friends:', err)
    })
  })
  
  module.exports = router;