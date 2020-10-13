const express = require('express');
const router = express.Router();

const teacherRoutes = require('../controllers/teacher');

// TEACHER HOMEPAGE
router.get('/', teacherRoutes.getTeacherHomepage);

// CREATE - Register one or more students to a specified teacher.
router.post('/registerstudents', teacherRoutes.postRegisterStudent);

// READ - Retrieve a list of students common to a given list of teachers.
router.get('/commonstudents', teacherRoutes.getCommonStudents);

// UPDATE - Suspend a specified student.
router.post('/suspend', teacherRoutes.postSuspendStudent);

// DELETE - Unregister one or more students from specified teachers.
router.post('/unregister', teacherRoutes.unregisterStudents);

module.exports = router;
