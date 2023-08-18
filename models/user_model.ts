import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
})

export default mongoose.model('weight_user', userModel)
