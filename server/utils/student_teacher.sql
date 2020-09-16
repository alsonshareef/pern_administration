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
INSERT INTO students(student_first_name, student_last_name, student_email, student_password, suspension_status) VALUES ('Alson', 'Shareef', 'test@email.com', 'test', 'false');
INSERT INTO students(student_first_name, student_last_name, student_email, student_password, suspension_status) VALUES ('John', 'Johnson', 'test@email.com1', 'test', 'true');
INSERT INTO students(student_first_name, student_last_name, student_email, student_password, suspension_status) VALUES ('Bob', 'Bobson', 'test@email.com2', 'test', 'f');

-- TEACHERS
INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email, teacher_password) VALUES ('Mr', 'Iqbaal', 'test@Teacheremail.com', 'test');
INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email, teacher_password) VALUES ('Mr', 'Man', 'test@Teacheremail.com1', 'test');
INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email, teacher_password) VALUES ('Mrs', 'Jimmy', 'test@Teacheremail.com2', 'test');

-- REGISTRATIONS
INSERT INTO registrations(student_id, teacher_id) VALUES (1,1);
INSERT INTO registrations(student_id, teacher_id) VALUES (1,2);
INSERT INTO registrations(student_id, teacher_id) VALUES (2,1);
INSERT INTO registrations(student_id, teacher_id) VALUES (2,3);
INSERT INTO registrations(student_id, teacher_id) VALUES (3,3);

/* DROP TABLES QUERY */

DROP TABLE registrations; DROP TABLE students; DROP TABLE teachers; 


/*  ---  MAIN QUERIES  ---  */

-- Grab all current registrations.
SELECT s.student_first_name, s.student_last_name, t.teacher_first_name, t.teacher_last_name
FROM students s
INNER JOIN registrations r ON s.id = r.student_id
INNER JOIN teachers t ON t.id = r.teacher_id;