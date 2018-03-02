var oracledb = require('oracledb');

var poolAttrs = {
  user          : "scott",
  password      : "tiger",
  connectString : "localhost/XE"
  poolMin: 4,
  poolMax: 8
};

oracledb.createPool(poolAttrs, (err, pool) => {
  if(err)
    console.error(err.message);

  console.log('connected with driver version ' + oracledb.versionString);
  pool.getConnection((err, conn) => {
    if(err)
      console.error(err.message);
    conn.execute(`select 'Connection pool is ready.' from dual`, (err, result) => {
      if(err) {
        console.error(err.message);
        release(conn);
        return;
      }
      console.log(result.rows);
      release(conn);
    });
  });
});

function release(conn) {
  conn.close((err) => {
    if(err)
      console.error(err.message);
  });
}

exports.query = function(sql, bindVars, callback) {
  var pool = oracledb.getPool();
  pool.getConnection((err, conn) => {
    if(err) {
      console.error(err.message);
      release(conn);
      return;
    }
    conn.execute(sql, bindVars, { outFormat: oracledb.OBJECT }, (err, result) => {
      callback(err, result);
      //release(conn);
    });

  });
}
