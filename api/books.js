import Books from "../model/Books.js";
import rateLimit from "express-rate-limit"


const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['api-key'];

  // Check if API key is provided
  if (!apiKey) {
    return res.status(401).json({ error: "Unauthorized: API key is missing" });
  }

  // Check if API key is valid (You can replace this logic with your actual API key validation)
  if (apiKey !== 'jhjastA545889askKlL-Key') {
    return res.status(403).json({ error: "Forbidden: Invalid API key" });
  }

  // Proceed to next middleware if API key is valid
  next();
};

// Apply rate limiting middleware for /api/books endpoint
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Max requests per minute
  message: 'Too many requests, please try again later.'
});

export default function books(server, mongoose) {
  
  //Get book with title, genre or author id
  
  server.get('/api/books', limiter, async (req, res) => {
    try {
      // Extract query parameters from the request and decode them
      const { title, genre, author, page, pageSize } = req.query;
      console.log("Query Parameters:", req.query);

      const decodedTitle = title ? decodeURIComponent(title) : null;
      const decodedGenre = genre ? decodeURIComponent(genre) : null;
      const decodedAuthor = author ? decodeURIComponent(author) : null;

      // Parse page and pageSize parameters to integers
      const pageNumber = parseInt(page) || 1;
      const size = parseInt(pageSize) || 10;

      // Calculate skip value based on page number and page size
      const skip = (pageNumber - 1) * size;

      // Construct the query object based on the decoded parameters
      const query = {};

      if (decodedTitle) {
        query.title = decodedTitle;
      }

      if (decodedGenre) {
        query.genre = decodedGenre;
      }

      if (decodedAuthor) {
        // Check if the provided author ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(decodedAuthor)) {
          // If the author ID is invalid, return a 400 response with a custom error message
          return res.status(400).json({ error: "Invalid author ID: Please enter a valid ObjectId for the author." });
        }
        query.author = decodedAuthor;
      }
      console.log("Constructed Query:", query);

      // Search for books in the database using the constructed query with pagination
      const books = await Books.find(query).skip(skip).limit(size);

      // If no books are found, return a 404 response
      if (!books.length) {
        return res.status(404).json({ error: "No books found" });
      }

      // If books are found, return them in the response along with pagination metadata
      const totalCount = await Books.countDocuments(query);
      const totalPages = Math.ceil(totalCount / size);

      // Construct response object with paginated data and metadata
      const response = {
        data: books,
        metadata: {
          totalCount,
          totalPages,
          currentPage: pageNumber,
          pageSize: size
        }
      };

      res.json(response);
    } catch (error) {
      // If an error occurs during the process, return a 500 response
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  // Create a New Book
  server.post('/api/books', verifyApiKey, async (req, res) => {
    try {
      // Extract the author object from the request body
      const { author, ...bookData } = req.body;

      // Log the extracted book data
      console.log('Extracted Book Data:', bookData);

      // Create a new instance of the Books model with the extracted book data
      const book = new Books({
        ...bookData,
        author: author // Assign the author _id directly
      });

      // Log the book object before saving
      console.log('Book Object Before Saving:', book);
      await book.validate(); // Validate the book data

      // Save the book to the database
      await book.save();

      // Log the saved book object
      console.log('Saved Book Object:', book);

      // Construct the response body with the necessary information
      const responseBody = {
        title: book.title,
        genre: book.genre,
        publicationDate: book.publicationDate,
        author: book.author // You can include author information in the response if needed
        // Add other fields if needed
      };

      // Send the response back to the client with status 201 (Created) and the constructed response body
      res.status(201).json(responseBody);
    } catch (err) {
      // If an error occurs during the process, send an error response with the error message
      res.status(400).json({ message: err.message });
    }
  });

  // PUT method to update a book by title
  server.put('/api/books/:title', async (req, res) => {
    const title = req.params.title;
    const updateData = req.body;

    try {
      // Validate the update data (optional, based on your application's requirements)
      if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'Bad Request: Update data is required' });
      }

      // Find the book by title and update it with the new data
      const updatedBook = await Books.findOneAndUpdate({ title: title }, updateData, { new: true });

      if (!updatedBook) {
        // If the book with the given title is not found, return a 404 error
        return res.status(404).json({ error: 'Book not found' });
      }

      // If the book is successfully updated, return the updated book
      return res.json(updatedBook);
    } catch (error) {
      // If an error occurs, return a 500 error
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  //Delete a book
  server.delete('/api/books', verifyApiKey, async (req, res) => {
    try {
      // Extract the book title from the query parameters
      const title = req.query.title;

      // Check if the title parameter is missing or empty
      if (!title || title.trim() === '') {
        return res.status(400).json({ error: "Bad Request: Book title is required in the query parameters" });
      }

      // Search for the book in the database using the provided title
      const book = await Books.findOne({ title });

      // If the book is not found, return a 404 response
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      // Log the book deletion
      console.log(`Deleting book with title: ${title}`);

      // Delete the book from the database
      await Books.deleteOne({ title });

      // Return a success message in the response
      res.json({ message: "Book deleted successfully" });
    } catch (error) {
      // Log any errors that occur during the process
      console.error("Error deleting book:", error);

      // Return a 500 response with an error message
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  //Find a specific book rated by a specific user

  server.get('/api/books/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log("User ID:", userId);

      // Find books where the ratings array contains a rating by the specified user
      const books = await Books.find({ 'ratings.user': userId });
      console.log("Books:", books);

      if (!books || books.length === 0) {
        return res.status(404).json({ error: "No books rated by this user found" });
      }

      res.json(books);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });







  
}