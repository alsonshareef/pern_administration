CREATE TABLE students (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(200) NOT NULL,
  last_name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  suspension_status BOOLEAN NOT NULL,
  UNIQUE (email)
);

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(200) NOT NULL,
  last_name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  UNIQUE (email)
);

CREATE TABLE student_teacher_registration (
  student_id int NOT NULL,
  teacher_id int NOT NULL,
  PRIMARY KEY (student_id, teacher_id),
  FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
);