SET SCHEMA 'amazon_books';

INSERT INTO language(name)
VALUES ('English'),
       ('French'),
       ('German'),
       ('Italian'),
       ('Spanish');

INSERT INTO format(name)
VALUES ('Hardcover'),
       ('Paperback'),
       ('Audiobooks'),
       ('Kindle Books'),
       ('Spiral-bound');




INSERT INTO category(name)
VALUES ('Crime, Thrillers & Mystery'),
       ('Children''s'' Books'),
       ('Fiction'),
       ('History'),
       ('Biography'),
       ('Thrillers'),
       ('British Detectives'),
       ('Mystery'),
       ('Literature&Fiction'),
       ('Early Learning'),
       ('Science, Nature & How it works'),
       ('Crime, Thrillers & Mystery'),
       ('Romance'),
       ('Literary Fiction'),
       ('Military History'),
       ('Historical Biographies'),
       ('Ancient History & Civilisation'),
       ('Historical'),
       ('Film, Television & Music'),
       ('Music'),
       ('Science Fiction & Fantasy'),
       ('Fantasy'),
       ('Science Fiction'),
       ('Epic'),
       ('Sword & Sorcery'),
       ('Fairy Tales'),
       ('Alternative History'),
       ('Urban'),
       ('Post-Apocalyptic'),
       ('Alternative History'),
       ('Hard Science Fiction'),
       ('Myths & Legends'),
       ('Vehicles');

INSERT INTO sub_category(id, parent_id)
VALUES ('1', '6'),
       ('1', '7'),
       ('1', '8'),
       ('2', '9'),
       ('2', '10'),
       ('2', '11'),
       ('3', '12'),
       ('3', '13'),
       ('3', '14'),
       ('4', '15'),
       ('4', '16'),
       ('4', '17'),
       ('5', '18'),
       ('5', '19'),
       ('5', '20'),
       ('21', '22'),
       ('21', '23'),
       ('22', '24'),
       ('22', '25'),
       ('22', '25'),
       ('22', '27'),
       ('22', '28'),
       ('23', '29'),
       ('23', '30'),
       ('23', '31'),
       ('14', '32');


INSERT INTO character(name)
VALUES ('AIs'),
       ('Aliens'),
       ('Clones'),
       ('Corporations'),
       ('Mutants'),
       ('Pirates'),
       ('Psychics'),
       ('Robots & Androids');

INSERT INTO genre(name, ca_id)
VALUES ('Horror'),
       ('Humour'),
       ('Mystery'),
       ('Non-Romantic'),
       ('Romantic'),
       ('Thriller');

INSERT INTO country(name)
VALUES ('UK'),
       ('Spain'),
       ('Germany'),
       ('Italy'),
       ('France');

INSERT INTO customer(first_name, last_name, email, street_name, street_number, postal_code, city, co_id)
VALUES ('Tom', 'Fluke', 'boardgameGeek@trustme.com', 'Geekway', '1', '9898', 'Edinbored', '1'),
       ('Jose', 'Armando', 'bobostrong@fake.es', 'Reggaetton', '2', '10008', 'Barcelona', '2'),
       ('Ketchup', 'Heinz', 'goodtobegood@mmm.ok', 'Vroomvroom', '1234556', 'Munich', '250', '3');

INSERT INTO publisher(name, picture)
VALUES ('SunriseCV', ''),
       ('HarperVoyager', ''),
       ('Audible Studios', ''),
       ('Quercus', ''),
       ('Doubleday', '');

INSERT INTO author(name, picture)
VALUES ('Max Brooks', ''),
       ('Rupert Farley', ''),
       ('Elly Griffiths', ''),
       ('Sir Terry Pratchett', '');

INSERT INTO book(isbn_10, isbn_13, title, description, pages, dimensions, prices, units, p_id, l_id, f_id)
VALUES ('1529409713', '978-1529409710', 'Ruth Galloway series',
        'Ruth and Nelson are working on a murder case in which Cathbad emerges as the prime suspect. Can they uncover the truth in time to save their friend?',
        '384', '16.2 x 3.6 x 23.6 cm', '17.36', '100', '4', '1', '1'),
       ('0857525085', '978-0857525086', 'Going Postal: (Discworld Novel 33) (Discworld Novels)',
        'His world, increasingly subtle and thoughtful, has become as allegorical and satirical as a painting by Bosch ... Pratchett''s joy in his creations, in jokes, puns, the idea of letters and language itself makes GOING POSTAL one of the best expressions of his unstoppable flow of comic invention.'' ― The Times Published On: 2004-10-30',
        '496', '13.46 x 4.06 x 20.57 cm', '12.99', '10', '5', '1', '1'),
       ('8376804582', '979-8376804582', 'Torith: A LitRPG Adventure (System Universe)',
        'Perfect',
        '462', '15.24 x 3.43 x 22.86 cm', '28.99', '16', '1', '2', '1'),
        ('9780241250310', '978-0241250310', 'The Tank Book: The Definitive Visual History of Armoured Vehicles',
        'The best book',
        '999', '26 x 2.2 x 30.9 cm', '35', '2', '1', '1', '1'),
            ('1398525685', '978-1398525689', 'IceBreaker',
        'The tiktok sensation',
        '120', '13 x 2.65 x 19.8 cm', '20', '50', '2', '3', '2');

INSERT INTO book_category(isbn_10, isbn_13, ca_id)
VALUES ('1529409713', '978-1529409710', '6'),
('0857525085', '978-0857525086', '23'),
('8376804582', '979-8376804582', '25'),
('9780241250310', '978-0241250310', '32'),
('1398525685', '978-1398525689', '12');

INSERT INTO book_author(a_id, isbn_10, isbn_13)
VALUES ('3', '1529409713', '978-1529409710'),
('4', '0857525085', '978-0857525086'),
('1', '8376804582', '979-8376804582'),
('2', '9780241250310', '978-0241250310'),
('1', '1398525685', '978-1398525689');

INSERT INTO book_genre(isbn_10, isbn_13, g_id)
VALUES ('1529409713', '978-1529409710', '3'),
('0857525085', '978-0857525086', '1'),
('8376804582', '979-8376804582', '2'),
('9780241250310', '978-0241250310', '4'),
('1398525685', '978-1398525689', '5');

INSERT INTO book_character(isbn_10, isbn_13, ch_id)
VALUES ('1529409713', '978-1529409710', '1'),
('0857525085', '978-0857525086', '4'),
('8376804582', '979-8376804582', '2'),
('9780241250310', '978-0241250310', '2'),
('1398525685', '978-1398525689', '3');

INSERT INTO "order"(description, c_id, o_id, total_price)
VALUES ('', '', '', '');

INSERT INTO book_order(isbn_10, isbn_13, o_id, quantity, unit_price, total_price)
VALUES ('', '', '', '', '', '');

