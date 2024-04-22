import express from "express"
import mongoose from "mongoose"
import apiRegister from "./apiRegister.js"

const server = express()

const port = 3000

server.use(express.json())

mongoose.connect("mongodb+srv://anamRehman:Ana43210@cluster0.4eza73e.mongodb.net/bookFinder")

apiRegister(server, mongoose)

server.listen(port, () => console.log(`Listening on port http://localhost:${port}`))