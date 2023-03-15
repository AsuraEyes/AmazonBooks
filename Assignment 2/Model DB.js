db.authors.remove({})
db.books.remove({})
db.categories.remove({})
db.characters.remove({})
db.countries.remove({})
db.customers.remove({})
db.formats.remove({})
db.genres.remove({})
db.languages.remove({})
db.orders.remove({})
db.publishers.remove({})

db.authors.insertMany([
    {
        name: "Max Brooks",
        picture: ""
    },
    {
        name: "Rupert Farley",
        picture: ""
    },
    {
        name: "Elly Griffiths",
        picture: ""
    },
    {
        name: "Sir Terry Pratchett",
        picture: ""
    }
])

authors_ids = {
    "MB": db.authors.findOne({ name: "Max Brooks" })._id,
    "JK": db.authors.findOne({ name: "Rupert Farley" })._id,
    "EG": db.authors.findOne({ name: "Elly Griffiths" })._id,
    "STP": db.authors.findOne({ name: "Sir Terry Pratchett" })._id,
}

db.books.insertMany([
    {
        isbn_10: '1529409713',
        isbn_13: '978-1529409710',
        title: 'Ruth Galloway series',
        description: 'Ruth and Nelson are working on a murder case in which Cathbad emerges as the prime suspect. Can they uncover the truth in time to save their friend?',
        pages: 384,
        dimensions: '16.2 x 3.6 x 23.6 cm',
        price: 17.36,
        units: 100
    },
    {
        isbn_10: '0857525085',
        isbn_13: '978-0857525086',
        title: 'Going Postal: (Discworld Novel 33) (Discworld Novels)',
        description: "His world, increasingly subtle and thoughtful, has become as allegorical and satirical as a painting by Bosch ... Pratchett's joy in his creations, in jokes, puns, the idea of letters and language itself makes GOING POSTAL one of the best expressions of his unstoppable flow of comic invention. ― The Times Published On: 2004-10-30",
        pages: 496,
        dimensions: '13.46 x 4.06 x 20.57 cm',
        price: 12.99,
        units: 10
    },
    {
        isbn_10: '8376804582',
        isbn_13: '979-8376804582',
        title: 'Torith: A LitRPG Adventure (System Universe)',
        description: 'Perfect',
        pages: 462,
        dimensions: '15.24 x 3.43 x 22.86 cm',
        price: 28.99,
        units: 16
    },
    {
        isbn_10: '9780241250310',
        isbn_13: '978-0241250310',
        title: 'The Tank Book: The Definitive Visual History of Armoured Vehicles',
        description: 'The best book',
        pages: 999,
        dimensions: '26 x 2.2 x 30.9 cm',
        price: 35.99,
        units: 2
    },
    {
        isbn_10: '1398525685',
        isbn_13: '978-1398525689',
        title: 'IceBreaker',
        description: 'The tiktok sensation',
        pages: 120,
        dimensions: '13 x 2.65 x 19.8 cm',
        price: 20.99,
        units: 50
    },
    {
        isbn_10: '9876543210',
        isbn_13: '978-9876543210',
        title: 'Harry Potter',
        description: 'good stuff',
        pages: 500,
        dimensions: '13 x 2.65 x 19.8 cm',
        price: 25.99,
        units: 50
    },
    {
        isbn_10: "1578943210",
        isbn_13: "978-1578943210",
        title: "Lord of the bracelet",
        description: "elves and dwarves",
        pages: 700,
        dimensions: "13 x 2.65 x 19.8 cm",
        price: 35.99,
        units: 15
    },
    {
        isbn_10: "1278943210",
        isbn_13: "978-1278943210",
        title: "Garbage Man",
        description: "superhero stuff",
        pages: 350,
        dimensions: "13 x 2.65 x 19.8 cm",
        price: 17.99,
        units: 120
    },
    {
        isbn_10: "1378943210",
        isbn_13: "978-1378943210",
        title: "Them witches",
        description: "spooky",
        pages: 200,
        dimensions: "13 x 2.65 x 19.8 cm",
        price: 35.99,
        units: 15
    },
    {
        isbn_10: "2378943210",
        isbn_13: "978-2378943210",
        title: "Boss killer",
        description: "crime, mafia",
        pages: 201,
        dimensions: "13 x 2.65 x 19.8 cm",
        price: 19.99,
        units: 22
    }

]);

