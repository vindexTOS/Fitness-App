import mongoose from 'mongoose'

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || '')
    console.log('MongoDB has connected')
  } catch (error) {
    console.log(error)
  }
}

export default dbConnect
