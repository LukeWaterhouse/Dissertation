import express from 'express'
import mongoose from 'mongoose'
import Post from './models/Post.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import jsonwebtoken from 'jsonwebtoken'
import axios from 'axios'

await mongoose.connect('mongodb://mongo:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

axios.defaults.timeout = 3000

db.on('error', console.log)
const app = express()
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//handles cross policy origins
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8000'
  })
)

//Adds new post to database
app.post('/Posts', (req, res) => {
  console.log('making post reload?')
  const { userName, date, content } = req.body

  axios
    .get(
      'http://192.168.1.230:49153/ProfileInfo',
      { params: { username: userName } },
      { withCredentials: true }
    )
    .then((response) => {
      var location = response.data.location

      const post = new Post({
        userName: userName,
        date: date,
        content: content,
        location: location
      })
      post.save().then((postInfo) => {
        console.log(postInfo)
        res.send('made a post reload?')
      })
    }).catch(err => {
      console.log(err)
      const post = new Post({
        userName: userName,
        date: date,
        content: content,
        location: "Unknown"
      })

      post.save().then((postInfo) => {
        console.log(postInfo)
        res.send('made a post reload?')
      })

    })
})

//returns all posts from database
app.get('/Posts', (req, res) => {
  Post.find({}, function (err, posts) {
    var postMap = {}
    posts.forEach(function (post) {
      postMap[post._id] = post
    })
    res.send(postMap)
  })
})

//deletes all posts in database
app.delete('/Posts', (req, res) => {
  Post.remove({}.callback).then((deleteInfo) => {
    res.send('deleted posts')
  })
})

app.get('/', (req, res) => {
  res.send('server 2!')
})

app.listen(49152, function () {
  console.log('Server 2 running')
})
