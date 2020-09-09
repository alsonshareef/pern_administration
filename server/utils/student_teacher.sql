CREATE TABLE students (
  id SERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(200) NOT NULL,
  last_name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  suspension_status BOOLEAN NOT NULL,
  UNIQUE (email)
);

CREATE TABLE teachers (
  id SERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(200) NOT NULL,
  last_name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  UNIQUE (email)
);

CREATE TABLE registrations (
  student_id int NOT NULL,
  teacher_id int NOT NULL,
  PRIMARY KEY (student_id, teacher_id),
  FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

/* PLACEHOLDER DATA */

-- STUDENTS
INSERT INTO students(first_name, last_name, email, password, suspension_status) VALUES ('Alson', 'Shareef', 'test@email.com', 'test', 'false');
INSERT INTO students(first_name, last_name, email, password, suspension_status) VALUES ('John', 'Johnson', 'test@email.com1', 'test', 'true');
INSERT INTO students(first_name, last_name, email, password, suspension_status) VALUES ('Bob', 'Bobson', 'test@email.com2', 'test', 'f');

-- TEACHERS
INSERT INTO teachers(first_name, last_name, email, password) VALUES ('Mr', 'Iqbaal', 'test@Teacheremail.com', 'test');
INSERT INTO teachers(first_name, last_name, email, password) VALUES ('Mr', 'Man', 'test@Teacheremail.com1', 'test');
INSERT INTO teachers(first_name, last_name, email, password) VALUES ('Mrs', 'Jimmy', 'test@Teacheremail.com2', 'test');

-- REGISTRATIONS
INSERT INTO registrations(student_id, teacher_id) VALUES (1,4);
INSERT INTO registrations(student_id, teacher_id) VALUES (1,5);
INSERT INTO registrations(student_id, teacher_id) VALUES (2,4);
INSERT INTO registrations(student_id, teacher_id) VALUES (2,6);
INSERT INTO registrations(student_id, teacher_id) VALUES (3,6);

/* DROP TABLES QUERY */

DROP TABLE registrations; DROP TABLE students; DROP TABLE teachers; 


/*  ---  MAIN QUERIES  ---  */

-- Grab all current registrations.
SELECT students.first_name, teachers.last_name
FROM students
INNER JOIN registrations ON students.id = registrations.student_id
INNER JOIN teachers ON teachers.id = registrations.teacher_id;