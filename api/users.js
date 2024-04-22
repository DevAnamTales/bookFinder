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
      response.status(500).json({ message: "Något gick fel", error: error })
    }
  });

  server.get('/api/users/:id', async (request, response) => {
    try {
      const user = await User.findById(request.params.id)

      response.status(200).json({ message: "Du försöker hämta 1 användare", user: user })
    } catch (error) {
      response.status(500).json({ message: "Något gick fel", error: error })
    }
  })

  server.post('/api/users', async (request, response) => {
    try {
      const username = request.body.username
      const password = request.body.password

      console.log(username + " - username")
      console.log(typeof username + " - username typeof")
      console.log(username.length + " - username length")
      console.log(password + " - password")
      console.log(typeof password + " - password typeof")
      console.log(password.length + " - password length")

      if (username.length <= 0 || password.length <= 0) {
        response.status(400).json({ message: "Body måste innehålla username och password som består av minst 1 karaktär" })
      }

      const newUser = new User({
        username: username,
        password: password
      })
      const savedUser = await newUser.save()

      response.status(201).json({ message: "Du försöker skapa en ny användare!", newUser: newUser, savedUser: savedUser })
    } catch (error) {
      response.status(500).json({ message: "Något gick fel", error: error })
    }
  })

  server.put("/api/users/:id", async (request, response) => {
    try {
      const updateUser = await User.findByIdAndUpdate(request.params.id, request.body)

      response.json({ updatedUser: updateUser })

    } catch (error) {
      response.status(500).json({ message: "Något gick fel", error: error })
    }
  })

  server.delete("/api/users/:id", async (request, response) => {
    try {
      const deletedUser = await User.findByIdAndDelete(request.params.id)

      response.json({ deletedUser: deletedUser })

    } catch (error) {
      response.status(500).json({ message: "Något gick fel", error: error })
    }
  })

}