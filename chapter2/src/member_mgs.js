const express = require('express')
const mongoose = require('mongoose')
const memberSchema = require('./MemberSchema')
const cors = require('cors')

mongoose.connect('mongodb://root:example@localhost:27017', {
  dbName: 'apple',
  userNewUrlParser: true,
  useUnifiedTopology: true,
})

const Member = mongoose.model('Members', memberSchema)

const app = express()
const port = 3010

app.use(express.json())
app.use(cors())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/members', (req, res) => {
  Member.find({}, (err, docs) => {
    if (err) {
      res.status(500).send(err.message)
      return
    }
    res.send(docs)
  })
})

app.get('/membersPromise', async (req, res) => {
  try {
    const members = await Member.find({})
    res.send(members)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.get('/members/:id', (req, res) => {
  const reqId = req.params.id

  Member.findOne({ _id: reqId }, (err, docs) => {
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

app.post('/members', async (req, res) => {
  const newMember = new Member(req.body)
  const error = newMember.validateSync()

  // TODO 에러가 났으면 처리
  if (error) {
    res.status(400).send({ message: error.message })
    return
  }
  try {
    await newMember.save()
  } catch (e) {
    res.status(500).send({ message: e.message })
    return
  }

  res.status(201).send({ _id: newMember._id.toString() })
})

app.put('/members/:id', async (req, res) => {
  const reqId = req.params.id
  const updates = req.body

  try {
    await Member.findByIdAndUpdate(reqId, updates, { runValidators: true })
  } catch (e) {
    res.status(500).send({ message: e.message })
    return
  }
  res.status(201).send({ _id: newMemeber._id.toString() })
})

app.post('/error', async (req, res) => {
  throw new Error('foo error')
})
