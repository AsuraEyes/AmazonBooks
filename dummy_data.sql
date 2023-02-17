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



INSERT INTO category(name, parent_id)
VALUES ('Crime, Thrillers & Mystery', null),
       ('Children''s'' Books', null),
       ('Fiction', null),
       ('History', null),
       ('Biography', null),
       ('Thrillers', '1'),
       ('British Detectives', '1'),
       ('Mystery', '1'),
       ('Literature&Fiction', '2'),
       ('Early Learning', '2'),
       ('Science, Nature & How it works', '2'),
       ('Crime, Thrillers & Mystery', '3'),
       ('Romance', '3'),
       ('Literary Fiction', '3'),
       ('Military History', '4'),
       ('Historical Biographies', '4'),
       ('Ancient History & Civilisation', '4'),
       ('Historical', '5'),
       ('Film, Television & Music', '5'),
       ('Music', '5'),
       ('Science Fiction & Fantasy', null),
       ('Fantasy', '21'),
       ('Science Fiction', '21'),
       ('Epic', '22'),
       ('Sword & Sorcery', '22'),
       ('Fairy Tales', '22'),
       ('Alternative History', '23'),
       ('Urban', '23'),
       ('Post-Apocalyptic', '23'),
       ('Alternative History', '23'),
       ('Hard Science Fiction', '30'),
       ('Myths & Legends', '31'),
       ('Vehicles', '14'),
       ('Space Opera', '23');

INSERT INTO character(name)
VALUES ('AIs'),
       ('Aliens'),
       ('Clones'),
       ('Corporations'),
       ('Mutants'),
       ('Pirates'),
       ('Psychics'),
       ('Robots & Androids');

INSERT INTO genre(name)
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

INSERT INTO book(isbn_10, isbn_13, title, description, pages, dimensions, price, units, p_id, l_id, f_id)
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
        '120', '13 x 2.65 x 19.8 cm', '20', '50', '2', '3', '2'),
       ('9876543210', '978-9876543210', 'Harry Potter',
        'good stuff',
        '500', '13 x 2.65 x 19.8 cm', '25', '50', '4', '1', '2'),
       ('1578943210', '978-1578943210', 'Lord of the bracelet',
        'elves and dwarves',
        '700', '13 x 2.65 x 19.8 cm', '35', '15', '5', '3', '1'),
       ('1278943210', '978-1278943210', 'Garbage Man',
        'superhero stuff',
        '350', '13 x 2.65 x 19.8 cm', '17', '120', '2', '4', '1'),
       ('1378943210', '978-1378943210', 'Them witches',
        'spooky',
        '200', '13 x 2.65 x 19.8 cm', '35', '15', '5', '5', '1'),
       ('2378943210', '978-2378943210', 'Boss killer',
        'crime, mafia',
        '201', '13 x 2.65 x 19.8 cm', '19', '22', '1', '1', '3');

INSERT INTO book_category(isbn_10, isbn_13, ca_id)
VALUES ('1529409713', '978-1529409710', '6'),
       ('0857525085', '978-0857525086', '34'),
       ('8376804582', '979-8376804582', '25'),
       ('9780241250310', '978-0241250310', '32'),
       ('1398525685', '978-1398525689', '12'),
       ('9876543210', '978-9876543210', '20'),
       ('1578943210', '978-1578943210', '10'),
       ('1278943210', '978-1278943210', '31'),
       ('1378943210', '978-1378943210', '27'),
       ('2378943210', '978-2378943210', '25');

INSERT INTO book_author(a_id, isbn_10, isbn_13)
VALUES ('3', '1529409713', '978-1529409710'),
       ('4', '0857525085', '978-0857525086'),
       ('1', '8376804582', '979-8376804582'),
       ('2', '9780241250310', '978-0241250310'),
       ('3', '1398525685', '978-1398525689'),
       ('1', '9876543210', '978-9876543210'),
       ('5', '1578943210', '978-1578943210'),
       ('1', '1278943210', '978-1278943210'),
       ('2', '1378943210', '978-1378943210'),
       ('1', '2378943210', '978-2378943210');

INSERT INTO book_genre(isbn_10, isbn_13, g_id)
VALUES ('1529409713', '978-1529409710', '3'),
       ('0857525085', '978-0857525086', '1'),
       ('8376804582', '979-8376804582', '2'),
       ('9780241250310', '978-0241250310', '4'),
       ('1398525685', '978-1398525689', '5'),
       ('9876543210', '978-9876543210', '1'),
       ('1578943210', '978-1578943210', '1'),
       ('1278943210', '978-1278943210', '5'),
       ('1378943210', '978-1378943210', '3'),
       ('2378943210', '978-2378943210', '6');

INSERT INTO book_character(isbn_10, isbn_13, ch_id)
VALUES ('1529409713', '978-1529409710', '1'),
       ('0857525085', '978-0857525086', '4'),
       ('8376804582', '979-8376804582', '2'),
       ('9780241250310', '978-0241250310', '2'),
       ('1398525685', '978-1398525689', '3'),
       ('9876543210', '978-9876543210', '6'),
       ('1578943210', '978-1578943210', '7'),
       ('1278943210', '978-1278943210', '8'),
       ('1378943210', '978-1378943210', '6'),
       ('2378943210', '978-2378943210', '5');

