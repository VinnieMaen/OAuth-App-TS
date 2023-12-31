import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { connect } from "./lib/database";
import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      customData: string;
      id: ObjectId;
    }
  }
}
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 600,
  standardHeaders: false,
  legacyHeaders: false,
});

app.use(cookieParser());
app.use(express.json());

connect(); // DB connect

app.use("/api/", limiter, routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
