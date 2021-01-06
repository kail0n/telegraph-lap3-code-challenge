DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial PRIMARY KEY,
    TITLE varchar(255) NOT NULL,
    AUTHOR_NAME varchar(255) NOT NULL,
    STORY varchar(1000)
);

INSERT INTO posts (TITLE, AUTHOR_NAME, STORY) 
VALUES
    ('Snoopy', 'Kai', 'testing'),
    ('Tweety', 'Dragos', 'testing1');
