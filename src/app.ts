import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./app/routes";

const app: Application = express();




app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://minimal-library.vercel.app"],
  })
);
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "Borrow route" });
});

app.use((req: Request, res: Response, Next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    error: "Route not found",
  });
});


app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", error);
  res.status(400).json({
    success: false,
    message: "Internal Server Error",
    error: error?.message || "Something went wrong",
  });
});

export default app;
