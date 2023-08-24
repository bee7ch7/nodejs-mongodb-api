const express = require('express')
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require("mongodb")

// init app 
const app = express()
app.use(express.json())

// db connection
let db
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("port 3000")
    })
    db = getDb()
  }
})


// routes
app.get("/books", (req, res) => {

  const page = req.query.page || 0
  const booksPerPage = 5


  let books = []

  db.collection("books")
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch docs" })
    })

  // res.json({ msg: "welcome to books api" })
})

app.get("/books/page/:p", (req, res) => {

  const page = req.params.p || 0
  const booksPerPage = 5


  let books = []

  db.collection("books")
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch docs" })
    })

  // res.json({ msg: "welcome to books api" })
})


app.get("/books/:id", (req, res) => {

  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({ error: "Could not fetcg doc" })
      })
  } else {
    res.status(400).json({ error: "Invalid book id" })
  }
})

app.post("/books/create_one", (req, res) => {
  const book = req.body

  db.collection("books")
    .insertOne(book)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({ error: "Could not create book" })
    })
})


app.delete("/books/:id", (req, res) => {

  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({ error: "Could not delete doc" })
      })
  } else {
    res.status(400).json({ error: "Invalid book id" })
  }
})

app.patch("/books/:id", (req, res) => {

  const updates = req.body

  // console.log(req.body, req.params.id)

  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({ error: "Could not update doc" })
      })
  } else {
    res.status(400).json({ error: "Invalid book id" })
  }
})

