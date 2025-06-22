import { Request, Response } from "express";
import { z } from "zod";
import { Genre, IBook } from "../interface/book.interface";
import Book from "../models/book.model";

// Zod
const CreateBookZodSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  author: z.string({ required_error: "Author is required" }),
  genre: z.enum([...Object.values(Genre)] as [string, ...string[]], {
    required_error: "Genre is required",
  }),
  isbn: z.string({ required_error: "ISBN is required" }),
  description: z.string().optional(),
  copies: z.number({ required_error: "Copies is required" }),
  available: z.boolean().optional(),
});

// Create
const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = await CreateBookZodSchema.parseAsync(req.body);
    const book: IBook = await Book.create(payload);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
};

//  Get All
const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filter, sort, sortBy, limit } = req.query;
    const query: any = {};

    if (filter && Object.values(Genre).includes(filter as Genre)) {
      query.genre = filter;
    }

    const sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy as string] = sort === "desc" ? -1 : 1;
    }

    const books = await Book.find(query)
      .sort(sortOptions)
      .limit(parseInt(limit as string) || 10);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve books",
      success: false,
      error,
    });
  }
};

//  Getby ID
const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      res.status(404).json({
        message: "Book not found",
        success: false,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve book",
      success: false,
      error,
    });
  }
};

// Update
const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      res.status(404).json({
        message: "Book not found",
        success: false,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update book",
      success: false,
      error,
    });
  }
};

// Delete
const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);

    if (!book) {
      res.status(404).json({
        message: "Book not found",
        success: false,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete book",
      success: false,
      error,
    });
  }
};

//  Export
export const bookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
