create database follow_up_scholarship

-- RUN THIS FILE IN POSTGRESQL

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
  enrolment_number VARCHAR(9) NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  course TEXT NOT NULL,
  link_lattes TEXT NOT NULL,
  advisor_id INTEGER REFERENCES advisor(id),
  enrolment_date_pgcomp DATE NOT NULL,
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
  scholarship_starts_at DATE NOT NULL,
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

