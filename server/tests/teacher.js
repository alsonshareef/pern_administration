const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Teacher Routes Tests', () => {
	/**
	 * GET teacher home
	 */
	describe('GET /api/v1/teacher/', () => {
		it('Should return the logged in teachers homepage', (done) => {
			chai
				.request(server)
				.get('/api/v1/teacher/')
				.end((err, response) => {
					response.should.have.status(200);
					done();
				});
		});
	});

	/**
	 * GET common students between specified teachers
	 */
	describe('GET /api/v1/teacher/commonstudents', () => {
		it("Should return an object with the property 'common_students' with a value == array of common students", (done) => {
			const specifiedTeacher = '?teachers=mrs.molly@teacher.com';
			chai
				.request(server)
				.get('/api/v1/teacher/commonstudents' + specifiedTeacher)
				.end((err, response) => {
					response.should.have.status(200);
					response.should.be.a('object');
					response.body.should.have.property('common_students');
					response.body.common_students.should.be.a('array');
					done();
				});
		});
	});

	/**
	 * POST Registering students to teachers.
	 */

	/**
	 * DELETE Unregistering students from teachers.
	 */

	/**
	 * POST Change a students suspension status
	 */
});
