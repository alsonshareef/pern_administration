-- Students and Teachers tables.
create table student (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL
);

create table teacher (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  registered_students_id BIGINT REFERENCES student (id)
);

-- Placeholder data
insert into student (first_name, last_name, email) values ('John', 'Doe', 'john.doe@test.com');
insert into student (first_name, last_name, email) values ('Bill', 'Bob', 'bill.bob@test.com');
insert into student (first_name, last_name, email) values ('Alson', 'Shareef', 'alson.shareef@test.com');

insert into teacher (first_name, last_name, email) values ('English', 'Teacher', 'english.teacher@test.com');
insert into teacher (first_name, last_name, email) values ('Math', 'Teacher', 'math.teacher@test.com');
