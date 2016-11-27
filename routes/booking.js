var express = require('express');
var router = express.Router();
var booking = require('../models/booking');

// router.get('/info/:id', function(req, res) {
//   booking.getBookingInfo(req.params.id, res);
// });
router.get('/info', function(req, res) {
  booking.getBookingInfo(req.query, res);
});
router.get('/infobyflight', function(req, res) {
  booking.getBookingInfoByFlight(req.query, res);
});

router.get('/', function(req, res) {
  booking.getBooking(res);
});
router.put('/', function(req, res) {
  booking.bookFlight(req.body, res);
});
router.put('/:id', function(req, res) {
  booking.confirmBooking(req.body, res);
});
router.delete('/', function(req, res) {
  booking.cancelBooking(req.body, res);
});

module.exports = router;