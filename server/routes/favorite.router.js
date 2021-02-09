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
  console.log('favorite post user:', req.user)
  const restaurantID = req.body.place_id
  console.log(req.body)

  const query = `INSERT INTO favorite (user_id, restaurant_id)
                VALUES ($1, $2)`

  

});

module.exports = router;
