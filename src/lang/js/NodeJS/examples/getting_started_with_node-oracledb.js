// getting_started_with_node-oracledb.js

var oracledb = require('oracledb');

oracledb.getConnection(
	{
    user          : "scott",
    password      : "tiger",
    connectString : "localhost/XE"
  	},
	(err, conn) => {
		if(err) {
			console.error('ERR: ' + err.message);
			return;
		}
		conn.execute(
			`select sysdate from dual`,
 			// [1499218921925], // bind value
			(err, result) => {
				if(err) {
			  		console.error('ERR: ' + err.message);
			  		doRelease(conn);
			  		return;
			  	}
			  	console.log(result.rows);
			  	doRelease(conn);
 		    }); 
	});

function doRelease(conn) {
	conn.close((err) => {
		if(err)
			console.error(err.message);
	});
}
