db.authors.drop({})
db.books.drop({})
db.categories.drop({})
db.characters.drop({})
db.countries.drop({})
db.customers.drop({})
db.formats.drop({})
db.genres.drop({})
db.items.drop({})
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
                description: {
                    bsonType: "string"
                },
                pages: {
                    bsonType: "int"
                },
                dimensions: {
                    bsonType: "string"
                },
                price: {
                    bsonType: "double"
                },
                units: {
                    bsonType: "int"
                },
                language: {
                        bsonType: "objectId"
                    },
                format: {
                        bsonType: "objectId"
                },
                authors: {
                    bsonType: "array",
                    uniqueItems: true,
                    items: {
                        bsonType: "objectId"
                    }
                },
                publishers: {
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
                categories: {
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
                parentId: {
                    bsonType: "objectId"
                },
            }
        }
    }
})

db.createCollection("characters", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "category"],
            properties: {
                name: {
                    bsonType: "string",
                },
                category: {
                    bsonType: "objectId"
                }
            }
        }
    }
})

db.createCollection("countries", {
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

db.createCollection("customers", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["first_name", "last_name", "email", "street_name", "street_number", "postal_code", "city"],
            properties: {
                first_name: {
                    bsonType: "string"
                },
                last_name: {
                    bsonType: "string"
                },
                email: {
                    bsonType: "string"
                },
                street_name: {
                    bsonType: "string"
                },
                street_number: {
                    bsonType: "string"
                },
                postal_code: {
                    bsonType: "string"
                },
                city: {
                    bsonType: "string"
                },
                country: {
                    bsonType: "objectId"
                }
            }
        }
    }
})

db.createCollection("formats", {
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

db.createCollection("genres", {
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

db.createCollection("items", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["book", "order", "quantity", "unit_price", "total_price"],
            properties: {
                book: {
                    bsonType: "objectId"
                },
                order: {
                    bsonType: "objectId"
                },
                quantity: {
                    bsonType: "int"
                },
                unit_price: {
                    bsonType: "double"
                },
                total_price: {
                    bsonType: "double"
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

db.createCollection("orders", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["description", "total_price", "date"],
            properties: {
                description: {
                    bsonType: "string"
                },
                total_price: {
                    bsonType: "double"
                },
                date: {
                    bsonType: "timestamp"
                }
            }
        }
    }
})

db.createCollection("publishers", {
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