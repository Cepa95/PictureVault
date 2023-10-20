const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();

// Set up the view engine
app.set('view engine', 'ejs');

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

const mainRoutes = require('./routes/main');


app.use('/', mainRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
