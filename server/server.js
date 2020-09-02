const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

const teacherRoutes = require('./routes/teacher');

const app = express();

app.use('/teacher', teacherRoutes);

app.get('/', (req, res, next) => {
  res.send('Hey');
});

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;
app.listen(PORT, () =>
  console.log(`Listening in ${ENV} on port ${PORT}`.bold.cyan)
);
