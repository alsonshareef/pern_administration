/**
 * TEACHER CONTROLLER METHODS
 */

const Teacher = require('../models/Teacher');

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

	// a) Store the registering students and teachers that may or may not already have accounts.
	const registeringStudents = req.body.students;
	const registeringTeachers = req.body.teachers;

	// b) Retrieve students and Teachers that already have accounts.
	let existingStudents;
	let existingTeachers;

	try {
		existingStudents = await Teacher.retrieveStudents();
	} catch (error) {
		res.json(
			'(postRegisterStudent) Was not able to retrieve current students accounts.'
		);
	}

	try {
		existingTeachers = await Teacher.retrieveTeachers();
	} catch (error) {
		res.json(
			'(postRegisterStudent) Was not able to retrieve current teachers accounts.'
		);
	}

	// c) Compare registering students/teachers to existing students/teacher and add students/teachers if they don't already have accounts.
	try {
		await Teacher.AddStudents(existingStudents, registeringStudents);
	} catch (error) {
		res.json('New students were not able to be added.');
	}

	try {
		await Teacher.AddTeachers(existingTeachers, registeringTeachers);
	} catch (error) {
		res.json('New teachers were not able to be added.');
	}

	/**
	 * PART TWO: Register the students to the specified teachers
	 */

	// a) Retrieve existing student/teacher data again which could now be updated with new accounts after part 1.
	let updatedExistingStudents;
	let updatedExistingTeachers;

	try {
		updatedExistingStudents = await Teacher.retrieveStudents();
	} catch (error) {
		res.json(
			'Was not able to retrieve current registered students after being updated in part 1.'
		);
	}

	try {
		updatedExistingTeachers = await Teacher.retrieveTeachers();
	} catch (error) {
		res.json(
			'Was not able to retrieve current registered teachers after being updated in part 1.'
		);
	}

	// b) Register the registering students to the registering teachers specified.
	try {
		await Teacher.registerStudents(
			updatedExistingStudents,
			updatedExistingTeachers,
			registeringStudents,
			registeringTeachers
		);
		res.json('Students were registered successfully!');
	} catch (error) {
		res.json('Registrations failed.');
	}
};

// Retrieve all the common students between a given list of teachers.
exports.getCommonStudents = async (req, res, next) => {
	// a) Retrieve specified teachers from client.
	const specifiedTeachers =
		typeof req.query.teachers == 'string'
			? [req.query.teachers]
			: req.query.teachers;

	if (specifiedTeachers == undefined) {
		res.json('Please specify a teacher');
	}

	// b) Retrieve registration data and current student data for calculating common students.
	let registrations, students, commonStudents;

	try {
		registrations = await Teacher.retrieveRegistrations();
	} catch (error) {
		res.json('Not able to retrieve current registration data.');
	}

	try {
		students = await Teacher.retrieveStudents();
	} catch (error) {
		res.json('Not able to retrieve current student accounts.');
	}

	// c) Calculate common students.
	try {
		commonStudents = await Teacher.retrieveCommonStudents(
			specifiedTeachers,
			students,
			registrations
		);
	} catch (error) {
		res.json('Common student data was not able to be retrieved.');
	}

	if (commonStudents.length !== 0) {
		res.json({ common_students: commonStudents });
	} else {
		res.json('There are no common students between the specified teachers.');
	}
};

// Suspend a student.
exports.postSuspendStudent = (req, res, next) => {};

// Unregister one or more students from specified teachers.
exports.unregisterStudents = (req, res, next) => {};
