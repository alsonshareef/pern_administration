const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config({ path: '../config/config.env' });

const homepageRoute = require('./routes/homepage');

const app = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use('/api/home', homepageRoute);

// PRODUCTION SETUP
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve('../client/build', 'index.html'))
  );
}

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold
  )
);
