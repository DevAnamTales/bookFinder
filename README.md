# API documentation

## Project Setup:
- Clone project and Install all the dependencies
Clone the repository, in the terminal run the following command

```js
npm install
```
- Generate test data
  To create a test data run a generateTestData script with following command
  
```js
node generateTestData.js
```

```
You will be prompt with a question:
Enter the amount of test data (number): 50
If you enter 50 in above example, it will create 50 users, authers and books in the mongoDB with reference.
```
- Run the server
  
  Run the server with following command
```js
node server.js
```

- Test the API call in browser or importing postman collections. You might be need to change the data in the request in order to see the response since the test data I am using in my postman resides on my local computer. Use your test data that you have created in API calls.
- 
## Overview:

A book finder API designed for user convenience. Users can easily search for books based on various parameters like title, author, genre, publication date. You can also fetch the books based on the ratings given by the different users.

## Authentication: 

The user need to be authorised with API key to interact with API when adding, updating or deleting the content in the database. For all the GET requests user do not need api key.Add following information in header before sending the PUT, POST and DELETE requests.

## Headers:

- Key : api-key
- value : "jhjastA545889askKlL-Key"

## Endpoint Structure:

The base URL for BOOK Finder API is http://localhost:3000.

- `/books`: Retrive information about books.
-`/authors`: Get details about book author.
-`/users`: Provide information about users who rates the book.

## Request Parameters:

 ### `api/books`
- `booksId`: The name of the book.
- `authorId` : Author id.
- `genre`: It contains which type of book category
- `pageSize`: Result per page
  
### `api/books/user/`
- ´userId´: Find all books rated by a specific user

### `api/users`:
- `userId`: Get user by its ID.

### `api/authors`:
- `authorId`: Get author by its ID.


## Request Examples:

### Get book

```js
GET/api/books?title=Newyork

 In this exemple the title is set to Newyork. So we can get response with specific title which we have given. Note that we dont need api-key for get requests.´´´
```

 ## Post book

```js
POST/api/books

In this exemple we gonna create a new book using POST method and for this method we need api-key and we need to set everything in Body.For this request we will get response with status code "201 Created".
```
### Put book

```js
PUT/api/books/Hemligt

In this exemple we are going to update user ratings for an existing book named "Hemligt". So we hit this endpoint which is given above. For this request we need api-key and we need to set new desired ratings in Body. We will get response "200 Ok" with our updated user ratings.
```
### DELETE book

```js
DELETE/api/books?title=Newyork

In this exemple we are deleting a book by giving specific book name i.e "Newyork". We will get following response:
{
    "message": "Book deleted successfully"
}
with status code "200 Ok".
```
## Structure of API response:
Here is the simple API response structure:
```json
   {
            "_id": "66278f38333707d8be65dcd8",
            "title": "fugit solum adipiscor",
            "author": "66278f36333707d8be65dc11",
            "genre": "Reggae",
            "publicationDate": "2023-05-14T13:39:28.291Z",
            "ratings": [
                {
                    "user": "66278f38333707d8be65dc97",
                    "rating": 4,
                    "_id": "66278f38333707d8be65dcd9"
                }
            ],
            "__v": 0
        },
```
The response from the´/books´ endpoint will contain an array of book objects with the above given structure.















