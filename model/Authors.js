import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  firstname: String,
  lastname: String
})

const Author = mongoose.model('authors', authorSchema);

export default Author