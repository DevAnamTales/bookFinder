import mongoose from "mongoose";
import { faker } from '@faker-js/faker';
import Books from './model/Books.js'
import Author from './model/Authors.js'
import BookEmb from './model/BookEmbeded.js'
import User from './model/Users.js'


// Function to generate random date within a range
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Function to generate test data
const generateTestData = async () => {
  try {
    // Connect to MongoDB
    mongoose.connect("mongodb+srv://anamRehman:Ana43210@cluster0.4eza73e.mongodb.net/bookFinder")

    // Clear existing data
    //await Promise.all([Author.deleteMany(), User.deleteMany(), Books.deleteMany(), BookEmb.deleteMany()]);

    // Generate Authors
    const authors = [];
    for (let i = 0; i < 50; i++) {
      const author = new Author({
        firstname: faker.internet.userName(),
        lastname: faker.internet.userName()      });
      await author.save();
      authors.push(author);
      console.log(`New Author - ${author.firstname} - has been created.`)
    }

    //Create users

    const users = [];
    for (let i = 0; i < 50; i++) {
      const user = new User({
        firstname: faker.internet.userName(),
        lastname: faker.internet.userName()

      });
      await user.save();
      users.push(user);
      console.log(`New user - ${user.firstname} - has been created.`)
    }

    // Generate Books with Reference
    const books = [];
    for (let i = 0; i < 50; i++) {
      const book = new Books({
        title: faker.lorem.words(),
        author: authors[Math.floor(Math.random() * authors.length)],
        genre: faker.music.genre(),
        publicationDate: faker.date.past(),
      });
      await book.save();
      books.push(book);
      console.log(`New book - ${book.title} - has been created.`)
    }

    // Generate Books with Embedding
    const booksEmb = [];
    for (let i = 0; i < 50; i++) {
      const book = new BookEmb({
        title: faker.lorem.words(),
        author: {
          _id: authors[Math.floor(Math.random() * authors.length)]._id,
          name: faker.internet.userName()
        },
        genre: faker.music.genre(),
        publicationDate: faker.date.past(),
        ratings: [{
          _id: users[Math.floor(Math.random() * users.length)]._id,
          rating: faker.number.int({ min: 1, max: 5 })
        }]
      });
      await book.save();
      booksEmb.push(book);
    }

    console.log('Test data generated successfully.');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error generating test data:', err);
  }
};

// Generate test data
generateTestData();
