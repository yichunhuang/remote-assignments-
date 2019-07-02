/* create database */
CREATE DATABASE assignment;

/* use database */
USE assignment;

/* info */
create table user(
	id int primary key NOT NULL AUTO_INCREMENT, 
	email varchar(20) NOT NULL, 
	password varchar(10) NOT NULL
);
-- /* insert data */
-- INSERT INTO user (`id`, `email`, `password`) 
-- VALUES('1', 'b03704074@ntu.edu.tw', '123456');
SELECT DATABASE();
SELECT * FROM user;

