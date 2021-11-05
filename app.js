const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config()

//setup express

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
)

app.use(express.json())
app.use(
  cors({
    origin: '*',
  })
)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server has started in port: ${PORT}`))

// Setup Mongoose

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, async (err) => {
  if (err) throw err
  console.log('Mongodb connection successful')
})

// mongoose.connect(
//   process.env.MONGODB_CONNECTION_STRING,
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: false },
//   (err) => {
//     if (err) throw err
//     console.log('Mongodb connection successful')
//   }
// )

// setup routes

app.use('/auth/users', require('./routes/userRouter'))
app.use('/category', require('./routes/categoryRouter'))
app.use('/blog', require('./routes/blogRouter'))
app.use('/profile', require('./routes/profileRouter'))
