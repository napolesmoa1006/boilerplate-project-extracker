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


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  }
});

let User = mongoose.model('User', userSchema)

const exerciseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  duration: Number,
  date: Date
})

let Exercise = new mongoose.model('Exercise', exerciseSchema)


app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    console.log(err)
  }
})

app.post('/api/users', async (req, res) => {
  const model = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username
  })

  try {
    const user = await model.save()
    res.json(user)
  } catch (err) {
    console.log(err)
  }
})




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on http://localhost:' + listener.address().port)
})
