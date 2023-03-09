books_ids = {
    "RG": db.book.findOne({ title: "Ruth Galloway series" })._id,
    "GP": db.book.findOne({ title: "Going Postal: (Discworld Novel 33) (Discworld Novels)" })._id,
    "RPG": db.book.findOne({ title: "Torith: A LitRPG Adventure (System Universe)" })._id,
    "TTB": db.book.findOne({ title: "The Tank Book: The Definitive Visual History of Armoured Vehicles" })._id,
    "IB": db.book.findOne({ title: "IceBreaker" })._id,
    "HP": db.book.findOne({ title: "Harry Potter" })._id,
    "LOTB": db.book.findOne({ title: "Lord of the bracelet" })._id,
    "GB": db.book.findOne({ title: "Garbage Man" })._id,
    "TW": db.book.findOne({ title: "Them witches" })._id,
    "BK": db.book.findOne({ title: "Boss killer" })._id,
}

authors_ids = {
    "MB": db.author.findOne({ name: "Max Brooks" })._id,
    "JK": db.author.findOne({ name: "Rupert Farley" })._id,
    "EG": db.author.findOne({ name: "Elly Griffiths" })._id,
    "STP": db.author.findOne({ name: "Sir Terry Pratchett" })._id,
}

genres_ids = {
    "HR": db.genre.findOne({ name: "Horror" })._id,
    "HM": db.genre.findOne({ name: "Humour" })._id,
    "MY": db.genre.findOne({ name: "Mystery" })._id,
    "NR": db.genre.findOne({ name: "Non-Romantic" })._id,
    "RO": db.genre.findOne({ name: "Romantic" })._id,
    "TH": db.genre.findOne({ name: "Thriller" })._id,
}

publishers_ids = {
    "SU": db.publisher.findOne({ name: "SunriseCV" })._id,
    "HA": db.publisher.findOne({ name: "HarperVoyager" })._id,
    "AU": db.publisher.findOne({ name: "Audible Studios" })._id,
    "QU": db.publisher.findOne({ name: "Quercus" })._id,
    "DO": db.publisher.findOne({ name: "Doubleday" })._id
}

languages_ids = {
    "EN": db.language.findOne({ name: "English" })._id,
    "FR": db.language.findOne({ name: "French" })._id,
    "GE": db.language.findOne({ name: "German" })._id,
    "IT": db.language.findOne({ name: "Italian" })._id,
    "SP": db.language.findOne({ name: "Spanish" })._id,
}

formats_ids = {
    "HC" : db.format.findOne({name:"Hardcover"})._id,
    "PB" : db.format.findOne({name:"Paperback"})._id,
    "AB" : db.format.findOne({name:"Audiobooks"})._id,
    "KB" : db.format.findOne({name:"Kindle Books"})._id,
    "SP" : db.format.findOne({name:"Spiral-bound"})._id,
}

// modify publisher, language and format ids with references to their collections
db.book.updateMany({}, {$unset : { p_id : 1 }})
db.book.updateMany({}, {$unset : { l_id : 1 }})
db.book.updateMany({}, {$unset : { f_id : 1 }})

db.book.update({ _id: books_ids.RG }, { $push: { format: formats_ids.HC } })
db.book.update({ _id: books_ids.GP }, { $push: { format: formats_ids.AB } })
db.book.update({ _id: books_ids.RPG }, { $push: { format: formats_ids.HC } })
db.book.update({ _id: books_ids.TTB }, { $push: { format: formats_ids.HC } })
db.book.update({ _id: books_ids.IB }, { $push: { format: formats_ids.HC } })
db.book.update({ _id: books_ids.HP }, { $push: { format: formats_ids.PB } })
db.book.update({ _id: books_ids.LOTB }, { $push: { format: formats_ids.PB } })
db.book.update({ _id: books_ids.GB }, { $push: { format: formats_ids.HC } })
db.book.update({ _id: books_ids.TW }, { $push: { format: formats_ids.HC } })
db.book.update({ _id: books_ids.BK }, { $push: { format: formats_ids.HC } })

