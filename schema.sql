
create database follow_up_scholarship

create TABLE advisor(
  id SERIAL PRIMARY KEY,
  tax_id VARCHAR(14) NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone_number VARCHAR(11) NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'advisor'
);

CREATE TABLE student (
  id SERIAL PRIMARY KEY,
  tax_id VARCHAR(14) NOT NULL UNIQUE,
  enrollment_number VARCHAR(9) NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  course TEXT NOT NULL,
  link_lattes TEXT NOT NULL,
  advisor_id INTEGER REFERENCES advisor(id),
  enrollment_date_pgcomp DATE NOT NULL,
  phone_number VARCHAR(11) NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'STUDENT'
);

CREATE TABLE agency(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE scholarship(
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES student(id),
  agency_id INT REFERENCES agency(id),
  scholarship_startss_at DATE NOT NULL,
  scholarship_ends_at DATE NOT NULL,
  extension_ends_at DATE NOT NULL,
  salary BIGINT NOT NULL,
  active BOOLEAN NOT NULL,
  model text
);

CREATE TABLE article(
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES student(id),
  title TEXT NOT NULL,
  publication_date DATE NOT NULL,
  publication_place TEXT NOT NULL,
  doi_link TEXT NOT NULL
);

CREATE TABLE admin(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  tax_id VARCHAR(14) NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'ADMIN'
);

ALTER TABLE student
ADD defense_prediction DATE;

ALTER TABLE student
ADD CONSTRAINT fk_students_advisor FOREIGN KEY (advisor_id) REFERENCES advisor (id);

ALTER TABLE student
ALTER COLUMN enrollment_number TYPE varchar(10)

ALTER TABLE scholarship
ADD CONSTRAINT fk_agency_id FOREIGN KEY (agency_id) REFERENCES agency (id);
