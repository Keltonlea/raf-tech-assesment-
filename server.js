const express = require('express');
const routes = require('./controllers/home-routes');
const { engine } = require('express-handlebars');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use('/', routes);


// Set up Handlebars as the template engine
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
