-- Students and Teachers tables.
create table students (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL
);

create table teachers (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  registered_students_id BIGINT REFERENCES students (id)
);

-- Placeholder data
insert into students (first_name, last_name, email) values ('John', 'Doe', 'john.doe@test.com');
insert into students (first_name, last_name, email) values ('Bill', 'Bob', 'bill.bob@test.com');
insert into students (first_name, last_name, email) values ('Alson', 'Shareef', 'alson.shareef@test.com');

insert into teachers (first_name, last_name, email) values ('English', 'Teacher', 'english.teacher@test.com');
insert into teachers (first_name, last_name, email) values ('Math', 'Teacher', 'math.teacher@test.com');
