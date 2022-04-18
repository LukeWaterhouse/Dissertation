import express, { query } from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import ProfileInfo from './models/ProfileInfo.js'

await mongoose.connect('mongodb://mongo:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', console.log)
const app = express()
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//handles cross policy origin
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8000'
  })
)

app.post('/NewProfile', (req, res) => {
  const { userName, password } = req.body
  console.log('creating profile information')
  console.log(userName)
  const profileInfo = new ProfileInfo({
    userName: userName,
    location: 'placeholder',
    About: 'placeholder',
    Tag1: 'placeholder',
    Tag2: 'placeholder',
    Tag3: 'placeholder',
    Tag4: 'placeholder'
  })
  profileInfo.save().then((profileInformation) => {
    console.log(profileInformation)
    console.log('saved profile information')
  })

  res.send('Hi from server 3')
})

app.get('/ProfileInfo', (req, res) => {
  let userName = req.query.username
  //console.log(userName)
  ProfileInfo.findOne({ userName }).then((profileInfo) => {
    if (profileInfo == null) {
      console.log('null..')
    } else {
      // console.log(userName)
      // console.log(profileInfo)
      // console.log(profileInfo.location)
      //console.log("found")
      res.send({
        location: profileInfo.location,
        About: profileInfo.About,
        Tag1: profileInfo.Tag1,
        Tag2: profileInfo.Tag2,
        Tag3: profileInfo.Tag3,
        Tag4: profileInfo.Tag4
      })
    }
  })
})

app.put('/ProfileInfo', (req, res) => {
  console.log('put info')
  let field = req.query.field //about, location, tag:
  let user = req.query.username // Luke
  let reqContent = req.query.content //content

  console.log(field)
  console.log(user)
  console.log(reqContent)
  var content

  let filter = { userName: user }
  console.log(filter)
  var obj = {}

  obj[field] = reqContent

  console.log(obj)

  let profileUpdate = ProfileInfo.findOneAndUpdate(
    filter,
    obj,
    { new: true },
    (err, doc) => {
      if (err) {
        console.log('something went wrong updating')
      } else {
        console.log(doc)
      }
    }
  )

  app.get('/', (req, res) => {
    res.send('server 3!')
  })
})

app.listen(49153, function () {
  console.log('Server 3 running!')
})
