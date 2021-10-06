// let mongoose_url = `mongodb://localhost:27017/notesApiRest`
import mongoose from 'mongoose';
import config from './config'
let urlMongoose = config.MONGOOSE_URL
if (process.env.NODE_ENV === 'test') {
    urlMongoose = `mongodb://localhost:27017/notesApiRest-test`
}
export async function connectDB() {
    await mongoose.connect(urlMongoose || `mongodb://localhost:27017/notesApiRest`)
    console.log("DB CONNECTED")
}

export async function closeDB() {
    await mongoose.connection.close()
}