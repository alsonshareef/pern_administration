/**
 * TEACHER MODAL
 *
 * This modal is responsible for handling all the data to complete tasks authorized only for teachers such as retrieving student/teacher details,
 * creating new student/teacher accounts, deleting teacher/student accounts, registering students to specified teachers and suspending students.
 */

const pool = require('../database');

class Teacher {
	static retrieveRegisteredStudents = async () => {
		let students = await pool.query('SELECT id, student_email FROM students');
		return students.rows;
	};

	static retrieveRegisteredTeachers = async () => {
		let teachers = await pool.query('SELECT id, teacher_email FROM teachers');
		return teachers.rows;
	};

	static AddStudents = async (existingStudents, registeringStudents) => {
		// If there is at least 1 existing student account, compare registering + existing data to ensure no duplicate student accounts are created.
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
			// If no existing student accounts, create accounts for all registering students.
			for (const rstudent of registeringStudents) {
				try {
					await pool.query(
						'INSERT INTO students(student_first_name, student_last_name, student_email) VALUES ($1, $2, $3)',
						[rstudent.first_name, rstudent.last_name, rstudent.email]
					);
				} catch (error) {
					console.error(`'${rstudent.email}' already has a student account.`);
				}
			}
		}
	};

	static AddTeachers = async (existingTeachers, registeringTeachers) => {
		// If there is at least 1 existing teacher account, compare registering + existing data to ensure no duplicate teacher accounts are created.
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
			// If no existing teacher accounts, create accounts for all registering teachers.
			for (const rteacher of registeringTeachers) {
				try {
					await pool.query(
						'INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email) VALUES ($1, $2, $3)',
						[rteacher.first_name, rteacher.last_name, rteacher.email]
					);
				} catch (error) {
					console.error(`'${rteacher.email}' already has a teachers account.`);
				}
			}
		}
	};

	static RemoveStudents = async () => {};

	static RemoveTeachers = async () => {};

	static registerStudents = async (
		existingStudents,
		existingTeachers,
		registeringStudents,
		registeringTeachers
	) => {
		// 1. Loop through existing students/teachers, and if they match to a registering student/teacher, store their ID's.
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

		// 2. After registering students/teachers ID's have been gathered, insert data into registration tables.
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

	static retrieveRegistrations = async () => {};

	static suspendStudent = async () => {};
}

module.exports = Teacher;
