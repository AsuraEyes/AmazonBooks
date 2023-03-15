db.authors.drop({})
db.books.drop({})
db.categories.drop({})
db.characters.drop({})
db.countries.drop({})
db.customers.drop({})
db.formats.drop({})
db.genres.drop({})
db.languages.drop({})
db.orders.drop({})
db.publishers.drop({})

db.createCollection("authors", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            properties: {
                name: {
                    bsonType: "string"
                },
                picture: {
                    bsonType: "string"
                }
            }
        }
    }
})

db.createCollection("books", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["isbn_10", "isbn_13", "title", "description", "pages", "dimensions", "price", "units"],
            properties: {
                isbn_10: {
                    bsonType: "string"
                },
                isbn_13: {
                    bsonType: "string"
                },
                title: {
                    bsonType: "string"
                },
                dimensions: {
                    bsonType: "string"
                },
                pages: {
                    bsonType: "int"
                },
                description: {
                    bsonType: "string"
                },
                price: {
                    bsonType: "double"
                },
                units: {
                    bsonType: "int"
                },
                languages: {
                    bsonType: "array",
                    uniqueItems: true,
                    items: {
                        bsonType: "objectId"
                    }
                },
                authors: {
                    bsonType: "array",
                    uniqueItems: true,
                    items: {
                        bsonType: "objectId"
                    }
                },
                genres: {
                    bsonType: "array",
                    uniqueItems: true,
                    items: {
                        bsonType: "objectId"
                    }
                },
                characters: {
                    bsonType: "array",
                    uniqueItems: true,
                    items: {
                        bsonType: "objectId"
                    }
                }
            }
        }
    }
})

db.createCollection("categories", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            properties: {
                name: {
                    bsonType: "string",
                },
                parentCategoryId: {
                    bsonType: "objectId"
                }
            }
        }
    }
})

db.createCollection("languages", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            properties: {
                name: {
                    bsonType: "string"
                }
            }
        }
    }
})
