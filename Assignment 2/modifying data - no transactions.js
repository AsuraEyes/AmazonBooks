customers_ids = {
    "TF": db.customers.findOne({ first_name: "Tom", last_name: "Fluke" })._id,
    "JA": db.customers.findOne({ first_name: "Jose", last_name: "Armando" })._id,
    "KH": db.customers.findOne({ first_name: "Ketchup", last_name: "Heinz" })._id
}

books_ids = {
    "TTB": db.books.findOne({ title: "The Tank Book: The Definitive Visual History of Armoured Vehicles" })._id,
    "HP": db.books.findOne({ title: "Harry Potter" })._id,
    "GB": db.books.findOne({ title: "Garbage Man" })._id,
    "TW": db.books.findOne({ title: "Them Witches" })._id
}

authors_ids = {
    "MB": db.authors.findOne({ name: "Max Brooks" })._id,
    "JK": db.authors.findOne({ name: "Rupert Farley" })._id,
    "EG": db.authors.findOne({ name: "Elly Griffiths" })._id,
    "STP": db.authors.findOne({ name: "Sir Terry Pratchett" })._id,
}


const orders = db.orders;
const items = db.items;
const books = db.books;

// Sell a book to a customer - try to use update instead of aggregate

const insertedOrder = orders.insertOne(
    {
        customer: customers_ids.JA,
        description: "good book",
        date: new Date(),
    }
)

items.insertOne(
    {
        order: insertedOrder.insertedId,
        book: books_ids.HP,
        quantity: 2,
        unit_price: db.books.findOne({ title: "Harry Potter" }).price
    });
items.insertOne(
    {
        order: insertedOrder.insertedId,
        book: books_ids.TW,
        quantity: 3,
        unit_price: db.books.findOne({ title: "Them Witches" }).price
    });
books.updateOne(
    {
        _id: books_ids.TW
    },
    {
        $inc: {
            units: -1
        }
    });
items.aggregate(
    { $match: { book: books_ids.HP } },
    {
        $set: {
            total_price: {
                $multiply: ["$unit_price", "$quantity"]
            }
        }
    },
    { $merge: "items" }
);
items.aggregate(
    {$match : { order: insertedOrder.insertedId}},
    {
        $group: {
            _id: "$order",
            total_price: {
                $sum: "$total_price"
            }
        }
    },
    {$merge: "orders"}   
)

// Change the address of a customer

db.customers.updateOne(
    { _id: customers_ids.KH },
    { $set: { street_name: "New Street Name", street_number: "New Street Number" } }
)

// Add an existing author to a book

db.books.updateOne(
    { _id: books_ids.TTB },
    { $push: { authors: authors_ids.MB } }
)

// Retire the "Space Opera" category and assign all books from that category to the parent category. Don't assume you know the id of the parent category.

// Sell 3 copies of one book and 2 of another in a single order
// Similar to first problem, replace insertOne with insertMany - try to use transactions, and update instead of aggregate

