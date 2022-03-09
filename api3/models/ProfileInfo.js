import mongoose from 'mongoose'
var schema = mongoose.Schema({
  userName: { type: String, unique: true },
  location: {type: String},
  About: {type: String},
  Tag1: {type: String},
  Tag2: {type: String},
  Tag3: {type: String},
  Tag4: {type: String}
})

var ProfileInfo = mongoose.model('ProfileInfo', schema)

export default ProfileInfo
