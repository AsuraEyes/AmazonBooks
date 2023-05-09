// Querying data
//1. All books by an author 
MATCH(:Author {authorId:"2"})-[:WRITES]->(book:Book)
RETURN book

// 2. Total price of an order
MATCH (n:Order {orderId: "d0d0af77-1565-4956-b9cd-e034bffee562"})
RETURN n.totalPrice

// 3. Total sales (in £) to a customer
MATCH (c:Customer)-->(o:Order)
WHERE c.customerId = "2"
WITH SUM(o.totalPrice) AS totalSpent, c
RETURN  totalSpent, c.firstName

// 4. Books that are categorized as neither fiction nor non-fiction
MATCH(b:Book)-[CATEGORIZED_AS]->(c:Category)
WHERE NOT c.name="Fiction" AND NOT c.name=“Non-Fiction” 
RETURN b

// 5. Average page count by genre
MATCH (b:Book)-->(g:Genre)
RETURN g.name AS Genre, avg(toFloat(b.pages)) AS AverageOfPages

// 6. Categories that have no sub-categories
MATCH (c:Category)
WHERE NOT (:Category)-[:IS_SUBSET_OF]->(c)
RETURN c.name

// 7. ISBN numbers of books with more than one author
MATCH (b:Book)<--(a:Author)
WITH COUNT(a) AS authorsCount, b.isbn AS book
WHERE authorsCount > 1
RETURN book, authorsCount

// 8. ISBN numbers of books that sold at least X copies (you decide the value for X)
MATCH (b:Book)<-[c:CONTAINS]-()
WITH SUM(c.quantity) AS unitsSold, b
WHERE unitsSold >= 3
RETURN DISTINCT b.isbn

// 9. Number of copies of each book sold – unsold books should show as 0 sold copies.
MATCH (b:Book)
OPTIONAL MATCH (b) <- [c:CONTAINS]-()
WITH sum(c.quantity) as quantity, b
RETURN b.title, quantity

// 10. Best-selling books: The top 10 selling books ordered in descending order by number of sales.
MATCH (b:Book)
OPTIONAL MATCH (b) <- [c:CONTAINS]-()
WITH sum(c.quantity) as quantity, b
RETURN quantity, b.title ORDER BY quantity DESC LIMIT 10

// 11. Best-selling genres: The top 3 selling genres ordered in descending order by number of sales.
MATCH (b:Book) --> (g:Genre)
OPTIONAL MATCH (b) <- [c:CONTAINS]-()
WITH sum(c.quantity) as quantity, b, g.name AS genre
RETURN quantity, genre ORDER BY quantity DESC LIMIT 3

// 12. All science fiction books. Note: Books in science fiction subcategories like cyberpunk also count as science fiction.
MATCH (b:Book)
WHERE EXISTS ((b)-->(:Category {name: "Science Fiction"})) 
OR EXISTS ((b)-->(:Category)-[*]->(:Category {name:"Science Fiction"}))
RETURN DISTINCT b

//13. Characters used in science fiction books. Note from (12) applies here as well. 
MATCH (ch:Character)
WHERE EXISTS ((ch)-->(:Category {name: "Science Fiction"}))
OR EXISTS ((ch)-->(:Category)-[*]->(:Category {name:"Science Fiction"}))
RETURN DISTINCT ch

//14. Number of books in each category including books in subcategories.
MATCH (c:Category)
OPTIONAL MATCH (b:Book)
WHERE EXISTS ((b)-->(c))
OR EXISTS ((b)-->(:Category)-[*]->(c))
WITH c, COUNT(b) as numberOfBooks
RETURN c.name, COALESCE(numberOfBooks, 0) as numberOfBooks