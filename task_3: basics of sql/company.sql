-- create database and table--
CREATE DATABASE company;

USE company;

CREATE TABLE employee(
    employee_id int NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    salary decimal(6,2),
    PRIMARY KEY (employee_id),
    UNIQUE (email)
);

-- creating tables --

INSERT INTO employee(employee_id, first_name, last_name, email, salary)
VALUES	(1, 'Jim', 'Halpert', 'jim_halpert@gmail.com', 8000.00),
		(2, 'Pam', 'Beesly', 'pam_beesly@gmail.com', 5000.00),
        (3, 'Dwight', 'Schrute', 'farmer_dwight@schrute.com', 8000.00),
        (4, 'Oscar', 'Martinez', 'oscar_martinez@gmail.com', 6000.00),
        (5, 'Kevin', 'Malone', 'kevin_malone@gmail.com', 4400.00);

-- select from table --

SELECT first_name, last_name FROM employee;

-- insert - update - delete elements to/from table --

INSERT INTO employee(employee_id, first_name, last_name, email, salary)
VALUES	(6, 'Bedirhan', 'Aksoy', 'sample@email.com', 1234.56);

UPDATE employee SET salary=2345.67 WHERE email='sample@email.com';

DELETE FROM employee WHERE email='sample@email.com';

CREATE INDEX email_index ON employee (email);

CREATE TABLE department(
    department_id int NOT NULL,
    department_name varchar(255) NOT NULL,
    PRIMARY KEY (department_id)
);

-- adding foreign key to department --

ALTER TABLE department ADD FK_employee INT;

ALTER TABLE department ADD FOREIGN KEY (FK_employee) REFERENCES employee(employee_id);


-- transaction part --

USE company;

DELIMITER //

CREATE PROCEDURE UpdateEmployeeSalary()
BEGIN
    DECLARE row_count INT;

    START TRANSACTION;

    UPDATE employee SET salary = 1500.00 WHERE employee_id = 2;

    SELECT ROW_COUNT() INTO row_count;

    IF row_count > 0 THEN
        COMMIT;
    ELSE
        ROLLBACK;
    END IF;
END //

DELIMITER ;

CALL UpdateEmployeeSalary();
