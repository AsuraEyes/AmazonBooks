// Modifying data
// 1. Sell a book to a customer.


MATCH (b:Book {isbn: "9876543210"})
MATCH (c:Customer {customerId: "2"})
CREATE (o:Order {orderId:  randomUUID()})
MERGE (c)-[:MAKES]->(o)-[ob:CONTAINS]->(b)
    ON CREATE SET ob.quantity = 1
SET o.description= "Books sold to customer", o.totalPrice=ob.quantity * b.price
SET b.units = b.units - ob.quantity
// 2. Change the address of a customer.
MATCH (c:Customer {customerId: "2"})
SET c.address = "Somewhere, Somplace 123"
// 3. Add an existing author to a book.
MATCH (a:Author{authorId: "2"})
MATCH (b:Book {isbn: "9876543210"})
MERGE (a)-[:WRITES]->(b)
// 4. Retire the "Space Opera" category and assign all books from that category to the parent category. Don't assume you know the id of the parent category.
MATCH (catParent:Category)<-[:IS_SUBSET_OF]-(cat:Category{name:"Space Opera"})
OPTIONAL MATCH (b:Book)-[bc:CATEGORIZED_AS]->(cat)
OPTIONAL MATCH (char:Character)-[cb:BELONGS_TO]->(cat)
OPTIONAL MATCH (cat)<-[:IS_SUBSET_OF]-(catChild:Category)
FOREACH (_ IN CASE WHEN catChild IS NOT NULL THEN [1] ELSE [] END |
  MERGE (catParent)<-[:IS_SUBSET_OF]-(catChild)
)
FOREACH (_ IN CASE WHEN b IS NOT NULL THEN [1] ELSE [] END |
  MERGE (b)-[:CATEGORIZED_AS]->(catParent)
)
FOREACH (_ IN CASE WHEN char IS NOT NULL THEN [1] ELSE [] END |
  MERGE (catParent)<-[:BELONGS_TO]-(char)
)
DETACH DELETE cat


// 5. Sell 3 copies of one book and 2 of another in a single order
MATCH (b1:Book {isbn: "1278943210"})
MATCH (b2:Book {isbn: "1378943210"})
MATCH (c:Customer {customerId: "1"})
CREATE (o:Order {orderId: randomUUID()})
MERGE (c)-[:MAKES]->(o)
MERGE (b1)<-[ob1:CONTAINS]-(o)-[ob2:CONTAINS]->(b2)
ON CREATE SET ob1.quantity = 2,
ob2.quantity = 3
SET o.description = "Books sold to customer", o.totalPrice = ob1.quantity * b1.price + ob2.quantity * b2.price
SET b1.units = b1.units - ob1.quantity
SET b2.units = b2.units - ob2.quantity