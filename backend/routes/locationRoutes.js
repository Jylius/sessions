const express = require('express');
const router = express.Router();
const illerController = require('../controllers/illerController');

router.get('/iller', illerController.getAllCities);

router.get('/iller/:il', illerController.getDistrictsByCity);

module.exports = router;
