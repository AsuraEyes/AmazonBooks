// Load authors
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/author.csv' AS au
MERGE (author:Author {authorId: au.id})
ON CREATE SET author.name = au.name, author.picture = au.picture;


// Load countries
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/country.csv' AS co
MERGE (country:Country {countryId: co.id})
ON CREATE SET country.name = co.name;


// Load formats
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/format.csv' AS fo
MERGE (format:Format {formatId: fo.id})
  ON CREATE SET format.name = fo.name;


// Load genre
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/genre.csv' AS ge
MERGE (genre:Genre {genreId: ge.id})
  ON CREATE SET genre.name = ge.name;


// Load languages
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/language.csv' AS la
MERGE (language:Language {languageId: la.id})
  ON CREATE SET language.name = la.name;


// Load publishers
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/publisher.csv' AS pu
MERGE (publisher:Publisher {publisherId: pu.id})
  ON CREATE SET publisher.name = pu.name, publisher.picture = pu.picture;


// Load customers
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/customer.csv' AS cu
MERGE (customer:Customer {customerId: cu.id})
  ON CREATE SET customer.firstName = cu.first_name,
   customer.lastName = cu.last_name, customer.email = cu.email, customer.streetName = cu.street_name, customer.postalCode = cu.postal_code, customer.city = cu.city


// Load categories
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/category.csv' AS ca
MERGE (category:Category {categoryId: ca.id})
  ON CREATE SET category.name = ca.name;


// Load characters
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/character.csv' AS ch
MERGE (character:Character {characterId: ch.id})
  ON CREATE SET character.name = ch.name;




// Load books
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/book.csv' AS b
MERGE (book:Book {isbn: b.isbn_10})
  ON CREATE SET book.title = b.title, book.description = b.description, book.pages =  toFloat(b.pages), book.price = toFloat(b.price), book.units =  toFloat(b.units)


// Recursive relationship for categories
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/category.csv' AS categ
MATCH (category: Category {categoryId:categ.id})
MATCH (parentCategory:Category{categoryId:categ.parent_id})
MERGE (category)-[:IS_SUBSET_OF]->(parentCategory)


// Relationship characters and categories
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/character.csv' AS char
MATCH (character:Character {characterId: char.id})
MATCH (category:Category {categoryId: char.ca_id})
MERGE (character)-[:BELONGS_TO]->(category);


// Relationship between customer and country
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/customer.csv' AS cust
MATCH (customer:Customer {customerId: cust.id})
MATCH (country:Country {countryId: cust.co_id})
MERGE (customer)-[x:LIVES_IN]->(country);


// Relationship from book to publisher, language and format
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/book.csv' AS boo
MATCH (book:Book {isbn: boo.isbn_10})
MATCH (publisher:Publisher {publisherId: boo.p_id})
MATCH (format:Format {formatId: boo.f_id})
MATCH (language:Language {languageId: boo.l_id})
MERGE (publisher)-[:PUBLISHES]->(book)-[:FORMATTED_AS]->(format)
MERGE (book)-[:WRITTEN_IN]->(language)


// Relationship from book to author
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/book_author.csv' AS auth
MATCH (book:Book {isbn: auth.isbn_10})
MATCH (author:Author {authorId: auth.a_id})
MERGE (book)<-[:WRITES]-(author)


// Relationship from book to category
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/book_category.csv' AS bcateg
MATCH (book:Book {isbn: bcateg.isbn_10})
MATCH (category:Category {categoryId: bcateg.ca_id})
MERGE (book)-[:CATEGORIZED_AS]->(category)


// Relationship from book to character
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/book_character.csv' AS bchar
MATCH (book:Book {isbn: bchar.isbn_10})
MATCH (character:Character {characterId: bchar.ch_id})
MERGE (book)-[:INCLUDES]->(character)


// Relationship from book to genre
LOAD CSV WITH HEADERS FROM 'https://gist.githubusercontent.com/AsuraEyes/47fec98c097ba817d3868a687a1dd9f1/raw/ae09bf2849432c434f0b6f1a9396f76c7063a0e9/book_genre.csv' AS bgen
MATCH (book:Book {isbn: bgen.isbn_10})
MATCH (genre:Genre {genreId: bgen.g_id})
MERGE (book)-[:TAGGED_AS]->(genre)


//Creating Constraints
CREATE CONSTRAINT author_id FOR (a:Author) REQUIRE a.authorId IS UNIQUE
CREATE CONSTRAINT book_id FOR (b:Book) REQUIRE b.isbn IS UNIQUE
CREATE CONSTRAINT category_id FOR (c:Category) REQUIRE c.categoryId IS UNIQUE
CREATE CONSTRAINT character_id FOR (c:Character) REQUIRE c.characterId IS UNIQUE
CREATE CONSTRAINT country_id FOR (c:Country) REQUIRE c.countryId IS UNIQUE
CREATE CONSTRAINT customer_id FOR (c:Customer) REQUIRE c.customerId IS UNIQUE
CREATE CONSTRAINT format_id FOR (f:Format) REQUIRE f.formatId IS UNIQUE
CREATE CONSTRAINT genre_id FOR (g:Genre) REQUIRE g.genreId IS UNIQUE
CREATE CONSTRAINT language_id FOR (l:Language) REQUIRE l.languageId IS UNIQUE
CREATE CONSTRAINT publisher_id FOR (p:Publisher) REQUIRE p.publisherId IS UNIQUE
CREATE CONSTRAINT order_id FOR (o:Order) REQUIRE o.orderId IS UNIQUE