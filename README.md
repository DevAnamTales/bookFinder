API documentation

## Overview:

A book finder API designed for user convenience. Users can easily search for books based on various parameters like title, author, genre, publication date and along this gives information about book and it's ratings.

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
- `authorId` : Writer name of that book.
- `genre`: It contains which type of book is this.


### api/users:
- `userId`: Get user by its ID.

### api/authors:
- `authorId`: Get author by its ID.


## Request Example 1:

### Get book

```http
GET/api/books?title=Newyork

 In this exemple the title is set to Newyork. So we can get response with specific title which we have given. Note that we dont need api-key for get requests.´´´
```

 ## Post book

```http
POST/api/books

In this exemple we gonna create a new book using POST method and for this method we need api-key and we need to set everything in Body.For this request we will get response with status code "201 Created".
```
### Put book

```http
PUT/api/books/Hemligt

In this exemple we are going to update user ratings for an existing book named "Hemligt". So we hit this endpoint which is given above. For this request we need api-key and we need to set new desired ratings in Body. We will get response "200 Ok" with our updated user ratings.
```
### DELETE book

```http
DELETE/api/books?title=Newyork

In this exemple we are deleting a book by giving specific book name i.e "Newyork". We will get following response:
{
    "message": "Book deleted successfully"
}
with status code "200 Ok".
```
## Structure of API response:
Here is the simple API response structure:
```http

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















