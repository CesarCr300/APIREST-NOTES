import mongoose from 'mongoose';
import config from './config'
export const connectDB = mongoose.connect(config.MONGOOSE_URL || "mongodb://localhost:27017/notesApiRest")
    .then(db => console.log("DB CONNECTED"))
    .catch(err => console.log(err))