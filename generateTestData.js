import mongoose from "mongoose";
import { faker } from '@faker-js/faker';
import Books from './model/Books.js'
import Author from './model/Authors.js'
import User from './model/Users.js'
import prompt from 'prompt-sync';

// Function to generate test data
const generateTestData = async (dataset) => {
  try {
    // Check if dataset is a valid number
    if (isNaN(dataset) || dataset <= 0) {
      throw new Error('Please enter a valid number for the dataset.');
    }
    // Connect to MongoDB
    mongoose.connect("mongodb+srv://anamRehman:Ana43210@cluster0.4eza73e.mongodb.net/bookFinder")

    // Clear existing data
    //await Promise.all([Author.deleteMany(), User.deleteMany(), Books.deleteMany()]);

    // Generate Authors
    const authors = [];
    for (let i = 0; i < dataset; i++) {
      const author = new Author({
        firstname: faker.internet.userName(),
        lastname: faker.internet.userName()      });
      await author.save();
      authors.push(author);
      console.log(`New Author - ${author.firstname} - has been created.`)
    }

    //Create users

    const users = [];
    for (let i = 0; i < dataset; i++) {
      const user = new User({
        firstname: faker.internet.userName(),
        lastname: faker.internet.userName()

      });
      await user.save();
      users.push(user);
      console.log(`New user - ${user.firstname} - has been created.`)
    }

    // Generate Books with Reference to Authors and Users
    const books = [];
    for (let i = 0; i < dataset; i++) {
      const author = authors[Math.floor(Math.random() * authors.length)];
      const user = users[Math.floor(Math.random() * users.length)];

      const book = new Books({
        title: faker.lorem.words(),
        author: author._id, // Reference to an author
        genre: faker.music.genre(),
        publicationDate: faker.date.past(),
        ratings: [
          {
            user: user._id, // Reference to a user
            rating: faker.number.int({ min: 1, max: 5 })
          }
        ]
      });
      await book.save();
      books.push(book);
      console.log(`New book - ${book.title} - has been created.`);
    }
    console.log('Test data generated successfully.');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error generating test data:', err);
  }
};
// Create prompt function
const promptSync = prompt();

// Ask user for dataset size
const userInput = promptSync("Enter the amount of test data (number): ");
const dataset = parseInt(userInput);
// Generate test data
generateTestData(dataset);
