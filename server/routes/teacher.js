const express = require('express');
const router = express.Router();

const {
	getTeacherHomepage,
	registerStudents,
	unregisterStudents,
	getCommonStudents,
	suspendStudents,
} = require('../controllers/teacher');

// READ - Retrieve the logged in teacher's homepage.
router.get('/', getTeacherHomepage);

// CREATE - Register one or more students to a specified teacher.
router.post('/register', registerStudents);

// DELETE - Unregister one or more students from specified teachers.
router.delete('/unregister', unregisterStudents);

// READ - Retrieve a list of students common to a given list of teachers.
router.get('/commonstudents', getCommonStudents);

// UPDATE - Suspend specified students.
router.post('/suspendstudent', suspendStudents);

module.exports = router;
