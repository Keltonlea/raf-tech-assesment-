# Parcel Data Sorter


## Table of Contents
* [Description](#Description)
* [Installation](#installation)
* [Tech](#Tech)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Description 
This is a full-stack web application using a MVC paradigm that lets users sort and view data in a table format. The user can sort the data by street name or first name, and click on a link to view each address in Google Maps.

![Screenshot of search results](./assets/images/parcelscreenshot.png)
![Screenshot of search results](./assets/images/parcelscreenshot2.png)



## Installation 
This application requires node.js.
* The user should fork the repository from GitHub and install all dependecies with npm i.
* Create a .env file with this information, in this order:

DB_NAME= parcel_db

DB_USER= 

DB_PASSWORD=



* Login into mysql in the integrated terminal by typing in `mysql -u <username> -p`. Run SOURCE db/schema.sql; and then exit;
* Run npm start and head to localhost:3001 in your browser to view.



View a demonstration video [Screencastify](https://drive.google.com/file/d/1zXL9n2XNTXXeI_J-wiiljiYJVsunzX1m/view)<br>

## Tech
* HTML
* Javascript
* Handlebars
* Node.js
* Express.js
* MySQL
* dotenv
* sequelize
* Bootstrap
* Google Maps API


## Contributing 
Contributors should read the installation section. 

## Tests
There are no tests for this application. 

## Questions
If you have any questions about this projects, please contact me directly at kelton.leach@gmail.com. You can view more of my projects at https://github.com/keltonlea.