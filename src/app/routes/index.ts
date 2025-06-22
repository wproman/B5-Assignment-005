import { Router } from "express";
import bookRoutes from "./book.routes";
import borrowRoutes from "./borrow.routes";
const routes = Router();

routes.use("/books", bookRoutes);
routes.use("/borrow", borrowRoutes);

export default routes;
