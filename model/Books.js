import mongoose from "mongoose";

/* const bookSchema = new mongoose.Schema({
  title: String,
  genre: String,
  publicationDate: Date,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'authors' }
})

const Book = mongoose.model('books', bookSchema);

export default Books */

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: 'authors'
  },
  genre: String,
  publicationDate: Date,
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
      },
      rating: {
        type: Number,
        min: 0,
        max: 5
      }
    }
  ]
});

// Create model
const Books = mongoose.model('books', bookSchema);

// Export model
export default Books;