const express = require('express');
const router = express.Router();

const teacherRoutes = require('../controllers/teacher');

// TEACHER HOMEPAGE
router.get('/', teacherRoutes.getTeacherHomepage);

// CREATE - Register a new teacher.
router.post('/createteacher', teacherRoutes.postCreateTeacher);

// CREATE - Register one or more students to a specified teacher.
router.post('/registerstudents', teacherRoutes.postRegisterStudent);

// READ - Retrieve a list of students common to a given list of teachers.
router.get('/commonstudents', teacherRoutes.getCommonStudents);

// UPDATE - Suspend a specified student.
router.post('/suspend', teacherRoutes.postSuspendStudent);

// READ - Retrieve a list of students who are eligible to receieve notifications.
router.post(
  '/retrievefornotifications',
  teacherRoutes.postRetrieveNotifications
);

module.exports = router;
