const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config({ path: '../config/config.env' });

const homepageRoute = require('./routes/homepage');

const app = express();

app.use('/api/v1/home', homepageRoute);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold
  )
);
