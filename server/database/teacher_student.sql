-- STUDENT / TEACHER TABLES.

/* 
-- Entities
  1. Students
      - first name
      - last name
      - email
      - password
      - suspension status

  2. Teachers
      - first name
      - last name 
      - email 
      - password
      - registered students

  3. Registrations
      - which students are registered to which teachers
*/

create table students (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  pass VARCHAR(128) NOT NULL,
  suspended BOOLEAN NOT NULL
);

create table teachers (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  pass VARCHAR(128) NOT NULL
);

CREATE TABLE registrations (
  student_id BIGINT NOT NULL,
  teacher_id BIGINT NOT NULL,
  registration_date timestamp,
  PRIMARY KEY (student_id, teacher_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

-- Placeholder data
  -- STUDENTS
insert into students (first_name, last_name, email, pass, suspended) values ('John', 'Doe', 'john.doe@test.com', 'test', false);
insert into students (first_name, last_name, email, pass, suspended) values ('Bill', 'Bob', 'bill.bob@test.com', 'test', false);

  -- TEACHERS
insert into teachers (first_name, last_name, email, pass) values ('English', 'Teacher', 'english.teacher@test.com', 'test');
insert into teachers (first_name, last_name, email, pass) values ('Math', 'Teacher', 'math.teacher@test.com', 'test');
insert into teachers (first_name, last_name, email, pass) values ('Chemistry', 'Teacher', 'chemistry.teacher@test.com', 'test');
insert into teachers (first_name, last_name, email, pass) values ('Physics', 'Teacher', 'physics.teacher@test.com', 'test');

  -- REGISTRATIONS
insert into registrations (student_id, teacher_id, registration_date) values (1, 1, NOW());