-- STUDENT / TEACHER TABLES.

/* 
-- Table relationships
  1. ONE student can be registered to MANY teachers.
  2. ONE teacher can register MANY students.
*/

create table students (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  pass VARCHAR(128) NOT NULL,
);

create table teachers (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  pass VARCHAR(128) NOT NULL,
  registered_students_id BIGINT REFERENCES students (id)
);

-- Placeholder data
insert into students (first_name, last_name, email, pass) values ('John', 'Doe', 'john.doe@test.com', 'test');
insert into students (first_name, last_name, email, pass) values ('Bill', 'Bob', 'bill.bob@test.com', 'test');

insert into teachers (first_name, last_name, email, pass) values ('English', 'Teacher', 'english.teacher@test.com', 'test');
insert into teachers (first_name, last_name, email, pass) values ('Math', 'Teacher', 'math.teacher@test.com', 'test');
