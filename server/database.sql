CREATE DATABASE pernapp;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE,
  password VARCHAR(30),
  email VARCHAR(225),
  email_verified BOOLEAN,
  date_created DATE,
  last_login DATE
);