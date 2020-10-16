/**
 * TEACHER CONTROLLER METHODS
 */

const Teacher = require('../models/Teacher');

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

	// a) Store the registering students and teachers that may or may not already have accounts.
	const registeringStudents = req.body.students;
	const registeringTeachers = req.body.teachers;

	// b) Retrieve students and Teachers that already have accounts.
	let existingStudents = await Teacher.retrieveRegisteredStudents();
	let existingTeachers = await Teacher.retrieveRegisteredTeachers();

	// c) Compare registering students/teachers to existing students/teacher and add students/teachers if they don't already have accounts.
	await Teacher.AddStudents(existingStudents, registeringStudents);
	await Teacher.AddTeachers(existingTeachers, registeringTeachers);

	/**
	 * PART TWO: Register the students to the specified teachers
	 */

	// a) Retrieve existing student/teacher data again which could now be updated with new accounts after part 1.
	let updatedExistingStudents = await Teacher.retrieveRegisteredStudents();
	let updatedExistingTeachers = await Teacher.retrieveRegisteredTeachers();

	// b) Register the registering students to the registering teachers specified.
	await Teacher.registerStudents(
		updatedExistingStudents,
		updatedExistingTeachers,
		registeringStudents,
		registeringTeachers
	);

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
