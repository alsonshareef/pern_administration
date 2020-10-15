const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacher');

// TEACHER HOMEPAGE
router.get('/', teacherController.getTeacherHomepage);

// CREATE - Register one or more students to a specified teacher.
router.post('/registerstudents', teacherController.postRegisterStudent);

// READ - Retrieve a list of students common to a given list of teachers.
router.get('/commonstudents', teacherController.getCommonStudents);

// UPDATE - Suspend a specified student.
router.post('/suspend', teacherController.postSuspendStudent);

// DELETE - Unregister one or more students from specified teachers.
router.post('/unregister', teacherController.unregisterStudents);

module.exports = router;
