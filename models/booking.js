 var connection = require('../connection');

function Booking() {
  this.getBookingInfo = function(req, res) {
    console.log("Hello");
    connection.acquire(function(err, con) {
      con.query('select MaChuyenBay, Ngay, Hang, MucGia, GiaBan from chi_tiet_chuyen_bay where MaDatCho = ?', req.id, function(err, result) {
        con.release();
        if (err)
          console.log(err);
        res.send(result);
      });
    });
  };

 this.getBookingInfoByFlight = function(req, res) {
    console.log("Hello");
    connection.acquire(function(err, con) {
      con.query('select MaDatCho, Hang, MucGia, GiaBan from chi_tiet_chuyen_bay where MaChuyenBay = ? and Ngay =?', [req.flight, req.date], function(err, result) {
        con.release();
        if (err)
          console.log(err);
        res.send(result);
      });
    });
  };

  this.getBooking = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from dat_ve', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.bookFlight = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('insert into dat_ve set ?', payload, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record created failed'});
        } else {
          res.send({status: 0, message: 'Record created successfully'});
        }
      });
    });
  };

  this.confirmBooking = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('update dat_ve set TrangThai = 1 where Ma = ?', payload.Ma, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record updated failed'});
        } else {
          res.send({status: 0, message: 'Record updated successfully'});
        }
      });
    });
  };

  this.cancelBooking = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('delete from dat_ve where Ma = ?', payload.Ma, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record deletion failed'});
        } else {
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
  };
}

module.exports = new Booking();