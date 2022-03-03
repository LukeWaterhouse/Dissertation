import express from 'express'
import mongoose from 'mongoose'

await mongoose.connect('mongodb://mongo:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', console.log)


const app = express()
app.listen(49152, function () {
    console.log('Server 2 running')
  })