books_ids = {
    "RG": db.books.findOne({ title: "Ruth Galloway series" })._id,
    "GP": db.books.findOne({ title: "Going Postal: (Discworld Novel 33) (Discworld Novels)" })._id,
    "RPG": db.books.findOne({ title: "Torith: A LitRPG Adventure (System Universe)" })._id,
    "TTB": db.books.findOne({ title: "The Tank Book: The Definitive Visual History of Armoured Vehicles" })._id,
    "IB": db.books.findOne({ title: "IceBreaker" })._id,
    "HP": db.books.findOne({ title: "Harry Potter" })._id,
    "LOTB": db.books.findOne({ title: "Lord of the Bracelet" })._id,
    "GB": db.books.findOne({ title: "Garbage Man" })._id,
    "TW": db.books.findOne({ title: "Them Witches" })._id,
    "BK": db.books.findOne({ title: "Boss Killer" })._id
}

db.categories.insertMany([
    {
        name: "Children's bookss"
    },
    {
        name: "Fiction"
    },
    {
        name: "History"
    },
    {
        name: "Biography"
    },
    {
        name: "Thrillers"
    },
    {
        name: "British Detectives"
    },
    {
        name: "Mystery"
    },
    {
        name: "Literature&Fiction"
    },
    {
        name: "Early Learning"
    },
    {
        name: "Science, Nature & How it works"
    },
    {
        name: "Crime Thrillers & Mystery"
    },
    {
        name: "Romance"
    },
    {
        name: "Literary Fiction"
    },
    {
        name: "Military History"
    },
    {
        name: "Historical Biographies"
    },
    {
        name: "Ancient History & Civilisation"
    },
    {
        name: "Historical"
    },
    {
        name: "Film, Television & Music"
    },
    {
        name: "Music"
    },
    {
        name: "Science Fiction & Fantasy"
    },
    {
        name: "Fantasy"
    },
    {
        name: "Science Fiction"
    },
    {
        name: "Epic"
    },
    {
        name: "Sword & Sorcery"
    },
    {
        name: "Fairy Tales"
    },
    {
        name: "Alternative History"
    },
    {
        name: "Urban"
    },
    {
        name: "Post-Apocalyptic"
    },
    {
        name: "Hard Science Fiction"
    },
    {
        name: "Myths & Legends"
    },
    {
        name: "Vehicles"
    },
    {
        name: "Space Opera"
    }
])

db.categories.update({ _id: categories_ids.TH }, { $push: { parentCategoryId: categories_ids.CTM } })
db.categories.update({ _id: categories_ids.MY }, { $push: { parentCategoryId: categories_ids.CTM } })
db.categories.update({ _id: categories_ids.BD }, { $push: { parentCategoryId: categories_ids.CTM } })
db.categories.update({ _id: categories_ids.LAF }, { $push: { parentCategoryId: categories_ids.CB } })
db.categories.update({ _id: categories_ids.SNH }, { $push: { parentCategoryId: categories_ids.CB } })
db.categories.update({ _id: categories_ids.EL }, { $push: { parentCategoryId: categories_ids.CB } })
db.categories.update({ _id: categories_ids.RO }, { $push: { parentCategoryId: categories_ids.FI } })
db.categories.update({ _id: categories_ids.LF }, { $push: { parentCategoryId: categories_ids.FI } })
db.categories.update({ _id: categories_ids.CTM }, { $push: { parentCategoryId: categories_ids.FI } })
db.categories.update({ _id: categories_ids.HB }, { $push: { parentCategoryId: categories_ids.HS } })
db.categories.update({ _id: categories_ids.MH }, { $push: { parentCategoryId: categories_ids.HS } })
db.categories.update({ _id: categories_ids.AHC }, { $push: { parentCategoryId: categories_ids.HS } })
db.categories.update({ _id: categories_ids.MU }, { $push: { parentCategoryId: categories_ids.BI } })
db.categories.update({ _id: categories_ids.HI }, { $push: { parentCategoryId: categories_ids.BI } })
db.categories.update({ _id: categories_ids.FTM }, { $push: { parentCategoryId: categories_ids.BI } })
db.categories.update({ _id: categories_ids.VE }, { $push: { parentCategoryId: categories_ids.LF } })
db.categories.update({ _id: categories_ids.SF }, { $push: { parentCategoryId: categories_ids.SFF } })
db.categories.update({ _id: categories_ids.FA }, { $push: { parentCategoryId: categories_ids.SFF } })
db.categories.update({ _id: categories_ids.SS }, { $push: { parentCategoryId: categories_ids.FA } })
db.categories.update({ _id: categories_ids.FT }, { $push: { parentCategoryId: categories_ids.FA } })
db.categories.update({ _id: categories_ids.EP }, { $push: { parentCategoryId: categories_ids.FA } })
db.categories.update({ _id: categories_ids.SO }, { $push: { parentCategoryId: categories_ids.SF } })
db.categories.update({ _id: categories_ids.UR }, { $push: { parentCategoryId: categories_ids.SF } })
db.categories.update({ _id: categories_ids.PA }, { $push: { parentCategoryId: categories_ids.SF } })
db.categories.update({ _id: categories_ids.AH }, { $push: { parentCategoryId: categories_ids.SF } })
db.categories.update({ _id: categories_ids.HSF }, { $push: { parentCategoryId: categories_ids.AH } })
db.categories.update({ _id: categories_ids.ML }, { $push: { parentCategoryId: categories_ids.HSF } })

