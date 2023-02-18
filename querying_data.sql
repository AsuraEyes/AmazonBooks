SET SCHEMA 'amazon_books';

-- 1. All books by an author
SELECT b.title
FROM book b
         JOIN book_author ba ON b.isbn_10 = ba.isbn_10 AND b.isbn_13 = ba.isbn_13
         JOIN author a ON ba.a_id = a.id
WHERE a.name = 'Max Brooks';

-- 2. Total price of an order
SELECT total_price
FROM "order"
WHERE id = 2;

-- 3. Total sales to a customer
SELECT c.first_name || ' ' || c.last_name AS customer_name, SUM(bo.total_price) AS total_sales
FROM customer c
         JOIN "order" o ON c.id = o.c_id
         JOIN book_order bo ON o.id = bo.o_id
GROUP BY customer_name;

-- 4. Books that are categorized as neither science fiction nor fantasy
SELECT b.title
FROM book b
         JOIN book_category bc ON b.isbn_10 = bc.isbn_10 AND b.isbn_13 = bc.isbn_13
         JOIN category c ON bc.ca_id = c.id
WHERE c.name NOT IN ('Science Fiction', 'Fantasy');

-- 5. Average page count by genre
SELECT genre.name AS genre_name, AVG(book.pages) AS average_page_count
FROM book_genre
         JOIN genre ON book_genre.g_id = genre.id
         JOIN book ON book_genre.isbn_10 = book.isbn_10 AND book_genre.isbn_13 = book.isbn_13
GROUP BY genre.name;

-- 6. Categories that have no sub-categories
SELECT c.name
FROM category c
WHERE c.parent_id IS NULL;

-- 7. ISBN numbers of books with more than one author
SELECT ba.isbn_10, ba.isbn_13
FROM book_author ba
GROUP BY ba.isbn_10, ba.isbn_13
HAVING COUNT(*) > 1;

-- 8. ISBN numbers of books that sold at least X copies (you decide the value for X)
SELECT bo.isbn_10, bo.isbn_13
FROM book_order AS bo
GROUP BY bo.isbn_10, bo.isbn_13
HAVING SUM(bo.quantity) >= 3;

-- 9. Number of copies of each book sold – unsold books should show as 0 sold copies
SELECT b.title, COALESCE(SUM(bo.quantity), 0) AS sold_copies
FROM book AS b
         LEFT JOIN book_order AS bo ON b.isbn_10 = bo.isbn_10 AND b.isbn_13 = bo.isbn_13
GROUP BY b.isbn_10, b.isbn_13
ORDER BY sold_copies DESC;

-- 10. Best-selling books: The top 10 selling books ordered in descending order by number of sales
SELECT b.title, SUM(bo.quantity) AS total_sales
FROM book b
         JOIN book_order bo ON b.isbn_10 = bo.isbn_10 AND b.isbn_13 = bo.isbn_13
GROUP BY b.title
ORDER BY total_sales DESC
LIMIT 10;

-- 11. Best-selling genres: The top 3 selling genres ordered in descending order by number of sales
SELECT genre.name, SUM(book_order.quantity) as total_quantity
FROM genre
         JOIN book_genre ON book_genre.g_id = genre.id
         JOIN book_order ON book_order.isbn_10 = book_genre.isbn_10 AND book_order.isbn_13 = book_genre.isbn_13
GROUP BY genre.name
ORDER BY total_quantity DESC
LIMIT 3;

-- 12. (Optional) All science fiction books (Hint: Google "WITH RECURSIVE")
WITH RECURSIVE sf_categories AS (
    SELECT id, name, parent_id
    FROM category
    WHERE name = 'Science Fiction'
  UNION ALL
    SELECT c.id, c.name, c.parent_id
    FROM category c
    JOIN sf_categories sfc ON c.parent_id = sfc.id
)

SELECT b.title
FROM book b
    JOIN book_category bc ON b.isbn_10 = bc.isbn_10 AND b.isbn_13 = bc.isbn_13
    JOIN sf_categories c ON bc.ca_id = c.id;


-- 13. (Optional) Characters used in science fiction books
SELECT DISTINCT character.name
FROM book_character
         INNER JOIN book_category
                    ON book_category.isbn_10 = book_character.isbn_10 AND book_category.isbn_13 = book_character.isbn_13
         INNER JOIN category ON category.id = book_category.ca_id
         INNER JOIN character ON character.id = book_character.ch_id
WHERE category.name = 'Science Fiction';

-- 14. (Optional) Number of books in each category
SELECT c.name AS category, COUNT(b.isbn_10) AS book_count
FROM category c
    LEFT JOIN book_category bc ON c.id = bc.ca_id
    LEFT JOIN book b ON bc.isbn_10 = b.isbn_10 AND bc.isbn_13 = b.isbn_13
GROUP BY c.name
ORDER BY book_count DESC;

