import mongoose from 'mongoose';

export const connectDB = mongoose.connect("mongodb://localhost:27017/notesApiRest")
    .then(db => console.log("DB CONNECTED"))
    .catch(err => console.log(err))