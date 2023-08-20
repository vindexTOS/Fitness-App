import mongoose from 'mongoose'

const user_info_model = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },

  height: {
    type: Number,
    requried: true,
  },

  age: {
    type: Number,
    requried: true,
  },
  gender: {
    type: String,
    requried: true,
  },
  activities: {
    type: String,
    default: 'sedentary',
  },
  goal: {
    type: Number,
    requried: true,
  },
  units: {
    type: String,
    default: 'metric',
  },
  user_id: {
    type: String,
    required: true,
  },
})

export default mongoose.models.weight_user_info_model ||
  mongoose.model('weight_user_info_model', user_info_model)
