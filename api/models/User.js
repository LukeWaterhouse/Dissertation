import mongoose from 'mongoose'
var schema = mongoose.Schema({
  userName: { type: String, unique: true },
  password: { type: String },
  location: {type: String},
  About: {type: String},
  Tag1: {type: String},
  Tag2: {type: String},
  Tag3: {type: String},
  Tag4: {type: String}
})

var User = mongoose.model('User', schema)

export default User
