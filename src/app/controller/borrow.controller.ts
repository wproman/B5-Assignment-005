import { Request, Response } from "express";
import Borrow from "../models/borrow.model";

const borrowBook = async (req: Request, res: Response) => {
  try {
    const borrow = await Borrow.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to borrow book",
      success: false,
      error,
    });
  }
};

const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },

      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },

      {
        $unwind: "$book",
      },

      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get borrowed books summary",
      error,
    });
  }
};

export const borrowController = {
  borrowBook,
  getBorrowedBooksSummary,
};
