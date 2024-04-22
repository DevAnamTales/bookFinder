import Books from "../model/Books.js";

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

export default function books(server, mongoose) {

  //server.use('/api/books', verifyApiKey);

  server.get('/api/books', async (req, res) => {
    try {
      // Parse query parameters for pagination
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided

      // Calculate skip and limit values for MongoDB query
      const skip = (page - 1) * pageSize;
      const limit = pageSize;

      // Fetch paginated data from the database
      const books = await Books.find().skip(skip).limit(limit);

      // Count total number of documents in the collection (for pagination metadata)
      const totalCount = await Books.countDocuments();

      // Calculate total number of pages
      const totalPages = Math.ceil(totalCount / pageSize);

      // Construct response object with paginated data and metadata
      const response = {
        data: books,
        metadata: {
          totalCount,
          totalPages,
          currentPage: page,
          pageSize
        }
      };

      // Send the response back to the client
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// Get book by title
  server.get('/api/books/title/:bookTitle', async (req, res) => {
    try {
      // Get the book title parameter from the request
      const encodedTitle = req.params.bookTitle;

      // Decode the encoded title using decodeURIComponent
      const decodedTitle = decodeURIComponent(encodedTitle);

      console.log("Encoded Title:", encodedTitle);
      console.log("Decoded Title:", decodedTitle);

      // Check if the decoded title is empty or whitespace
      if (!decodedTitle || decodedTitle.trim() === '') {
        return res.status(400).json({ error: "Bad Request: Book title is required" });
      }

      // Search for the book in the database using the decoded title
      const book = await Books.findOne({ title: decodedTitle });

      console.log("Found Book:", book);

      // If the book is not found, return a 404 response
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      // If the book is found, return it in the response
      res.json(book);
    } catch (error) {
      // If an error occurs during the process, return a 500 response
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  // Create a New Book
  server.post('/books', verifyApiKey, async (req, res) => {
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







  
}