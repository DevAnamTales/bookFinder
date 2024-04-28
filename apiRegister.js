import users from "./api/users.js";
import books from "./api/books.js";
import authors from "./api/authors.js";
export default function (server, mongoose) {
  users(server, mongoose)
  books(server, mongoose)
  authors(server, mongoose)
}