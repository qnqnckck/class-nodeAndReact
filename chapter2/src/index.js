const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Jei!')
})

const fooHandler = (req, res) => {
  res.send('Hello Foo!')
}

app.get('/foo', fooHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
