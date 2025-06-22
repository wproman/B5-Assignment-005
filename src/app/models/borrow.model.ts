import mongoose, { Model, Schema, Types } from "mongoose";
import { IBook } from "../interface/book.interface";
import Book from "./book.model";

export interface IBorrow {
  book: Types.ObjectId | IBook;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const borrowSchema: Schema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

borrowSchema.pre<IBorrow>("save", async function (next) {
  const book = await Book.findById(this.book);
  if (!book) throw new Error("Book not found");

  if (book.copies < this.quantity) {
    throw new Error("Not enough copies available");
  }

  book.copies -= this.quantity;
  await book.save();
  await Book.updateAvailability(book.id);
  next();
});

const Borrow: Model<IBorrow> = mongoose.model<IBorrow>("Borrow", borrowSchema);
export default Borrow;
