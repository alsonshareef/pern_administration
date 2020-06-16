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

CREATE TABLE student_teacher_registration (
  student_id BIGSERIAL NOT NULL,
  teacher_id BIGSERIAL NOT NULL,
  PRIMARY KEY (student_id, teacher_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

-- Placeholder data
insert into students (first_name, last_name, email, pass, suspended) values ('John', 'Doe', 'john.doe@test.com', 'test', false);
insert into students (first_name, last_name, email, pass, suspended) values ('Bill', 'Bob', 'bill.bob@test.com', 'test', false);

insert into teachers (first_name, last_name, email, pass) values ('English', 'Teacher', 'english.teacher@test.com', 'test');
insert into teachers (first_name, last_name, email, pass) values ('Math', 'Teacher', 'math.teacher@test.com', 'test');
