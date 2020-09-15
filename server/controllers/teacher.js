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
      'SELECT students.first_name, teachers.last_name FROM students INNER JOIN registrations ON students.id = registrations.student_id INNER JOIN teachers ON teachers.id = registrations.teacher_id;'
    );

    res.json(registrations);
  } catch (err) {
    console.error(err.message);
  }
};

exports.postSuspendStudent = (req, res, next) => {};

exports.postRetrieveNotifications = (req, res, next) => {};
