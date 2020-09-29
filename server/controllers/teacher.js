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

// Register a student or multiple students to a specified teacher.
exports.postRegisterStudent = async (req, res, next) => {
  try {
    // 1. Grab existing students and teacher data to help filter and retrieve ID's of students to be registered and teacher they're registering to.
    const existingStudents = await pool.query(
      'SELECT id, student_email FROM students'
    );
    const teachers = await pool.query('SELECT id, teacher_email FROM teachers');

    // 2. Set teacherId to the ID of teacher that students will be registered to.
    let teacherId;
    teachers.rows.forEach((teacher) => {
      if (teacher.teacher_email === req.body.teacher) {
        teacherId = teacher.id;
      }
    });

    // 3. When existing student emails are the same as studentsToBeRegistered's emails, store that students ID with specified teacher ID into registrations table.
    const studentsToBeRegistered = req.body.students;
    studentsToBeRegistered.forEach((student) => {
      existingStudents.rows.forEach(async (existingStudent) => {
        if (student.student_email === existingStudent.student_email) {
          try {
            await pool.query(
              'INSERT INTO registrations(student_id, teacher_id) VALUES ($1, $2) RETURNING *',
              [existingStudent.id, teacherId]
            );
          } catch (error) {
            console.log(error);
          }
        }
      });
    });
    res.json('Students were registered successfully!');
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

    // Total registered students
    const students = await pool.query('SELECT student_email from students');

    // Specified teachers retrieved from client.
    const specifiedTeachers =
      typeof req.query.teachers == 'string'
        ? [req.query.teachers]
        : req.query.teachers;

    let commonStudents = [];
    let registeredStudents = [];

    if (specifiedTeachers == undefined) {
      res.json('Please specify a teacher');
    }

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
      // If only one teacher is specified, display students registered under the one teacher.
      registrations.rows.forEach((reg) => {
        if (reg.teacher_email == specifiedTeachers[0]) {
          commonStudents.push(reg.student_email);
        }
      });
    }

    if (commonStudents.length !== 0) {
      res.json({ common_students: commonStudents });
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
