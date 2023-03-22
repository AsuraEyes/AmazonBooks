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

// Sell a book to a customer

const uri = 'mongodb://localhost:27017/'
const client = new MongoClient(uri);
await client.connect();

// Step 1: Start a Client Session
const session = client.startSession();

// Step 2: Optional. Define options to use for the transaction
const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
};

// Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
// Note: The callback for withTransaction MUST be async and/or return a Promise.
try {
    await session.withTransaction(async () => {
        const orders = client.db('AmazonBooks').collection('orders');
        const items = client.db('AmazonBooks').collection('items');
        const books = client.db('AmazonBooks').collection('books');

        // Important:: You must pass the session to the operations
        const item = await items.insertOne(
            {
                book: books_ids.TW,
                quantity: 1,
                unit_price: db.books.findOne({ title: "Them Witches" }).price
                //total_price:
                // { $multiply: ["$unit_price", "$quantity"] },
            }, { session });
        await books.updateOne(
            {
                _id: books_ids.TW
            },
            {
                $inc: {
                    units: -1
                }
            },
            { session });
        await items.aggregate(
            {
                $match: { book: books_ids.TW, total_price: { $multiply: ['quantity', 'unit_price'] } },
            },
            { session });
        const order = await orders.insertOne(
            {
                customer: customers_ids.JA,
                description: "good book",
                date: new Date(),
                items: [
                    item.insertedId
                ]
            },
            {session}
        )
    }, transactionOptions);
} finally {
    await session.endSession();
    await client.close();
}



