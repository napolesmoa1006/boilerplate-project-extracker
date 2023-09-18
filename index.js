require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require("mongoose") // <-- Import the mongoose module
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Now connected to MongoDB!')
  })
  .catch((err) => {
    console.error('Something went wrong', err)
  })

  

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on http://localhost:' + listener.address().port)
})
