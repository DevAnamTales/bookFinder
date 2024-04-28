import Author from "../model/Authors.js";

export default function author(server, mongoose) {
  
  server.get('/api/authors', async (request, response) => {
    try {
      response.status(200).json(await Author.find());  
    } catch (error) {
      response.status(500).json({ message: "Something went wrong", error: error })
    }
  });

  server.get('/api/authors/:id', async (request, response) => {
    try {
      const authorId = request.params.id;

      // Check if the authorId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(authorId)) {
        return response.status(400).json({ message: "Bad Request: Invalid author ID" });
      }

      const author = await Author.findById(authorId);

      // Check if the author is not found
      if (!author) {
        return response.status(404).json({ message: "Not Found: Author not found" });
      }

      response.status(200).json({ message: "Author retrieved successfully", author: author });
    } catch (error) {
      response.status(500).json({ message: "Something went wrong", error: error });
    }
  });

  server.post('/api/authors', async (request, response) => {
    try {
      const firstname = request.body.firstname
      const lastname = request.body.lastname

      console.log("Creating a author : " + firstname + lastname)
     

      if (firstname.length <= 0 || lastname.length <=0) {
        response.status(400).json({ message: "Body must contain firstname, lastname with minimum 1 char" })
      }

      const newUser = new Author({
        firstname: firstname,
        lastname: lastname
      })
      const savedUser = await newUser.save()

      response.status(201).json({ message: "You are trying to create a author!", newUser: newUser, savedUser: savedUser })
    } catch (error) {
      response.status(500).json({ message: "Something went wrong", error: error })
    }
  });

  server.put("/api/authors/:id", async (request, response) => {
    try {
      const updateUser = await Author.findByIdAndUpdate(request.params.id, request.body, { new: true })

      response.json({ updatedUser: updateUser })

    } catch (error) {
      response.status(500).json({ message: "something went wrong", error: error })
    }
  })

  server.delete("/api/authors/:id", async (request, response) => {
    try {
      const deletedUser = await Author.findByIdAndDelete(request.params.id)

      response.json({ deletedUser: deletedUser })

    } catch (error) {
      response.status(500).json({ message: "something went wrong", error: error })
    }
  })

}