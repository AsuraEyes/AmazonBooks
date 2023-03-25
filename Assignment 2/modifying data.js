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

db.getCollection("unknown").find({})
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

//--------------------------------------------------------------------
db.orders.bulkWrite([
    {
        insertOne: {
            customer: customers_ids.JA,
            description: "good book",
            date: new Date(),
            items: [
                {
                    book: books_ids.TW,
                    quantity: 3,
                    unit_price: db.books.findOne({ title: "Them Witches" }).price
                }
            ]
        }
    },
    {
        updateOne: {
            "filter": { "items.book": books_ids.TW },
            "update":
                [{
                    $set: {
                        total_price: { $multiply: ["quantity", "price"] }
                    }
                }
                ]
        }
    }
])
//------------------------------------------------------------
const changeEvent = {
   "_id":{},
   "operationType": "insert",
   "clusterTime": "1631414145",
   "wallTime": new Date(),
   "ns": {
      "db": "AmazonBooks",
      "coll": "items"
   },
   "documentKey": {
      "_id": new BSON.ObjectId("641db12d9096a7f84fe9e671"),
   },
   "fullDocument": {
      "_id":  new BSON.ObjectId("641db12d9096a7f84fe9e671"),
      "quantity": 4,
      "unit_price": 50
}
} //Add a changeEvent to test it with your Trigger
exports(changeEvent);
