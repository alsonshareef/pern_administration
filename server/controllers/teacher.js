/**
 * TEACHER CONTROLLER METHODS
 */

const pool = require('../utils/db');

exports.getTeacherHomepage = (req, res, next) => {
  res.json({
    message: 'Teachers homepage.',
  });
};

exports.postCreateTeacher = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newTeacher = await pool.query(
      'INSERT INTO teachers(first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
      [firstName, lastName, email, password]
    );

    res.json(newTeacher);
  } catch (err) {
    console.error(err.message);
  }
};

exports.postRegisterStudent = (req, res, next) => {};

exports.getCommonStudents = async (req, res, next) => {
  try {
    const registrations = await pool.query(
      `SELECT s.student_first_name, s.student_last_name, t.teacher_first_name, t.teacher_last_name
      FROM students s
      INNER JOIN registrations r 
      ON s.id = r.student_id
      INNER JOIN teachers t 
      ON t.id = r.teacher_id;`
    );

    const commonStudents = registrations.rows.filter((reg) => {
      // Eventually filter out students based on teacher authentication.
      return reg.teacher_last_name === 'Jimmy';
    });

    res.json(commonStudents);
  } catch (err) {
    console.error(err.message);
  }
};

exports.postSuspendStudent = (req, res, next) => {};

exports.postRetrieveNotifications = (req, res, next) => {};
