SET SCHEMA 'amazon_books';

-- 1. Sell a book to a customer
INSERT INTO "order" (description, c_id, total_price)
VALUES ('Book purchase', 2, 35);

INSERT INTO book_order (isbn_10, isbn_13, o_id, quantity, unit_price, total_price)
VALUES ('1378943210', '978-1378943210', 1, 1, 35, 35);

UPDATE book SET units = units - 1  WHERE isbn_10 = '1378943210';

-- 2. Change the address of a customer
UPDATE customer
SET street_name = 'New Street Name', street_number = 'New Street Number'
WHERE id = 3;

-- 3. Add an existing author to a book
INSERT INTO book_author (a_id, isbn_10, isbn_13)
VALUES (1,'9780241250310','978-0241250310');

-- 4. Retire the "Space Opera" category and assign all books from that category to the parent category. Do not assume you know an id of the parent category.
DO $$
DECLARE
    sp_id INTEGER := (SELECT id FROM category WHERE name = 'Space Opera');
    parent_id INTEGER := (SELECT parent_id FROM category WHERE id = sp_id);
BEGIN
    UPDATE book_category
    SET ca_id = parent_id
    WHERE ca_id = sp_id;

    DELETE FROM category
    WHERE id = sp_id;
END $$;

-- 5. Sell 3 copies of one book and 2 of another in a single order
INSERT INTO "order" (description, c_id, total_price)
VALUES ('Book purchase', 1, 109);

INSERT INTO book_order (isbn_10, isbn_13, o_id, quantity, unit_price, total_price)
VALUES ('9876543210', '978-9876543210', 2, 3, 25, 75);

INSERT INTO book_order (isbn_10, isbn_13, o_id, quantity, unit_price, total_price)
VALUES ('1278943210', '978-1278943210', 2, 2, 17, 34);

DO $$
DECLARE
    bo1_isbn VARCHAR := '9876543210';
    bo1_q INTEGER := 3;
    bo2_isbn VARCHAR := '1278943210';
    bo2_q INTEGER := 2;
BEGIN
    UPDATE book SET units = units - bo1_q  WHERE isbn_10 = bo1_isbn;
    UPDATE book SET units = units - bo2_q  WHERE isbn_10 = bo2_isbn;
END$$;
