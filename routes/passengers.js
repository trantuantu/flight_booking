var express = require('express');
var router = express.Router();
var passengers = require('../models/passengers');

router.get('/:flight/:date', function(req, res) {
  passengers.getPassengersFromFlight(req.params.flight, req.params.date, res);
});
router.put('/', function(req, res) {
  passengers.addPassengers(req.body, res);
});
router.get('/', function(req, res) {
  passengers.getPassengersWithId(req.query, res);
});

module.exports = router;