db.characters.insertMany([
    {
        name: "AIs"
    },
    {
        name: "Aliens"
    },
    {
        name: "Clones"
    },
    {
        name: "Corporations"
    },
    {
        name: "Mutants"
    },
    {
        name: "Pirates"
    },
    {
        name: "Psychics"
    },
    {
        name: "Robots & Androids"
    }
])

characters_ids = {
    "AI": db.characters.findOne({ name: "AIs" })._id,
    "AL": db.characters.findOne({ name: "Aliens" })._id,
    "CL": db.characters.findOne({ name: "Clones" })._id,
    "CO": db.characters.findOne({ name: "Corporations" })._id,
    "MU": db.characters.findOne({ name: "Mutants" })._id,
    "PI": db.characters.findOne({ name: "Pirates" })._id,
    "PS": db.characters.findOne({ name: "Psychics" })._id,
    "RA": db.characters.findOne({ name: "Robots & Androids" })._id
}

db.characters.update({ _id: characters_ids.AI }, { $push: { categories: categories_ids.SF } })
db.characters.update({ _id: characters_ids.AL }, { $push: { categories: categories_ids.SF } })
db.characters.update({ _id: characters_ids.CL }, { $push: { categories: categories_ids.SF } })
db.characters.update({ _id: characters_ids.CO }, { $push: { categories: categories_ids.FI } })
db.characters.update({ _id: characters_ids.MU }, { $push: { categories: categories_ids.FI } })
db.characters.update({ _id: characters_ids.PI }, { $push: { categories: categories_ids.FI } })
db.characters.update({ _id: characters_ids.PS }, { $push: { categories: categories_ids.SFF } })
db.characters.update({ _id: characters_ids.RA }, { $push: { categories: categories_ids.SF } })

db.countries.insertMany([
    {
        name: 'UK'
    },
    {
        name: 'Spain'
    },
    {
        name: 'Germany'
    },
    {
        name: 'Italy'
    },
    {
        name: 'France'
    }
])

countries_ids = {
    "UK": db.countries.findOne({ name: 'UK' })._id,
    "SP": db.countries.findOne({ name: 'Spain' })._id,
    "DU": db.countries.findOne({ name: 'Germany' })._id,
    "IT": db.countries.findOne({ name: 'Italy' })._id,
    "FR": db.countries.findOne({ name: 'France' })._id
}

db.customers.insertMany([
    {
        first_name: "Tom",
        last_name: "Fluke",
        email: "boardgameGeek@trustme.com",
        street_name: "Geekway",
        street_number: "1",
        postal_code: "9898",
        city: "Edinbored"
    },
    {
        first_name: "Jose",
        last_name: "Armando",
        email: "bobostrong@fake.es",
        street_name: "Reggaetton",
        street_number: "2",
        postal_code: "10008",
        city: "Barcelona"
    },
    {
        first_name: "Ketchup",
        last_name: "Heinz",
        email: "goodtobegood@mmm.ok",
        street_name: "Vroomvroom",
        street_number: "1234556",
        postal_code: "250",
        city: "Munich"
    }
])

