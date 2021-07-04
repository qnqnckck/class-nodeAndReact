const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

var idSeq = 1
// CRUD
const Members = [
  { id: idSeq++, name: '김용성', country: 'KR' },
  { id: idSeq++, name: '정희원', country: 'KR' },
  { id: idSeq++, name: '홍길동', country: 'US' },
  { id: idSeq++, name: '김제이', country: 'KR' },
  { id: idSeq++, name: '김케이', country: 'US' },
  { id: idSeq++, name: '정윤채', country: 'KR' },
]

app.get('/members', (req, res) => {
  res.send(Members)
})

app.get('/members/:id', (req, res) => {
  const reqId = req.params.id

  // id로 데이터를 찾아서 있으면 응답, 아니면 404
  const found = Members.find((v) => v.id === parseInt(reqId))
  console.log(found)

  if (found === undefined) {
    res.sendStatus(404)
    return
  }
  res.send(found)
})

app.post('/members/', (req, res) => {
  // const name = req.body.name,
  // coutry = req.body.country
  // 구조분해
  const { name, country } = req.body
  const newMember = { id: idSeq++, name, country }
  Members.push(newMember)

  res.sendStatus(201) // created status code
})

app.put('/members/', (req, res) => {
  res.end()
})

app.delete('/members/', (req, res) => {
  res.end()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Signle Process
// Event Driven
//
