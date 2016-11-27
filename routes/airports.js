var express = require('express');
var router = express.Router();
var airports = require('../models/airports');

router.get('/', function(req, res) {
  airports.getAirports(res);
});

router.get('/:id', function(req, res) {
  airports.getDestinationAirport(req.params.id, res);
});

module.exports = router;