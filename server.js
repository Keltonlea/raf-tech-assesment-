// Import the mysql library 
const express = require('express')
const mysql = require('mysql2');
const fs = require ('fs')

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





// app.get('/streetname', function(req, res) {
//   fs.readFile('/Users/keltonLeach/Documents/assessments/raf-tech-assessment/db/Parcels.txt', 'utf8', function(err, data) {
//     if (err) throw err;
//     let dataArray = data.split('\n');
//     let sortedArray = dataArray.sort(function(a, b) {
//       let streetA = a.split('|')[1].toUpperCase(); // get street name from first pipe-separated value and convert to uppercase
//       let streetB = b.split('|')[1].toUpperCase(); // get street name from first pipe-separated value and convert to uppercase
//       if (streetA < streetB) {
//         return -1;
//       }
//       if (streetA > streetB) {
//         return 1;
//       }
//       return 0;
//     });
//     res.send(sortedArray);
//   });
// });
app.get('/streetname', function(req, res){
  connection.query('SELECT * FROM mytable ORDER BY address', function(error, results, fields){
      if (error) throw error;
      var data = groupDataByStreetName(results);
      res.send(data);
  });
});
function groupDataByStreetName(data) {
  // Create an object to hold the grouped data
  const groupedData = {};

  // Loop through each row of data
  data.forEach(row => {
    // Extract the street name from the address field
    const streetName = row.address.split(' ')[1];

    // If this is the first row with this street name, create a new array
    if (!groupedData[streetName]) {
      groupedData[streetName] = [];
    }

    // Add this row to the array for the street name
    groupedData[streetName].push(row);
  });

  // Sort the grouped data by street name
  const sortedData = {};
  Object.keys(groupedData).sort().forEach(streetName => {
    sortedData[streetName] = groupedData[streetName];
  });

  return sortedData;
}

// app.get('/streetnumber', function(req, res){
//   connection.query('SELECT * FROM mytable ORDER BY CAST(SUBSTRING_INDEX(address, " ", 1) AS UNSIGNED)', function(error, results, fields){
//       if (error) throw error;
//       var data = groupDataByStreetNumber(results);
//       res.send(data);
//   });
// });



app.listen(3000, function(){
    console.log('Server listening on port 3000')
});