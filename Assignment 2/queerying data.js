//1. All books by an author
db.authors.aggregate([
    {
        $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "authors",
            as: "ab"
        }
    },
    {
        $project: {
            _id: 1,
            Name: "$name",
            Books: "$ab.title"
        }
    }
])


//2. Total price of an order
db.orders.aggregate([
    {
        $lookup: {
            from: "items",
            localField: "items",
            foreignField: "_id",
            as: "oi"
        }
    },
    {
        $unwind: "$oi"
    },
    {
        $group: {
            _id: "$_id",
            Total: {
                $sum: { $multiply: ["$oi.quantity", "$oi.unit_price"] }
            }
        }
    }
])


//3. Total sales (in £) to a customer
db.customers.aggregate([
    {
        $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "customer",
            as: "co"
        }
    },
    {
        $project: {
            _id: 1,
            Name: {
                $concat: ["$first_name", " ", "$last_name"]
            },
            Total: {
                $concat: ["£ ", {
                    $toString: {
                        $sum: "$co.total_price"
                    }
                }]
            }
        }
    }
])

db.orders.aggregate([
    {
        $lookup: {
            from: "items",
            localField: "items",
            foreignField: "_id",
            as: "oi"
        }
    },
    {
        $unwind: "$oi"
    },
    {
        $group: {
            _id: "$customer",
            Total: {
                $sum: { $multiply: ["$oi.quantity", "$oi.unit_price"] }
            }
        }
    },
    {
        $project: {
            Total: {
                $concat: ["£ ",
                    { $toString: "$Total" }]

            }
        }
    }
])


//4. Books that are categorized as neither Fiction nor Non-Fiction
db.categories.aggregate([
    {
        $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "categories",
            as: "bc"
        }
    },
    {
        $match: {
            $and: [
                { name: { $ne: "Fiction" } },
                { name: { $ne: "Non-Fiction" } }
            ]
        }
    },
    {
        $project: {
            _id: 1,
            name: "$name",
            Books: "$bc.title"
        }
    }
])


//5. Average page count by genre
db.books.aggregate([
    {
        $unwind: "$genres"
    },
    {
        $group: {
            _id: "$genres",
            "AVG Page Count": {
                $avg: {
                    $sum: "$pages"
                }
            }
        }
    }
])


//6. Categories that have no sub-categories
db.categories.find({
    parentId: {
        $exists: false
    }
})


//7. ISBN numbers of books with more than one author
db.books.aggregate([
    {
        $addFields: {
            arrayLength: { $size: '$authors' }
        },
    },
    {
        $match: {
            "arrayLength": { $gt: 1 }
        }
    },
    {
        $project: {
            _id: 1,
            ISBN: "$isbn_13",
            Title: "$title"
        }
    }
])


//8. ISBN numbers of books that sold at least X copies (you decide the value for X)
db.books.aggregate([
    {
        $lookup: {
            from: "items",
            localField: "_id",
            foreignField: "book",
            as: "items"
        }
    },
    {
        $unwind: {
            path: "$items",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $group: {
            _id: "$isbn_13",
            Sold: { $sum: "$items.quantity" }
        }
    },
    {
        $match: {
            Sold: { $gte: 2 }
        }
    }
])


//9. Number of copies of each book sold – unsold books should show as 0 sold copies
db.books.aggregate([
    {
        $lookup: {
            from: "items",
            localField: "_id",
            foreignField: "book",
            as: "items"
        }
    },
    {
        $unwind: {
            path: "$items",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $group: {
            _id: "$title",
            Sold: { $sum: "$items.quantity" }
        }
    }
])


//10. Best-selling books: The top 10 selling books ordered in descending order by number of sales.
db.items.aggregate([
    {
        $lookup: {
            from: "books",
            localField: "book",
            foreignField: "_id",
            as: "books"
        }
    },
    {
        $unwind: {
            path: "$books",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $group: {
            _id: "$books.title",
            Sold: {
                $sum: "$quantity"
            }
        }
    },
    {
        $sort: {
            Sold: -1
        }
    },
    {
        $limit: 10
    }
])


//11. Best-selling genres: The top 3 selling genres ordered in descending order by number of sales.
db.books.aggregate([
    {
        $unwind: "$genres"
    },
    {
        $lookup: {
            from: "items",
            localField: "_id",
            foreignField: "book",
            as: "sales"
        }
    },
    {
        $unwind: {
            path: "$sales"
        }
    },
    {
        $lookup: {
            from: "genres",
            localField: "genres",
            foreignField: "_id",
            as: "top3"
        }
    },
    {
        $unwind: "$top3"
    },
    {
        $group: {
            _id: "$top3.name",
            sold: { $sum: "$sales.quantity" }
        }
    },
    {
        $sort: {
            sold: -1
        }
    },
    {
        $limit: 3
    }
])


//12. All Science Fiction books. Note: Books in Science Fiction subcategories like cyberpunk also count as
//Science Fiction. Don’t use your knowledge of the concrete category structure. (Hint: $graphLookup)
db.categories.aggregate([
    {
        $graphLookup: {
            from: "categories",
            startWith: "$parentId",
            connectFromField: "parentId",
            connectToField: "_id",
            as: "ch"
        }
    },
    {
        $match: {
            $or:
                [
                    {
                        $expr: {
                            $in: ["Science Fiction", "$ch.name"]
                        }
                    },
                    {
                        $expr: {
                            $eq: ["$name", "Science Fiction"]
                        }
                    }
                ]
        }
    },
    {
        $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "categories",
            as: "bc"
        }
    },
    {
        $project: {
            Name: "$name",
            Book: "$bc.title"
        }
    }
])


//13 Characters used in Science Fiction books. Note from (12) applies here as well.
db.categories.aggregate([
    {
        $graphLookup: {
            from: "categories",
            startWith: "$parentId",
            connectFromField: "parentId",
            connectToField: "_id",
            as: "ch"
        }
    },
    {
        $match: {
            $or:
                [
                    {
                        $expr: {
                            $in: ["Science Fiction", "$ch.name"]
                        }
                    },
                    {
                        $expr: {
                            $eq: ["$name", "Science Fiction"]
                        }
                    }
                ]
        }
    },
    {
        $lookup: {
            from: "characters",
            localField: "_id",
            foreignField: "category",
            as: "cc"
        }
    },
    {
        $project: {
            Name: "$name",
            Characters: "$cc.name"
        }
    },
    //    {
    //        $match: {
    //            Characters: {$gte: 1}
    //        }
    //    }
])


//14 For each category: Number of books in the category including books in its subcategories.
db.categories.aggregate([
    {
        $graphLookup: {
            from: "categories",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parentId",
            as: "ch"
        }
    },
    {
        $project: {
            _id: 1,
            name: 1,
            Categories: {
                $concatArrays: [["$_id"], "$ch._id"]
            }
        }
    },
    {
        $lookup: {
            from: "books",
            localField: "Categories",
            foreignField: "categories",
            as: "bc"
        }
    },
    {
        $project: {
            Name: "$name",
            Total: {
                $size: "$bc"
            }
        }
    }
])