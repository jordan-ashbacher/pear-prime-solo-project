const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require("dotenv").config();

/**
 * GET route template
 */
router.get('/:q', (req, res) => {
  // GET route code here
  const query = req.params.q
  axios
  .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.032490,-93.267290&radius=32000&type=restaurant&keyword=${query}&key=${process.env.GOOGLE_API_KEY}`)
  .then((response) => {
      const results = response.data.results.map((place) => ({
          place_id: place.place_id,
          name: place.name,
          image: place.photos[0].photo_reference
      }))
      res.send(results)
  })
  .catch((err) => {
      console.log('Error in API request', err)
      res.sendStatus(err)
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;