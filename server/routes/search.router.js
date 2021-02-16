const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const request = require('request')
require("dotenv").config();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

/**
 * GET route template
 */
router.get('/:q', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const query = req.params.q
  console.log(query)
  axios
  .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.user.lat},${req.user.lng}&radius=32000&type=restaurant&keyword=${query}&key=${process.env.GOOGLE_API_KEY}`)
  .then((response) => {
      const results = response.data.results.map((place) => ({
          place_id: place.place_id,
          name: place.name,
          image: place.photos[0].photo_reference,
          address: place.vicinity
      }))
      res.send(results)
  })
  .catch((err) => {
      console.log('Error in API request', err)
      res.sendStatus(err)
  })
});

router.get('/image/:image', (req, res) => {
    const image = req.params.image
    // console.log(image)
    //Google Place Photo API request with photo_reference key from RestaurantItem
    const imageSearchURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${image}&key=${process.env.GOOGLE_API_KEY}`

    //sends photo from Google Place to img src in RestaurantItem
    request(imageSearchURL).pipe(res)

})

router.get('/user/:query', rejectUnauthenticated, (req, res) => {
  console.log('in user search')
  const searchText = `%${req.params.query}%`
  const query = `SELECT id, first_name, last_name, username, current_location FROM "user"
  WHERE (first_name ILIKE $1 OR last_name ILIKE $1 OR username ILIKE $1) AND id NOT IN ($2)`

  pool
  .query(query, [searchText, req.user.id])
  .then(results => {
    console.log(results.rows)
    res.send(results.rows)
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500)
  })

})

router.get('/friends/:query', rejectUnauthenticated, (req, res) => {
  const searchText = `%${req.params.query}%`
  const query = `SELECT "user".id, "user".first_name, "user".last_name, "user".username, "user".current_location FROM friend
  JOIN "user" ON "user".id = friend.user2_id
  WHERE user1_id = $1 AND (first_name ILIKE $2 OR last_name ILIKE $2 OR username ILIKE $2)
  UNION
  SELECT "user".id, "user".first_name, "user".last_name, "user".username, "user".current_location FROM friend
  JOIN "user" ON "user".id = friend.user1_id
  WHERE user2_id = $1 AND (first_name ILIKE $2 OR last_name ILIKE $2 OR username ILIKE $2);`

  pool
  .query(query, [req.user.id, searchText])
  .then(results => {
    console.log(results.rows)
    res.send(results.rows)
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router;