/**
 * TEACHER MODAL
 *
 * This modal is responsible for handling all the data to complete tasks authorized only for teachers such as retrieving student/teacher details,
 * creating new student/teacher accounts, deleting teacher/student accounts, registering students to specified teachers and suspending students.
 */

const pool = require('../database');

const getOccurence = require('../utils/get_occurence');

class Teacher {
	static retrieveStudents = async () => {
		let students = await pool.query('SELECT id, student_email FROM students');
		return students.rows;
	};

	static retrieveTeachers = async () => {
		let teachers = await pool.query('SELECT id, teacher_email FROM teachers');
		return teachers.rows;
	};

	static retrieveRegistrations = async () => {
		let registrations = await pool.query(
			`SELECT s.id, s.student_first_name, s.student_last_name, s.student_email, t.teacher_first_name, t.teacher_last_name, t.teacher_email
      FROM students s
      INNER JOIN registrations r 
      ON s.id = r.student_id
      INNER JOIN teachers t 
      ON t.id = r.teacher_id;`
		);
		return registrations.rows;
	};

	static AddStudents = async (registeringStudents) => {
		// a) Retrieve existing student accounts.
		let existingStudents;
		try {
			existingStudents = await this.retrieveStudents();
		} catch (error) {
			console.error('Was not able to retrieve existing student accounts.');
		}

		// b) If there is at least 1 existing student account, compare registering + existing data to ensure no duplicate student accounts are created.
		if (existingStudents.length > 0) {
			for (const xstudent of existingStudents) {
				for (const rstudent of registeringStudents) {
					if (rstudent.email !== xstudent.student_email) {
						try {
							await pool.query(
								'INSERT INTO students(student_first_name, student_last_name, student_email) VALUES ($1, $2, $3)',
								[rstudent.first_name, rstudent.last_name, rstudent.email]
							);
						} catch (error) {
							console.error(
								`'${rstudent.email}' already has a student account.`
							);
						}
					}
				}
			}
		} else {
			// c) If no existing student accounts, create accounts for all registering students.
			for (const rstudent of registeringStudents) {
				try {
					await pool.query(
						'INSERT INTO students(student_first_name, student_last_name, student_email) VALUES ($1, $2, $3)',
						[rstudent.first_name, rstudent.last_name, rstudent.email]
					);
				} catch (error) {
					console.error(
						`Was not able to create an account for student '${rstudent.email}'.`
					);
				}
			}
		}
	};

	static AddTeachers = async (registeringTeachers) => {
		// a) Retrieve existing teacher accounts.
		let existingTeachers;
		try {
			existingTeachers = await this.retrieveTeachers();
		} catch (error) {
			console.error('Was not able to retrieve existing teacher accounts.');
		}

		// b) If there is at least 1 existing teacher account, compare registering + existing data to ensure no duplicate teacher accounts are created.
		if (existingTeachers.length > 0) {
			for (const xteacher of existingTeachers) {
				for (const rteacher of registeringTeachers) {
					if (rteacher.email !== xteacher.teacher_email) {
						try {
							await pool.query(
								'INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email) VALUES ($1, $2, $3)',
								[rteacher.first_name, rteacher.last_name, rteacher.email]
							);
						} catch (error) {
							console.error(
								`'${rteacher.email}' already has a teachers account.`
							);
						}
					}
				}
			}
		} else {
			// c) If no existing teacher accounts, create accounts for all registering teachers.
			for (const rteacher of registeringTeachers) {
				try {
					await pool.query(
						'INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email) VALUES ($1, $2, $3)',
						[rteacher.first_name, rteacher.last_name, rteacher.email]
					);
				} catch (error) {
					console.error(
						`Was not able to create an account for teacher '${rteacher.email}'.`
					);
				}
			}
		}
	};

	static registerStudents = async (
		registeringStudents,
		registeringTeachers
	) => {
		const existingStudents = await this.retrieveStudents();
		const existingTeachers = await this.retrieveTeachers();

		// a) Loop through existing students/teachers, and if they match to a registering student/teacher, store their ID's.
		let registeringStudentIDs = [];
		let registeringTeacherIDs = [];

		for (const xstudent of existingStudents) {
			for (const rstudent of registeringStudents) {
				if (rstudent.email == xstudent.student_email) {
					registeringStudentIDs.push(xstudent.id);
				}
			}
		}

		for (const xteacher of existingTeachers) {
			for (const rteacher of registeringTeachers) {
				if (rteacher.email == xteacher.teacher_email) {
					registeringTeacherIDs.push(xteacher.id);
				}
			}
		}

		// b) After registering students/teachers ID's have been gathered, insert data into registration tables.
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
	};

	static unregisterStudents = async () => {};

	static retrieveCommonStudents = async (
		specifiedTeachers,
		students,
		registrations
	) => {
		let registeredStudentsEmails = [];
		let commonStudentsEmails = [];

		// 1. If more than one teacher specified, store every student email that is registered to the specified teachers, even if it comes up twice.
		if (specifiedTeachers.length > 1) {
			for (const teacher of specifiedTeachers) {
				for (const reg of registrations) {
					if (teacher == reg.teacher_email) {
						registeredStudentsEmails.push(reg.student_email);
					}
				}
			}

			// 2. Filter out every student email that has appeared more than once as that means they are common between specified teachers.
			for (const student of students) {
				if (getOccurence(registeredStudentsEmails, student.student_email) > 1) {
					commonStudentsEmails.push(student.student_email);
				}
			}
		} else {
			// If only one teacher is specified, display all students registered under the one specified teacher.
			for (const reg of registrations) {
				if (reg.teacher_email == specifiedTeachers[0]) {
					commonStudentsEmails.push(reg.student_email);
				}
			}
		}

		return commonStudentsEmails;
	};

	static suspendStudent = async () => {};
}

module.exports = Teacher;
