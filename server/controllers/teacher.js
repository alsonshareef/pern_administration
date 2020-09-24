/**
 * TEACHER CONTROLLER METHODS
 */

const pool = require('../utils/db');

const getOccurence = require('../utils/get_occurence');

// Teacher homepage after login.
exports.getTeacherHomepage = (req, res, next) => {
  res.json({
    message: 'Teachers homepage.',
  });
};

// ** MIGHT NOT NEED TO BE NEEDED AS TEACHER AUTHORIZED FUNCTIONALITY ** - Register a new teacher.
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

// Register a student or multiple students to a specified teacher.
exports.postRegisterStudent = async (req, res, next) => {
  try {
    /**
     * 1. Retrieve student-to-be-registered's data from req.body and check to see if this student already exists.
     * 2. If student exists, grab the student id from students table and teacher id from teachers table and insert both ID's into registration table.
     * 3. If student doesn't exist, add the student-to-be-registered into the students table and continue with step 2.
     */
    const students = await pool.query('SELECT * FROM students');
    res.json(students);
  } catch (err) {
    console.error(err.message);
  }
};

// Retrieve all the common students between a given list of teachers.
exports.getCommonStudents = async (req, res, next) => {
  try {
    const registrations = await pool.query(
      `SELECT s.id, s.student_first_name, s.student_last_name, s.student_email, t.teacher_first_name, t.teacher_last_name, t.teacher_email
      FROM students s
      INNER JOIN registrations r 
      ON s.id = r.student_id
      INNER JOIN teachers t 
      ON t.id = r.teacher_id;`
    );

    // Total students
    const students = await pool.query('SELECT student_email from students');

    // Specified teachers retrieved from client.
    const specifiedTeachers =
      typeof req.query.teachers == 'string'
        ? [req.query.teachers]
        : req.query.teachers;

    let commonStudents = [];
    let registeredStudents = [];

    if (specifiedTeachers.length > 1) {
      // 1. Gather all students registered for each specified teacher including duplicates.
      specifiedTeachers.forEach((teacher) => {
        registrations.rows.forEach((reg) => {
          if (teacher == reg.teacher_email) {
            registeredStudents.push(reg.student_email);
          }
        });
      });

      // 2. Store all duplicate student emails as that means they are common between specified teachers.
      students.rows.forEach((student) => {
        if (getOccurence(registeredStudents, student.student_email) > 1) {
          commonStudents.push(student.student_email);
        }
      });
    } else {
      // If only one teacher is specified, display students registered under this one teacher.
      registrations.rows.forEach((reg) => {
        if (reg.teacher_email == specifiedTeachers[0]) {
          commonStudents.push(reg.student_email);
        }
      });
    }

    if (commonStudents.length !== 0) {
      res.json({ commonStudents });
    } else {
      res.json('There are no common students between the specified teachers.');
    }
  } catch (err) {
    console.error(err.message);
  }
};

// Suspend a student.
exports.postSuspendStudent = (req, res, next) => {};

// Retrieve a list of students who are authorized to receive a notification.
exports.postRetrieveNotifications = (req, res, next) => {};
