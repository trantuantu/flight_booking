var express = require('express');
var router = express.Router();
var transits = require('../models/transits');

router.get('/', function(req, res) {
  transits.getTransits(res);
});
router.post('/', function(req, res) {
  transits.addTransit(req.body, res);
})
router.put('/', function(req, res) {
  transits.updateTransit(req.body,res);
});
router.delete('/', function(req, res) {
  transits.deleteTransit(req.body,res);
});

module.exports = router;