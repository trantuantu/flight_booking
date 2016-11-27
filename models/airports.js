var connection = require('../connection');

function Airports() {
  this.getAirports = function(res) {
    connection.acquire(function(err, con) {
      if (err) throw err;
      con.query('select * from san_bay', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getDestinationAirport = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT distinct t.NoiDen, u.TenDiaDanh FROM thong_tin_chuyen_bay t inner join san_bay u on t.NoiDen = u.Ma where t.NoiDi = ?', id, function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
}

module.exports = new Airports();