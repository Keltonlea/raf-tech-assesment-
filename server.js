// Import the mysql library 
const express = require('express')
const mysql = require('mysql2');

const app = express();

//Create a connection to the mysql server

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Carmel360',
    database: 'parcel_db'
});

app.get('/', function(req, res){
    connection.query('SELECT * FROM mytable', function(error, results, fields){
        if (error) throw error;
        res.send(results);
        console.log('works')
    });
});

app.get('/', function(req, res){
  connection.query('SELECT * FROM mytable', function(error, results, fields){
      if (error) throw error;
      console.log(results);
      // res.send('Table data printed in console')
  });
});

app.listen(3000, function(){
    console.log('Server listening on port 3000')
});