CREATE TABLE students (
  id SERIAL NOT NULL PRIMARY KEY,
  student_first_name VARCHAR(200) NOT NULL,
  student_last_name VARCHAR(200) NOT NULL,
  student_email VARCHAR(200) NOT NULL,
  student_password VARCHAR(200) DEFAULT 'password',
  suspension_status BOOLEAN DEFAULT 'f',
  UNIQUE (student_email)
);

CREATE TABLE teachers (
  id SERIAL NOT NULL PRIMARY KEY,
  teacher_first_name VARCHAR(200) NOT NULL,
  teacher_last_name VARCHAR(200) NOT NULL,
  teacher_email VARCHAR(200) NOT NULL,
  teacher_password VARCHAR(200) DEFAULT 'password',
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

INSERT INTO students(student_first_name, student_last_name, student_email) VALUES ('Alson', 'Shareef', 'alson@shareef.com');
INSERT INTO students(student_first_name, student_last_name, student_email) VALUES ('John', 'Johnson', 'john@johnson.com');
INSERT INTO students(student_first_name, student_last_name, student_email) VALUES ('Bob', 'Bobson', 'bob@bobson.com');

INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email) VALUES ('Moe', 'Iqbaal', 'moe.iqbaal@teacher.com');
INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email) VALUES ('Big', 'Man', 'big.man@teacher.com');
INSERT INTO teachers(teacher_first_name, teacher_last_name, teacher_email) VALUES ('Small', 'Jimmy', 'small.jimmy@teacher.com');

INSERT INTO registrations(student_id, teacher_id) VALUES (1,1);
INSERT INTO registrations(student_id, teacher_id) VALUES (1,2);
INSERT INTO registrations(student_id, teacher_id) VALUES (3,2);
INSERT INTO registrations(student_id, teacher_id) VALUES (2,1);
INSERT INTO registrations(student_id, teacher_id) VALUES (2,3);
INSERT INTO registrations(student_id, teacher_id) VALUES (3,3);

/*  ---  MAIN QUERIES  ---  */

/* Drop all tables */
DROP TABLE registrations; DROP TABLE students; DROP TABLE teachers; 

-- Grab all current registrations.
SELECT s.student_first_name, s.student_last_name, s.student_email, t.teacher_first_name, t.teacher_last_name, t.teacher_email
FROM students s
INNER JOIN registrations r ON s.id = r.student_id
INNER JOIN teachers t ON t.id = r.teacher_id;