const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const request = require('request')
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

router.get('/', rejectUnauthenticated, (req, res) => {
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
    // POST route code here
    const newFriendID = req.params.id

    const query = `INSERT INTO friend (user1_id, user2_id)
                    VALUES ($1, $2)`

    pool
    .query(query, [req.user.id, newFriendID])
    .then(results => {
        res.sendStatus(201)
    })
    .catch(err => {
        console.log(err)
    })

  });
  
  module.exports = router;