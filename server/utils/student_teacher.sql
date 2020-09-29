CREATE TABLE students (
  id SERIAL NOT NULL PRIMARY KEY,
  student_first_name VARCHAR(200) NOT NULL,
  student_last_name VARCHAR(200) NOT NULL,
  student_email VARCHAR(200) NOT NULL,
  student_password VARCHAR(200) NOT NULL,
  suspension_status BOOLEAN NOT NULL,
  UNIQUE (student_email)
);

CREATE TABLE teachers (
  id SERIAL NOT NULL PRIMARY KEY,
  teacher_first_name VARCHAR(200) NOT NULL,
  teacher_last_name VARCHAR(200) NOT NULL,
  teacher_email VARCHAR(200) NOT NULL,
  teacher_password VARCHAR(200) NOT NULL,
  UNIQUE (teacher_email)
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
INSERT INTO students(student_first_name, student_last_name, student_email, student_password, suspension_status) VALUES ('Alson', 'Shareef', 'alson@shareef.com', 'test', 'false');
INSERT INTO students(student_first_name, student_last_name, student_email, student_password, suspension_status) VALUES ('John', 'Johnson', 'john@johnson.com', 'test', 'true');
INSERT INTO students(student_first_name, student_last_name, student_email, student_password, suspension_status) VALUES ('Bob', 'Bobson', 'bob@bobson.com', 'test', 'f');

-- TEACHERS
INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email, teacher_password) VALUES ('Moe', 'Iqbaal', 'test@Teacheremail.com', 'test');
INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email, teacher_password) VALUES ('Big', 'Man', 'test@Teacheremail.com1', 'test');
INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email, teacher_password) VALUES ('Small', 'Jimmy', 'test@Teacheremail.com2', 'test');
INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email, teacher_password) VALUES ('Mister', 'Man', 'mister@Teacheremail.man', 'test');

-- REGISTRATIONS
INSERT INTO registrations(student_id, teacher_id) VALUES (4,4);
INSERT INTO registrations(student_id, teacher_id) VALUES (4,5);
INSERT INTO registrations(student_id, teacher_id) VALUES (6,5);
INSERT INTO registrations(student_id, teacher_id) VALUES (5,4);
INSERT INTO registrations(student_id, teacher_id) VALUES (5,6);
INSERT INTO registrations(student_id, teacher_id) VALUES (6,6);

/* DROP TABLES QUERY */

DROP TABLE registrations; DROP TABLE students; DROP TABLE teachers; 


/*  ---  MAIN QUERIES  ---  */

-- Grab all current registrations.
SELECT s.student_first_name, s.student_last_name, s.student_email, t.teacher_first_name, t.teacher_last_name, t.teacher_email
FROM students s
INNER JOIN registrations r ON s.id = r.student_id
INNER JOIN teachers t ON t.id = r.teacher_id;