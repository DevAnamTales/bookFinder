import users from "./api/users.js";
import books from "./api/books.js";

export default function (server, mongoose) {

  users(server, mongoose)
  books(server, mongoose)
}