customers_ids = {
    "TF": db.customers.findOne({ first_name: "Tom", last_name: "Fluke" })._id,
    "JA": db.customers.findOne({ first_name: "Jose", last_name: "Armando" })._id,
    "KH": db.customers.findOne({ first_name: "Ketchup", last_name: "Heinz" })._id
}

db.customers.update({ _id: customers_ids.TF }, { $push: { countries: countries_ids.UK } })
db.customers.update({ _id: customers_ids.JA }, { $push: { countries: countries_ids.SP } })
db.customers.update({ _id: customers_ids.KH }, { $push: { countries: countries_ids.DU } })

db.formats.insertMany([
    {
        name: "Hardcover"
    },
    {
        name: "Paperback"
    },
    {
        name: "Audiobooks"
    },
    {
        name: "Kindle Books"
    },
    {
        name: "Spiral-bound"
    }

])

formats_ids = {
    "HC": db.formats.findOne({ name: "Hardcover" })._id,
    "PB": db.formats.findOne({ name: "Paperback" })._id,
    "AB": db.formats.findOne({ name: "Audiobooks" })._id,
    "KB": db.formats.findOne({ name: "Kindle Books" })._id,
    "SP": db.formats.findOne({ name: "Spiral-bound" })._id
}

db.genres.insertMany([
    {
        name: "Horror"
    },
    {
        name: "Humour"
    },
    {
        name: "Mystery"
    },
    {
        name: "Non-Romantic"
    },
    {
        name: "Romantic"
    },
    {
        name: "Thriller"
    }
])

genres_ids = {
    "HR": db.genres.findOne({ name: "Horror" })._id,
    "HM": db.genres.findOne({ name: "Humour" })._id,
    "MY": db.genres.findOne({ name: "Mystery" })._id,
    "NR": db.genres.findOne({ name: "Non-Romantic" })._id,
    "RO": db.genres.findOne({ name: "Romantic" })._id,
    "TH": db.genres.findOne({ name: "Thriller" })._id
}

db.languages.insertMany([
    {
        name: "English"
    },
    {
        name: "French"
    },
    {
        name: "German"
    },
    {
        name: "Italian"
    },
    {
        name: "Spanish"
    }

])

languages_ids = {
    "EN": db.languages.findOne({ name: "English" })._id,
    "FR": db.languages.findOne({ name: "French" })._id,
    "GE": db.languages.findOne({ name: "German" })._id,
    "IT": db.languages.findOne({ name: "Italian" })._id,
    "SP": db.languages.findOne({ name: "Spanish" })._id
}

db.publishers.insertMany([
    {
        name: "SunriseCV",
        picture: ""
    },
    {
        name: "HarperVoyager",
        picture: ""
    },
    {
        name: "Audible Studios",
        picture: ""
    },
    {
        name: "Quercus",
        picture: ""
    },
    {
        name: "Doubleday",
        picture: ""
    }

])

publishers_ids = {
    "SU": db.publishers.findOne({ name: "SunriseCV" })._id,
    "HA": db.publishers.findOne({ name: "HarperVoyager" })._id,
    "AU": db.publishers.findOne({ name: "Audible Studios" })._id,
    "QU": db.publishers.findOne({ name: "Quercus" })._id,
    "DO": db.publishers.findOne({ name: "Doubleday" })._id
}

db.books.update({ _id: books_ids.RG }, { $push: { formats: formats_ids.HC } })
db.books.update({ _id: books_ids.GP }, { $push: { formats: formats_ids.AB } })
db.books.update({ _id: books_ids.RPG }, { $push: { formats: formats_ids.HC } })
db.books.update({ _id: books_ids.TTB }, { $push: { formats: formats_ids.HC } })
db.books.update({ _id: books_ids.IB }, { $push: { formats: formats_ids.HC } })
db.books.update({ _id: books_ids.HP }, { $push: { formats: formats_ids.PB } })
db.books.update({ _id: books_ids.LOTB }, { $push: { formats: formats_ids.PB } })
db.books.update({ _id: books_ids.GB }, { $push: { formats: formats_ids.HC } })
db.books.update({ _id: books_ids.TW }, { $push: { formats: formats_ids.HC } })
db.books.update({ _id: books_ids.BK }, { $push: { formats: formats_ids.HC } })

