var connection = require('../connection');

function Passengers() {
    this.getPassengers = function(res) {
        connection.acquire(function(err, con) {
            con.query('select * from hanh_khach', function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };
    this.getPassengersFromFlight = function(flight, date, res) {
        connection.acquire(function(err, con) {
            con.query('select hanh_khach.MaDatCho, hanh_khach.DanhXung, hanh_khach.Ho, hanh_khach.ten from chi_tiet_chuyen_bay inner join hanh_khach on chi_tiet_chuyen_bay.MaDatCho = hanh_khach.MaDatCho where chi_tiet_chuyen_bay.MaChuyenBay = ? and chi_tiet_chuyen_bay.Ngay = ?', [flight, date], function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };
    this.addPassengers = function(payload, res) {
        console.log(payload);
        connection.acquire(function(err, con) {
            con.query('insert into hanh_khach set ?', payload, function(err, result) {
                con.release();
                console.log(err);
                if (err) {
                    res.send({ status: 1, message: 'Record creation failed' });
                } else {
                    res.send({ status: 0, message: 'Record creation successfully' });
                }
            });
        });
    };
    this.getPassengersWithId = function(payload, res) {
        console.log(payload);
        connection.acquire(function(err, con) {
            con.query('select * from hanh_khach where MaDatCho = ?', payload.id, function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };
}

module.exports = new Passengers();
