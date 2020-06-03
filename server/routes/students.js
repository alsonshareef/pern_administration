const express = require('express');
const router = express.Router();

const db = require('../database');

// READ -- Students homepage.
router.get('/', (req, res) => {
  res.send('Students page');
});

// CREATE -- Create a new student.
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, pass } = req.body;
    const newStudent = await db.query(
      'INSERT INTO students (first_name, last_name, email, pass) values ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, pass]
    );

    res.json(newStudent.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
