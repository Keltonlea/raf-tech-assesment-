const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers/home-routes');
const { engine } = require('express-handlebars');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use('/', routes);


// Set up Handlebars as the template engine
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
