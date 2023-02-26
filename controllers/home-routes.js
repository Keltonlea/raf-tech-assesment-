const router = require('express').Router();
const mysql = require('mysql2');
const { engine } = require('express-handlebars');



// Create a new MySQL connection pool using environment variables
const pool = mysql.createPool({
  connectionLimit : 10,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  database        : process.env.DB_NAME
});


// Render the home page with the parcel data
router.get('/', (req, res) => {
  pool.query('SELECT * FROM mytable', (error, results, fields) => {
    if (error) {
      console.error('Error retrieving data from database: ' + error.stack);
      res.status(500).send('Internal server error');
      return;
    }
    // Add maplink column to the result
    const parcels = results.map((parcel) => {
      const address = parcel.address;
      const api_key = 'AIzaSyBitp-D5fzf3sFeHVQ8idSV62EFjf6y5AM'
      const maplink = `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${address}, Mazama, WA`
      return { ...parcel, maplink};
    });
    res.render('home', {parcels});
  });
});

  router.get('/map', (req, res) => {
    const address = req.query.address;
    const address_with_city_state = `${address}, Mazama, WA`;
    const api_key = 'AIzaSyBitp-D5fzf3sFeHVQ8idSV62EFjf6y5AM'; 
    const maplink = `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${address_with_city_state}`
    res.render('map', { maplink });
  });

//   // Render table by street name 
  router.get('/streetname', function(req, res) {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database: ' + err.stack);
        res.status(500).send('Internal server error');
        return;
      }
  
      connection.query('SELECT * FROM mytable ORDER BY address', function(error, results, fields){
        connection.release();
  
        if (error) {
          console.error('Error retrieving data from database: ' + error.stack);
          res.status(500).send('Internal server error');
          return;
        }
  
        var data = groupDataByStreetName(results);
        res.render('streetname', { data });
      });
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



// Render table to sort by first name 
router.get('/firstname', function(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      res.status(500).send('Internal server error');
      return;
    }

    connection.query('SELECT * FROM mytable ORDER BY owner', function(error, results, fields) {
      connection.release();

      if (error) {
        console.error('Error retrieving data from database: ' + error.stack);
        res.status(500).send('Internal server error');
        return;
      }

      const data = groupDataByOwner(results);
      res.render('firstname', {data: data});
    });
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

  module.exports = router;
