const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const request = require('request')
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

router.get('/:placeID', rejectUnauthenticated, (req, res) => {
    const placeID = req.params.placeID

    axios
    .get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&key=${process.env.GOOGLE_API_KEY}`)
    .then((results) => {
        const address = results.data.result.formatted_address
        const formattedAddress = address.slice(0, -5)
        const restaurant = {
            city: req.user.current_location,
            address: formattedAddress,
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
        res.send(restaurant)
    })
    .catch(err => {
            console.log('error fetching details', err)
    })
})

module.exports = router