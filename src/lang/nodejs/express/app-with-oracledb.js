// app-with-oracledb.js

const port = 3000;

var express = require('express');
var app = express();
var db = require('./db/oracledb.js');
app.set('view engine', 'jade');
app.set('views', './views');


app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/employees', (req,res) => {
  db.query(`select USER_ID, USER_NAME from employee WHERE ROWNUM < 10`
    , []
    , (err, result) => {
      var document = {employees: result.rows};
      // var employees = [{name:'John', id:'hansome.john'}, {name:'Betty', id:'be.bujang'}];
      res.render('employees', document);
  });
});

app.get('/employees/:id', (req,res) => {
  db.query(`select USER_ID, USER_NAME from employee WHERE id = :id`
    , [req.params.id]
    , (err, result) => {
      console.log(result);
      if(result.rows.length == 1) {
        var document = {employee: result.rows[0]};
        res.render('employee', document);
      } else {
        res.send('조회된 직원이 없습니다.');
      }
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
