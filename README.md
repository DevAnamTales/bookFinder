API documentation

## Overview:

A book finder API designed for user convenience. Users can easily search for books based on various parameters like title, author, genre, publication date and along this gives information about book and it's ratings.

## Authentication: 
The user need to be authorised with API key to interact with API when adding, updating or deleting the content in the database. For all the GET requests user do not need api key.Add following information in header before sending the PUT, POST and DELETE requests.

## Headers                
#Key : api-key
#value : "jhjastA545889askKlL-Key"

## Endpoint Structure:

The base URL for BOOK Finder API is http://localhost:3000
-/api/books
-/api/users
-/authors

## Request Parameters:
## api/books:
Title: The name of the book.
Authorid: Writer name of that book.
Genre: It contains which type of book is this.



## api/users:
userid

## api/authors:
authorid

## Structure of API response:
Here is the simple API response structure:
[
    {
        "_id": "6623f502d9131701a18e3a9f",
        "title": "peccatus",
        "author": "6623f502d9131701a18e3a9b",
        "genre": "Hip Hop",
        "publicationDate": "2024-03-12T19:21:38.781Z",
        "__v": 0
    }
]
The response from the´/books´ endpoint will contain an array of book objects with the above given structure.

## Request Examples:








