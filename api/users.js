import User from "../model/Users.js";

export default function users(server, mongoose) {

  /*
    Skapar en GET - route på '/api/users'. 
    När denna route anropas, hämtar den alla dokument från vår "users"-collection och skickar tillbaka dem som en JSON-response.
  */
  server.get('/api/users', async (request, response) => {
    try {
      response.status(200).json(await User.find());  // Använder Mongoose's "find"-metod för att hämta alla "users".
    } catch (error) {
      response.status(500).json({ message: "Something went wrong", error: error })
    }
  });

  server.get('/api/users/:id', async (request, response) => {
    try {
      const userId = request.params.id;

      // Check if the userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({ message: "Bad Request: Invalid user ID" });
      }

      const user = await User.findById(userId);

      // Check if the user is not found
      if (!user) {
        return response.status(404).json({ message: "Not Found: User not found" });
      }

      response.status(200).json({ message: "User retrieved successfully", user: user });
    } catch (error) {
      response.status(500).json({ message: "Something went wrong", error: error });
    }
  });


  server.post('/api/users', async (request, response) => {
    try {
      const firstname = request.body.firstname
      const lastname = request.body.lastname

      console.log("Creating a user : " + firstname + lastname)
     

      if (firstname.length <= 0 || lastname.length <=0) {
        response.status(400).json({ message: "Body must contain firstname, lastname with minimum 1 char" })
      }

      const newUser = new User({
        firstname: firstname,
        lastname: lastname
      })
      const savedUser = await newUser.save()

      response.status(201).json({ message: "You are trying to create a user!", newUser: newUser, savedUser: savedUser })
    } catch (error) {
      response.status(500).json({ message: "Something went wrong", error: error })
    }
  });

  server.put("/api/users/:id", async (request, response) => {
    try {
      const updateUser = await User.findByIdAndUpdate(request.params.id, request.body, { new: true })

      response.json({ updatedUser: updateUser })

    } catch (error) {
      response.status(500).json({ message: "something went wrong", error: error })
    }
  })

  server.delete("/api/users/:id", async (request, response) => {
    try {
      const deletedUser = await User.findByIdAndDelete(request.params.id)

      response.json({ deletedUser: deletedUser })

    } catch (error) {
      response.status(500).json({ message: "something went wrong", error: error })
    }
  })

}