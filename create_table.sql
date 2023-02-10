DROP SCHEMA IF EXISTS  amazon_books CASCADE ;
CREATE SCHEMA amazon_books;
SET SCHEMA 'amazon_books';

DROP TABLE IF EXISTS language;
CREATE TABLE language (
    id SERIAL PRIMARY KEY,
    name VARCHAR (20) NOT NULL
);

DROP TABLE IF EXISTS format;
CREATE TABLE format (
    id SERIAL PRIMARY KEY,
    name VARCHAR (20) NOT NULL
);

DROP TABLE IF EXISTS category;
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR (50) NOT NULL
);

DROP TABLE IF EXISTS sub_category;
CREATE TABLE sub_category (
    id SERIAL PRIMARY KEY,
    parent_id INT NOT NULL,
    FOREIGN KEY (id) REFERENCES category (id),
    FOREIGN KEY (parent_id) REFERENCES category (id)
);

DROP TABLE IF EXISTS character;
CREATE TABLE character (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    ca_id INT NOT NULL,
    FOREIGN KEY (ca_id) REFERENCES category (id)
);

DROP TABLE IF EXISTS genre;
CREATE TABLE genre (
    id SERIAL PRIMARY KEY,
    name VARCHAR (20) NOT NULL,
    ca_id INT NOT NULL,
    FOREIGN KEY (ca_id) REFERENCES category (id)
);

DROP TABLE IF EXISTS country;
CREATE TABLE country (
    id SERIAL PRIMARY KEY,
    name VARCHAR (75) NOT NULL
);

DROP TABLE IF EXISTS customer;
CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR (100) NOT NULL,
    last_name VARCHAR (100) NOT NULL,
    email VARCHAR (255) NOT NULL,
    street_name VARCHAR (255) NOT NULL,
    street_number VARCHAR (255) NOT NULL,
    postal_code VARCHAR (50) NOT NULL,
    city VARCHAR (255) NOT NULL,
    co_id INT NOT NULL,
    FOREIGN KEY (co_id) REFERENCES country (id)
);

DROP TABLE IF EXISTS publisher;
CREATE TABLE publisher (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    picture BIGINT
);

DROP TABLE IF EXISTS author;
CREATE TABLE author (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    picture BIGINT
);

DROP TABLE IF EXISTS book;
CREATE TABLE book (
    isbn_10 VARCHAR (10) NOT NULL UNIQUE,
    isbn_13 VARCHAR (14) NOT NULL UNIQUE,
    title VARCHAR (100) NOT NULL,
    description VARCHAR NOT NULL,
    pages INT NOT NULL,
    dimensions VARCHAR (50),
    price DECIMAL NOT NULL,
    units INT NOT NULL,
    p_id INT NOT NULL,
    l_id INT NOT NULL,
    ca_id INT NOT NULL,
    f_id INT NOT NULL,
    PRIMARY KEY (ISBN_10, ISBN_13),
    FOREIGN KEY (p_id) REFERENCES publisher (id),
    FOREIGN KEY (l_id) REFERENCES language (id),
    FOREIGN KEY (ca_id) REFERENCES category (id),
    FOREIGN KEY (f_id) REFERENCES format (id)
);

DROP TABLE IF EXISTS book_author;
CREATE TABLE book_author (
    a_id INT NOT NULL,
    isbn_10 VARCHAR (10) NOT NULL,
    isbn_13 VARCHAR (14) NOT NULL,
    PRIMARY KEY (a_id, ISBN_10, ISBN_13),
    FOREIGN KEY (a_id) REFERENCES author (id),
    FOREIGN KEY (ISBN_10) REFERENCES book (ISBN_10),
    FOREIGN KEY (ISBN_13) REFERENCES book (ISBN_13)
);

DROP TABLE IF EXISTS book_genre;
CREATE TABLE book_genre (
    isbn_10 VARCHAR (10) NOT NULL,
    isbn_13 VARCHAR (14) NOT NULL,
    g_id INT NOT NULL,
    PRIMARY KEY (isbn_10, isbn_13, g_id),
    FOREIGN KEY (isbn_10) REFERENCES book (isbn_10),
    FOREIGN KEY (isbn_13) REFERENCES book (isbn_13),
    FOREIGN KEY (g_id) REFERENCES genre (id)
);

DROP TABLE IF EXISTS book_character;
CREATE TABLE book_character (
    isbn_10 VARCHAR (10) NOT NULL,
    isbn_13 VARCHAR (14) NOT NULL,
    ch_id INT NOT NULL,
    PRIMARY KEY (isbn_10, isbn_13, ch_id),
    FOREIGN KEY (isbn_10) REFERENCES book (isbn_10),
    FOREIGN KEY (isbn_13) REFERENCES book (isbn_13),
    FOREIGN KEY (ch_id) REFERENCES character (id)
);

DROP TABLE IF EXISTS book_category;
CREATE TABLE book_category (
    isbn_10 VARCHAR (10) NOT NULL,
    isbn_13 VARCHAR (14) NOT NULL,
    ca_id INT NOT NULL,
    PRIMARY KEY (isbn_10, isbn_13, ca_id),
    FOREIGN KEY (isbn_10) REFERENCES book (isbn_10),
    FOREIGN KEY (isbn_13) REFERENCES book (isbn_13),
    FOREIGN KEY (ca_id) REFERENCES category (id)
);

DROP TABLE IF EXISTS "order";
CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    description VARCHAR NOT NULL,
    c_id INT NOT NULL,
    o_id INT NOT NULL,
    total_price DECIMAL NOT NULL,
    FOREIGN KEY (c_id) REFERENCES customer (id),
    date TIMESTAMP DEFAULT current_timestamp
);

DROP TABLE IF EXISTS book_order;
CREATE TABLE book_order (
    isbn_10 VARCHAR (10) NOT NULL,
    isbn_13 VARCHAR (14) NOT NULL,
    o_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price INT NOT NULL,
    total_price INT NOT NULL,
    PRIMARY KEY (isbn_10, isbn_13, o_id),
    FOREIGN KEY (isbn_10) REFERENCES book (isbn_10),
    FOREIGN KEY (isbn_13) REFERENCES book (isbn_13),
    FOREIGN KEY (o_id) REFERENCES "order" (id)
);

-- DROP TABLE IF EXISTS amazon_order;
-- CREATE TABLE amazon_order (
--     isbn_10 VARCHAR (10) NOT NULL,
--     isbn_13 VARCHAR (14) NOT NULL,
--     c_id INT NOT NULL,
--     o_id INT NOT NULL,
--     total_price DECIMAL NOT NULL,
--     PRIMARY KEY (ISBN_10, ISBN_13, c_id, o_id),
--     FOREIGN KEY (ISBN_10) REFERENCES book (ISBN_10),
--     FOREIGN KEY (ISBN_13) REFERENCES book (ISBN_13),
--     FOREIGN KEY (c_id) REFERENCES customer (id),
--     FOREIGN KEY (o_id) REFERENCES "order" (id)
-- );