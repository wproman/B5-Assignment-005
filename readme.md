#Library Management System
This is a  Library Management System built with Node.js, Express, MongoDB, and TypeScript.

## Features
- Add, update, delete, and list books
- Borrow books and be automatic books copies update
- Automatically update books unavailable when copies is 0
- Input validation using Zod
- Error handling and using middleware

## instalation

git clone https://github.com/wproman/B5-Assignment-05.git
cd B5-Assignment-05
# Install dependencies
npm install
# set up .env 
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.tbbapo1.mongodb.net/Library
NODE_ENV=development
# Start the server
npm run dev

# for production
npm run build 


# API Endpoints 
-- Book Routes
- POST api/books: Add a new book
- GET api/books: Get a list of all books
- GET api/books/bookId Get a book by Id
- PUT /books/:bookId: Update a book
- DELETE /books/:bookId: Delete a book
will support params
?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

-- Borrow Routes
- POST api/borrow: Borrow a book
- GET api/borrow: Get borrowed books summary


# Author
Developed by Roman Ahmed