db.book.update({ _id: books_ids.RG }, { $push: { language: languages_ids.EN } })
db.book.update({ _id: books_ids.GP }, { $push: { language: languages_ids.EN } })
db.book.update({ _id: books_ids.RPG }, { $push: { language: languages_ids.SP } })
db.book.update({ _id: books_ids.TTB }, { $push: { language: languages_ids.IT } })
db.book.update({ _id: books_ids.IB }, { $push: { language: languages_ids.GE } })
db.book.update({ _id: books_ids.HP }, { $push: { language: languages_ids.EN } })
db.book.update({ _id: books_ids.LOTB }, { $push: { language: languages_ids.GE } })
db.book.update({ _id: books_ids.GB }, { $push: { language: languages_ids.EN } })
db.book.update({ _id: books_ids.TW }, { $push: { language: languages_ids.FR } })
db.book.update({ _id: books_ids.BK }, { $push: { language: languages_ids.EN } })

db.book.update({ _id: books_ids.RG }, { $push: { publisher: publishers_ids.QU } })
db.book.update({ _id: books_ids.GP }, { $push: { publisher: publishers_ids.SU } })
db.book.update({ _id: books_ids.RPG }, { $push: { publisher: publishers_ids.DO } })
db.book.update({ _id: books_ids.TTB }, { $push: { publisher: publishers_ids.HA } })
db.book.update({ _id: books_ids.IB }, { $push: { publisher: publishers_ids.DO } })
db.book.update({ _id: books_ids.HP }, { $push: { publisher: publishers_ids.QU } })
db.book.update({ _id: books_ids.LOTB }, { $push: { publisher: publishers_ids.HA } })
db.book.update({ _id: books_ids.GB }, { $push: { publisher: publishers_ids.SU } })
db.book.update({ _id: books_ids.TW }, { $push: { publisher: publishers_ids.SU } })
db.book.update({ _id: books_ids.BK }, { $push: { publisher: publishers_ids.DO } })


// updating the book collection with a genre reference

db.book.update({ _id: books_ids.RG }, { $push: { genre: genres_ids.MY } })
db.book.update({ _id: books_ids.GP }, { $push: { genre: genres_ids.HR } })
db.book.update({ _id: books_ids.RPG }, { $push: { genre: genres_ids.HM } })
db.book.update({ _id: books_ids.TTB }, { $push: { genre: genres_ids.NR } })
db.book.update({ _id: books_ids.IB }, { $push: { genre: genres_ids.RO } })
db.book.update({ _id: books_ids.HP }, { $push: { genre: genres_ids.HR } })
db.book.update({ _id: books_ids.LOTB }, { $push: { genre: genres_ids.HR } })
db.book.update({ _id: books_ids.GB }, { $push: { genre: genres_ids.RO } })
db.book.update({ _id: books_ids.TW }, { $push: { genre: genres_ids.MY } })
db.book.update({ _id: books_ids.BK }, { $push: { genre: genres_ids.TH } })

// updating the book collection with author reference 

db.book.update({ _id: books_ids.RG }, { $push: { author: authors_ids.EG } })
db.book.update({ _id: books_ids.GP }, { $push: { author: authors_ids.EG } })
db.book.update({ _id: books_ids.RPG }, { $push: { author: authors_ids.EG } })
db.book.update({ _id: books_ids.TTB }, { $push: { author: authors_ids.JK } })
db.book.update({ _id: books_ids.IB }, { $push: { author: authors_ids.JK } })
db.book.update({ _id: books_ids.HP }, { $push: { author: authors_ids.JK } })
db.book.update({ _id: books_ids.LOTB }, { $push: { author: authors_ids.MB } })
db.book.update({ _id: books_ids.GB }, { $push: { author: authors_ids.MB } })
db.book.update({ _id: books_ids.TW }, { $push: { author: authors_ids.STP } })
db.book.update({ _id: books_ids.BK }, { $push: { author: authors_ids.STP } })



