const express = require('express')
//const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectId } = require('mongodb')
const app = express()
const port = 3000

app.use(express.json())

const client = new MongoClient('mongodb://root:example@localhost:27017')
//callback
var db

client.connect(function (err, result) {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  db = client.db('apple')
})

var idSeq = 1
// CRUD
const Members = []

app.get('/members', (req, res) => {
  client
    .db('apple')
    .collection('members')
    .find({})
    .toArray((err, docs) => {
      res.send(docs)
    })
})

app.get('/members/:id', (req, res) => {
  const reqId = req.params.id

  client
    .db('apple')
    .collection('members')
    .findOne({ _id: new ObjectId(reqId) }, (err, docs) => {
      console.log(err)
      console.log(doc)
      if (err) {
        res.status(500).send(err.message)
        return
      }

      if (!docs) {
        res.sendStatus(404)
        return
      }

      res.send(docs)
    })
})

app.post('/members/', (req, res) => {
  const { name, country } = req.body

  // mongodb _id
  const newMember = { name, country }
  client
    .db('apple')
    .collection('members')
    .insertOne(newMember, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send(err.message)
        return
      }
      //res.sendStatus(201) // created status code
      res.status(201).send({ _id: result.insertedId })
    })
  // 아직 연결을 물고 있는 상태
})

app.put('/members/:id', (req, res) => {
  const reqId = req.params.id
  const newMember = req.body

  // !주의 mongodb 특성상 정의한 목록 이외에 다른 항목은 사라지게 되는 특성이 있다.
  client
    .db('apple')
    .collection('members')
    .updateOne(
      { _id: new ObjectId(reqId) },
      { $set: newMember },
      (err, result) => {
        if (err) {
          console.error(err)
          res.status(500).send(err.message)
          return
        }
        res.sendStatus(200)
      }
    )
})

app.delete('/members/:id', (req, res) => {
  // 삭제할 인덱스를 찾는다.
  const reqId = req.params.id
  client
    .db('apple')
    .collection('members')
    .deleteOne({ _id: new ObjectId(reqId) }, (err, result) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      res.sendStatus(200)
    })

  const idx = Members.findIndex((v) => v.id === parseInt(reqId))
  Members.splice(idx, 1)
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Signle Process
// Event Driven
//
