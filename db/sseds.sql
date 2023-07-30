INSERT INTO department (name)
VALUES
    ('Operations'),
    ('Marketing'),
    ('HR'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Onboarding', 40000, 3),
    ('Sales Consultant', 45000, 4),
    ('Floor Manager,' 50000, 1),
    ('Advertisement Lead', 60000, 2),
    ('HE Lead', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Smith', 1, 2),
    ('Sophie', 'Anderson', 2, 5),
    ('Casey', 'Johnson', 2, 1),
    ('William', 'Garcia', 4, 3),
    ('Emma', 'Martin', 3, 2),
    ('Steven', 'Stevens', 1, 5);