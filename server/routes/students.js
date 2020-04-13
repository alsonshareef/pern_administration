const express = require('express');
const router = express.Router();

const db = require('../database');

router.get('/', (req, res) => {
  res.send('Students page');
});

// Create a new student.
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    const newStudent = await db.query(
      'INSERT INTO student (first_name, last_name, email) values ($1, $2, $3) RETURNING *',
      [first_name, last_name, email]
    );

    res.json(newStudent.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
