DROP TABLE IF EXISTS dogs;

CREATE TABLE dogs (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    age int NOT NULL,
    owner_id int
);

INSERT INTO dogs (name, age, owner_id) 
VALUES
    ('Snoopy', 5, null ),
    ('Mochi', 3, 2 ),
    ('Masha', 5, null ),
    ('Hendon', 2, 2 ),
    ('Zola', 13, 1 ),
    ('Snip', 3, null);


DROP TABLE IF EXISTS owners;

CREATE TABLE owners (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL,
    address varchar(255)
);

INSERT INTO owners (name, address) 
VALUES
    ('Beth', 'South Pavillion' ),
    ('Naz', '1 The Strand' );
