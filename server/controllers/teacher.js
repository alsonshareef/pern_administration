/**
 * TEACHER CONTROLLER METHODS
 */

const Teacher = require('../models/Teacher');

/*
	@desc			Retrieves the homepage of logged in teacher.
	@route		GET /api/v1/teacher
	@access		Public
*/
exports.getTeacherHomepage = async (req, res, next) => {
	res.json({
		message: 'Teachers homepage.',
	});
};

/*
	@desc			Register a student or multiple students to specified teachers.
	@route		POST /api/v1/teacher/register
	@access		Public
*/
exports.registerStudents = async (req, res, next) => {
	// a) Store the registering students and teachers that may or may not already have accounts.
	const registeringStudents = req.body.students;
	const registeringTeachers = req.body.teachers;

	// b) Compare registering students/teachers to existing students/teacher and add students/teachers if they don't already have accounts.
	try {
		await Teacher.AddStudents(registeringStudents);
	} catch (error) {
		res.status(500).json('New students were not able to be added.');
	}

	try {
		await Teacher.AddTeachers(registeringTeachers);
	} catch (error) {
		res.status(500).json('New teachers were not able to be added.');
	}

	// c) Register the registering students to the registering teachers specified.
	try {
		await Teacher.registerStudents(registeringStudents, registeringTeachers);
		res.status(200).json({
			message: 'Students were registered successfully!',
		});
	} catch (error) {
		res.status(500).json('Registrations failed.');
	}
};

/*
	@desc			Unregister one or more students from specified teachers.
	@route		DELETE/api/v1/teacher/unregister
	@access		Public
*/
exports.unregisterStudents = (req, res, next) => {
	res.json('DELETE unregister student.');
};

/*
	@desc			Retrieve all the common students between a given list of teachers.
	@route		GET /api/v1/teacher/commonstudents
	@access		Public
*/
exports.getCommonStudents = async (req, res, next) => {
	// a) Retrieve specified teachers from client.
	const specifiedTeachers =
		typeof req.query.teachers == 'string'
			? [req.query.teachers]
			: req.query.teachers;

	if (specifiedTeachers == undefined) {
		res.json('Please specify a teacher');
	} else {
		// c) Calculate common students.
		let commonStudents;

		try {
			commonStudents = await Teacher.retrieveCommonStudents(specifiedTeachers);
		} catch (error) {
			res.json('Common student data was not able to be retrieved.');
		}

		if (commonStudents.length !== 0) {
			res.status(200).json({ common_students: commonStudents });
		} else {
			res
				.status(500)
				.json('There are no common students between the specified teachers.');
		}
	}
};

/*
	@desc			Suspend a student.
	@route		UPDATE /api/v1/teacher/suspendstudent
	@access		Public
*/
exports.suspendStudents = (req, res, next) => {
	res.status(200).json('UPDATE suspend student.');
};
