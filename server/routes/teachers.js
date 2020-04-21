const express = require('express');
const router = express.Router();

const db = require('../database');

// Teachers homepage.
router.get('/', (req, res) => {
  res.send('Teachers page');
});

// Create a new teacher.
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, pass } = req.body;
    const newTeacher = await db.query(
      'INSERT INTO teachers (first_name, last_name, email, pass) values ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, pass]
    );

    res.json(newTeacher.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
