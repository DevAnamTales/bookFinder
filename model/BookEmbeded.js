import mongoose from "mongoose";

// Define schema for Book with embedding
const bookEmbSchema = new mongoose.Schema({
  title: String,
  author: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String
  },
  genre: String,
  publicationDate: Date,
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
const BookEmb = mongoose.model('BookEmb', bookEmbSchema);

// Export model
export default BookEmb;
