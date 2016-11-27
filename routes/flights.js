var express = require('express');
var router = express.Router();
var flights = require('../models/flights');

router.get('/', function(req, res) {
  flights.getFlights(res);
});
router.post('/', function(req, res) {
	flights.addFlight(req.body, res);
})
router.get('/search', function(req, res) {
  flights.searchFlights(req.query,res);
});
router.put('/', function(req, res) {
  flights.updateFlight(req.body,res);
});
router.delete('/', function(req, res) {
  flights.deleteFlight(req.query,res);
});
router.get('/info', function(req, res) {
  flights.getFlightsInfo(res);
});
router.post('/info', function(req, res) {
  flights.addFlightInfo(req.body,res);
});
router.put('/info', function(req, res) {
  flights.updateFlightInfo(req.body,res);
});
router.delete('/info', function(req, res) {
  flights.deleteFlightInfo(req.query,res);
});
router.get('/detail/:id', function(req, res) {
  flights.getFlightDetail(req.params.id, res);
});
router.post('/detail', function(req, res) {
  flights.addFlightDetail(req.body, res);
});

module.exports = router;