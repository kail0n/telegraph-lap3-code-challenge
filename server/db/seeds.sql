DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial PRIMARY KEY,
    NAME varchar(255) NOT NULL,
    AUTHOR varchar(255) NOT NULL,
    STORY varchar(1000)
);

INSERT INTO posts (NAME, AUTHOR, STORY) 
VALUES
    ('Snoopy', 'Kai', 'testing' ),
    ('Tweety', 'Dragos', 'testing1' )
    ;
