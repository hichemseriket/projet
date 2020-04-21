DROP DATABASE IF EXISTS alsace;
CREATE DATABASE IF NOT EXISTS alsace;
USE alsace;

CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'rowenta';
GRANT ALL PRIVILEGES ON alsace . * TO 'admin'@'%';

-- -----------------------------------------------------
-- Table houses
-- -----------------------------------------------------
CREATE TABLE houses (
	id_house INT NOT NULL AUTO_INCREMENT,
	ref VARCHAR(40) UNIQUE NOT NULL,
	lat DOUBLE,
	lng DOUBLE,
	city VARCHAR(80) NOT NULL,
	street VARCHAR(255),
	codePostal INT(5),
	type VARCHAR(80),
	description TEXT,
	constructionDate VARCHAR(80),
	projectManager VARCHAR(80),
	owner VARCHAR(80),
	materials VARCHAR(80),
	other TEXT,
	PRIMARY KEY (id_house)
)
Engine = InnoDB;

-- -----------------------------------------------------
-- Table medias
-- -----------------------------------------------------
CREATE TABLE medias (
	id_media INT NOT NULL AUTO_INCREMENT,
	fileName VARCHAR(80) UNIQUE NOT NULL,
	category VARCHAR(80) NOT NULL,
	mediaDate VARCHAR(80) NOT NULL,
	houseId INT NOT NULL,
	PRIMARY KEY (id_media),
	CONSTRAINT fk_medias_id_house
	    FOREIGN KEY (houseId)
	    REFERENCES houses(id_house)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table users
-- -----------------------------------------------------
CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	mail VARCHAR(80) UNIQUE NOT NULL,
	password VARCHAR(255),
	tempKey VARCHAR(255),
	registerDate DATETIME NOT NULL,
	gcu DATETIME NOT NULL,
	role TINYINT NOT NULL DEFAULT 2,
	activ TINYINT NOT NULL DEFAULT 2,
	PRIMARY KEY (id)
)
ENGINE = InnoDB;

CREATE TABLE user_group (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(80) UNIQUE NOT NULL,
    description TEXT,
    suggest BOOLEAN NOT NULL DEFAULT false,
    validate BOOLEAN NOT NULL DEFAULT false,
    administrate BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id)
)
ENGINE = InnoDB;

CREATE TABLE users_info (
	id INT NOT NULL AUTO_INCREMENT,
	userId INT NOT NULL,
	lastName VARCHAR(80),
	firstName VARCHAR(80),
	groupId INT NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_usersInfo_id_users
	    FOREIGN KEY (userId)
	    REFERENCES users(id),
	CONSTRAINT fk_usersInfo_id_userGroup
	    FOREIGN KEY (groupId)
	    REFERENCES user_group(id)
)
ENGINE = InnoDB;
