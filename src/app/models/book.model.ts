import { model, Schema } from "mongoose";
import { Genre, IBook, IBookModel } from "../interface/book.interface";

const bookSchema = new Schema<IBook, IBookModel>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      required: true,
      enum: Object.values(Genre),
      uppercase: true,
      validate: {
        validator: function (v: string) {
          return Object.values(Genre).includes(v as Genre);
        },
        message: (props) => `${props.value} is not a valid genre!`,
      },
    },
    isbn: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

bookSchema.statics.updateAvailability = async function (
  bookId: string
): Promise<IBook> {
  const book = await this.findById(bookId);
  if (!book) throw new Error("Book not found");

  if (book.copies <= 0) {
    book.available = false;
    await book.save();
  }
  return book;
};

const Book = model<IBook, IBookModel>("Book", bookSchema);
export default Book;
