const express = require('express');
const mysql = require('mysql2');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

app.use(express.static('public'));



//Create a connection to the mysql server

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Carmel360',
    database: 'parcel_db'
});

// Set up Handlebars as the template engine
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');




// Render the home page with the parcel data
app.get('/', (req, res) => {
  connection.query('SELECT * FROM mytable', (error, results, fields) => {
    if (error) throw error;
    res.render('home', { parcels: results });
  });
});

// Render table by street name 

app.get('/streetname', function(req, res){
  connection.query('SELECT * FROM mytable ORDER BY address', function(error, results, fields){
      if (error) throw error;
      var data = groupDataByStreetName(results);
      res.render('streetname', { data });
  });
});

function groupDataByStreetName(data) {
  // Create an object to hold the grouped data
  const groupedData = {};

  // Check if data is an array
  if (!Array.isArray(data)) {
    return groupedData;
  }

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

// If we want to add street number, this renders not on the table, but can be changed to do so

// app.get('/streetnumber', function(req, res){
//   connection.query('SELECT * FROM mytable ORDER BY CAST(SUBSTRING_INDEX(address, " ", 1) AS UNSIGNED)', function(error, results, fields){
//       if (error) throw error;
//       var data = groupDataByStreetNumber(results);
//       res.send(data);
//   });
// });

// function groupDataByStreetNumber(data) {
//   const groups = {};
//   for (let i = 0; i < data.length; i++) {
//     const address = data[i].address;
//     if (!address) continue;
//     const streetNumber = parseInt(address.split(' ')[0]);
//     if (isNaN(streetNumber)) continue;
//     if (!groups[streetNumber]) {
//       groups[streetNumber] = [];
//     }
//     groups[streetNumber].push(data[i]);
//   }
//   const sortedGroups = {};
//   Object.keys(groups).sort((a, b) => a - b).forEach(key => {
//     sortedGroups[key] = groups[key];
//   });
//   return sortedGroups;
// }


// Render table to sort by first name 
app.get('/firstname', function(req, res) {
  connection.query('SELECT * FROM mytable ORDER BY owner', function(error, results, fields) {
    if (error) throw error;
    const data = groupDataByOwner(results);
    res.render('firstname', {data: data}); // pass the data object to the view
  });
});

function groupDataByOwner(results) {
  const data = {};
  for (let i = 0; i < results.length; i++) {
    const row = results[i];
    if (!row.owner) { // check if owner field is null or undefined
      continue; // skip this row
    }
    const commaIndex = row.owner.indexOf(",");
    if (commaIndex === -1) { // check if comma is not found in owner field
      continue; 
    }
    const firstName = row.owner.substring(commaIndex + 1).trim();
    if (!firstName) {
      continue; 
    }
    if (!data[firstName]) {
      data[firstName] = [];
    }
    data[firstName].push(row);
  }
  // sort the keys in alphabetical order
  const sortedKeys = Object.keys(data).sort();
  const sortedData = {};
  for (let i = 0; i < sortedKeys.length; i++) {
    const key = sortedKeys[i];
    sortedData[key] = data[key];
  }
  return sortedData;
}



// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});