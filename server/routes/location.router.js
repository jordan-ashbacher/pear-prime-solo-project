const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require("dotenv").config();
const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware.js");
const { default: axios } = require('axios');

/**
 * GET route template
 */
router.put('/:city', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const city = req.params.city

  axios
  .get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}&key=${process.env.GOOGLE_API_KEY}`)
  .then(results => {
    console.log(results.data.results[0].geometry)
    const location = {
        city: results.data.results[0].name,
        lat: results.data.results[0].geometry.location.lat,
        lng: results.data.results[0].geometry.location.lng
    }
    console.log(location)

    const query = `UPDATE "user"
                    SET "city" = $1, "lat" = $2, "lng" = $3
                    WHERE id = $4`

    pool
    .query(query, [location.city, location.lat, location.lng, req.user.id])
    .then(() => res.sendStatus(201))
    .catch(err => {
        console.log('Error in updating user location', err)
        res.sendStatus(500)
    })

  })
  .catch(err => {
      console.log('Error in location update', err)
      res.sendStatus(500)
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;