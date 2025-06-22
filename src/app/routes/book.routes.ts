import express from "express";
import { bookController } from "../controller/book.controller";

const bookRoutes = express.Router();

bookRoutes.post("/", bookController.createBook);
bookRoutes.get("/", bookController.getAllBooks);
bookRoutes.get("/:bookId", bookController.getBookById);
bookRoutes.put("/:bookId", bookController.updateBook);
bookRoutes.delete("/:bookId", bookController.deleteBook);

export default bookRoutes;