db.books.update({ _id: books_ids.RG }, { $push: { languages: languages_ids.EN } })
db.books.update({ _id: books_ids.GP }, { $push: { languages: languages_ids.EN } })
db.books.update({ _id: books_ids.RPG }, { $push: { languages: languages_ids.SP } })
db.books.update({ _id: books_ids.TTB }, { $push: { languages: languages_ids.IT } })
db.books.update({ _id: books_ids.IB }, { $push: { languages: languages_ids.GE } })
db.books.update({ _id: books_ids.HP }, { $push: { languages: languages_ids.EN } })
db.books.update({ _id: books_ids.LOTB }, { $push: { languages: languages_ids.GE } })
db.books.update({ _id: books_ids.GB }, { $push: { languages: languages_ids.EN } })
db.books.update({ _id: books_ids.TW }, { $push: { languages: languages_ids.FR } })
db.books.update({ _id: books_ids.BK }, { $push: { languages: languages_ids.EN } })

db.books.update({ _id: books_ids.RG }, { $push: { publishers: publishers_ids.QU } })
db.books.update({ _id: books_ids.GP }, { $push: { publishers: publishers_ids.SU } })
db.books.update({ _id: books_ids.RPG }, { $push: { publishers: publishers_ids.DO } })
db.books.update({ _id: books_ids.TTB }, { $push: { publishers: publishers_ids.HA } })
db.books.update({ _id: books_ids.IB }, { $push: { publishers: publishers_ids.DO } })
db.books.update({ _id: books_ids.HP }, { $push: { publishers: publishers_ids.QU } })
db.books.update({ _id: books_ids.LOTB }, { $push: { publishers: publishers_ids.HA } })
db.books.update({ _id: books_ids.GB }, { $push: { publishers: publishers_ids.SU } })
db.books.update({ _id: books_ids.TW }, { $push: { publishers: publishers_ids.SU } })
db.books.update({ _id: books_ids.BK }, { $push: { publishers: publishers_ids.DO } })


// updating the books collection with a genres reference

db.books.update({ _id: books_ids.RG }, { $push: { genres: genres_ids.MY } })
db.books.update({ _id: books_ids.GP }, { $push: { genres: genres_ids.HR } })
db.books.update({ _id: books_ids.RPG }, { $push: { genres: genres_ids.HM } })
db.books.update({ _id: books_ids.TTB }, { $push: { genres: genres_ids.NR } })
db.books.update({ _id: books_ids.IB }, { $push: { genres: genres_ids.RO } })
db.books.update({ _id: books_ids.HP }, { $push: { genres: genres_ids.HR } })
db.books.update({ _id: books_ids.LOTB }, { $push: { genres: genres_ids.HR } })
db.books.update({ _id: books_ids.GB }, { $push: { genres: genres_ids.RO } })
db.books.update({ _id: books_ids.TW }, { $push: { genres: genres_ids.MY } })
db.books.update({ _id: books_ids.BK }, { $push: { genres: genres_ids.TH } })

// updating the books collection with authors reference 

db.books.update({ _id: books_ids.RG }, { $push: { authors: authors_ids.EG } })
db.books.update({ _id: books_ids.GP }, { $push: { authors: authors_ids.EG } })
db.books.update({ _id: books_ids.RPG }, { $push: { authors: authors_ids.EG } })
db.books.update({ _id: books_ids.TTB }, { $push: { authors: authors_ids.JK } })
db.books.update({ _id: books_ids.IB }, { $push: { authors: authors_ids.JK } })
db.books.update({ _id: books_ids.HP }, { $push: { authors: authors_ids.JK } })
db.books.update({ _id: books_ids.LOTB }, { $push: { authors: authors_ids.MB } })
db.books.update({ _id: books_ids.GB }, { $push: { authors: authors_ids.MB } })
db.books.update({ _id: books_ids.TW }, { $push: { authors: authors_ids.STP } })
db.books.update({ _id: books_ids.BK }, { $push: { authors: authors_ids.STP } })