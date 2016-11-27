var connection = require('../connection');

function Tickets() {
  this.getTransits = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from qua_canh', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  this.addTransit = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('insert into qua_canh set ?', payload, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record created failed'});
        } else {
          res.send({status: 0, message: 'Record created successfully'});
        }
      });
    });
  };
  this.updateTransit = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('update qua_canh set ?', payload, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record created failed'});
        } else {
          res.send({status: 0, message: 'Record created successfully'});
        }
      });
    });
  };

  this.deteleTransit = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('delete from qua_canh where MaQuaCanh = ?', payload.Ma, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record updated failed'});
        } else {
          res.send({status: 0, message: 'Record updated successfully'});
        }
      });
    });
  };
}

module.exports = new Tickets();