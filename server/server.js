const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const colors = require('colors');
const jwt = require('jsonwebtoken');

app.use(express.json());

const teacherRoutes = require('./routes/teacher');

/**
 * ROUTES
 */

app.use('/api/v1/teacher', teacherRoutes);

app.get('/', (req, res, next) => {
  res.redirect('/api/v1/teacher');
});

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;
app.listen(PORT, () =>
  console.log(`Listening in ${ENV} on port ${PORT}`.bold.cyan)
);
