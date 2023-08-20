import mongoose from 'mongoose'

const dbDisconnect = async () => {
  try {
    await mongoose.connection.close()
    console.log('MongoDB has disconnected')
  } catch (error) {
    console.log(error)
  }
}

export default dbDisconnect
