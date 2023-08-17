const express = require('express')
const router = express.Router()

const catContoller = require('../controllers/catController')
const payloadController = require('../controllers/payloadController')

router.get('/sortedCatBreeds', catContoller.getCatBreeds)

router.post('/payload', payloadController.createPayload)


module.exports = router