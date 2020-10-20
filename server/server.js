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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
	console.log(`Listening in ${process.env.NODE_ENV} on port ${PORT}`.bold.cyan)
);
