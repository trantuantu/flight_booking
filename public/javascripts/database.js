var mysql = require('mysql');
var database =  {
    conn : null,
    getConnection : function () {
       if (this.conn == null)
       {
       	//Change the database parameters (if need) to connect
	       	this.conn = mysql.createConnection({
	  		host: "localhost",
	  		user: "root",
	  		password: "",
	  		database: "test",
	  		multipleStatements: true
	  });
		  this.conn.connect(function(err){
		  if(err){
		    console.log('Can not connect to database. Please check mysql service is on');
		    return;
		  }
		  	console.log('Connected to database');
	  });

	  	return this.conn;
	   }else return this.conn;
	}
}
module.exports = database;