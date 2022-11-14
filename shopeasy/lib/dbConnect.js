import mongoose from 'mongoose'

// const MONGODB_URI = "mongodb+srv://server:server@cluster0.bgu4xhh.mongodb.net/shopeasy"
// mongodb+srv://server:server@cluster0.bgu4xhh.mongodb.net/?retryWrites=true&w=majority
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect