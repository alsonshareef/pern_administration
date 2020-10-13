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

// Register a student or multiple students to specified teachers.
exports.postRegisterStudent = async (req, res, next) => {
  /**
   * PART 1: Create accounts for registering students/teachers if they don't already have one.
   */

  // Students and Teachers that already have accounts.
  let existingStudents = await pool.query(
    'SELECT id, student_email FROM students'
  );
  let existingTeachers = await pool.query(
    'SELECT id, teacher_email FROM teachers'
  );

  // Store the registering students and teachers that may or may not already have accounts.
  const registeringStudents = req.body.students;
  const registeringTeachers = req.body.teachers;

  if (existingStudents.rows.length > 0) {
    // If there is at least 1 existing student account, compare registering + existing data to ensure no duplicate student accounts are created.
    for (const xstudent of existingStudents.rows) {
      for (const rstudent of registeringStudents) {
        if (rstudent.email !== xstudent.student_email) {
          try {
            await pool.query(
              'INSERT INTO students(student_first_name, student_last_name, student_email) VALUES ($1, $2, $3)',
              [rstudent.first_name, rstudent.last_name, rstudent.email]
            );
          } catch (error) {
            console.error(`'${rstudent.email}' already has an account.`);
          }
        }
      }
    }
  } else {
    // If no existing student accounts, create accounts for all registering students.
    for (const rstudent of registeringStudents) {
      try {
        await pool.query(
          'INSERT INTO students(student_first_name, student_last_name, student_email) VALUES ($1, $2, $3)',
          [rstudent.first_name, rstudent.last_name, rstudent.email]
        );
      } catch (error) {
        console.error(`'${rstudent.email}' already has an account.`);
      }
    }
  }

  if (existingTeachers.rows.length > 0) {
    // If there is at least 1 existing teacher account, compare registering + existing data to ensure no duplicate teacher accounts are created.
    for (const xteacher of existingTeachers.rows) {
      for (const rteacher of registeringTeachers) {
        if (rteacher.email !== xteacher.teacher_email) {
          try {
            await pool.query(
              'INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email) VALUES ($1, $2, $3)',
              [rteacher.first_name, rteacher.last_name, rteacher.email]
            );
          } catch (error) {
            console.error(`'${rteacher.email}' already has an account.`);
          }
        }
      }
    }
  } else {
    // If no existing teacher accounts, create accounts for all registering teachers.
    for (const rteacher of registeringTeachers) {
      try {
        await pool.query(
          'INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email) VALUES ($1, $2, $3)',
          [rteacher.first_name, rteacher.last_name, rteacher.email]
        );
      } catch (error) {
        console.error(`'${rteacher.email}' already has an account.`);
      }
    }
  }

  /**
   * PART TWO: Register the students to the specified teachers
   */

  // 1. Arrays for storing ID's of registering teachers and students.
  let registeringStudentIDs = [];
  let registeringTeacherIDs = [];

  // 2. Retrieve updated existing student/teacher data after part 1.
  let updatedExistingStudents = await pool.query(
    'SELECT id, student_email FROM students'
  );

  let updatedExistingTeachers = await pool.query(
    'SELECT id, teacher_email FROM teachers'
  );

  for (const xstudent of updatedExistingStudents.rows) {
    for (const rstudent of registeringStudents) {
      if (rstudent.email == xstudent.student_email) {
        registeringStudentIDs.push(xstudent.id);
      }
    }
  }

  for (const xteacher of updatedExistingTeachers.rows) {
    for (const rteacher of registeringTeachers) {
      if (rteacher.email == xteacher.teacher_email) {
        registeringTeacherIDs.push(xteacher.id);
      }
    }
  }

  // 3. After registering students/teachers ID's have been gathered, insert data into registration tables.
  for (const tID of registeringTeacherIDs) {
    for (const sID of registeringStudentIDs) {
      try {
        await pool.query(
          'INSERT INTO registrations(student_id, teacher_id) VALUES ($1,$2)',
          [sID, tID]
        );
      } catch (error) {
        console.error(
          'Was not able to insert registration data because data either already exists or was invalid.'
        );
      }
    }
  }

  res.json('Students were registered successfully!');
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

    let commonStudentsEmails = [];
    let registeredStudentsEmails = [];

    if (specifiedTeachers == undefined) {
      res.json('Please specify a teacher');
    }

    if (specifiedTeachers.length > 1) {
      // 1. Gather all students registered for each specified teacher including duplicates.
      for (const teacher of specifiedTeachers) {
        for (const reg of registrations.rows) {
          if (teacher == reg.teacher_email) {
            registeredStudentsEmails.push(reg.student_email);
          }
        }
      }

      // 2. Store all duplicate student emails as that means they are common between specified teachers.
      for (const student of students.rows) {
        if (getOccurence(registeredStudentsEmails, student.student_email) > 1) {
          commonStudentsEmails.push(student.student_email);
        }
      }
    } else {
      // If only one teacher is specified, display all students registered under the one specified teacher.
      for (const reg of registrations.rows) {
        if (reg.teacher_email == specifiedTeachers[0]) {
          commonStudentsEmails.push(reg.student_email);
        }
      }
    }

    if (commonStudentsEmails.length !== 0) {
      res.json({ common_students: commonStudentsEmails });
    } else {
      res.json('There are no common students between the specified teachers.');
    }
  } catch (err) {
    console.error(err.message);
  }
};

// Suspend a student.
exports.postSuspendStudent = (req, res, next) => {};

// Unregister one or more students from specified teachers.
exports.unregisterStudents = (req, res, next) => {};
