import express from "express";
import { borrowController } from "../controller/borrow.controller";

const borrowRoutes = express.Router();

borrowRoutes.post("/", borrowController.borrowBook);
borrowRoutes.get("/", borrowController.getBorrowedBooksSummary);

export default borrowRoutes;
