// Import the mysql library 
const express = require('express')
const mysql = require('mysql');

const app = express();

//Create a connection to the mysql server

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Carmel360',
    database: 'parcel_db'
},
console.log('Connected to the parcel_db databse')
);

app.get('/parcels', function(req, res){
    connection.query('SELECT * FROM mytable', function(error, results, fields){
        if (error) throw error;
        res.send(results);
    });
});

app.listen(3000, function(){
    console.log('Server listening on port 3000')
});
