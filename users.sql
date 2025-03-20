DROP TABLE IF EXISTS userDetails;

CREATE TABLE userDetails (
                             ID int NOT NULL,
                             username varchar(255) NOT NULL,
                             email varchar(255) NOT NULL DEFAULT '',
                             password varchar(255) NOT NULL DEFAULT '',
                             gamesPlayed int NOT NULL DEFAULT 0,
                             wins int NOT NULL DEFAULT 0,
                             draws int NOT NULL DEFAULT 0,
                             losses int NOT NULL DEFAULT 0,
                             rank int NOT NULL DEFAULT 0
);
