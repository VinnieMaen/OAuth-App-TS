import express, { Express, Request, Response } from "express";

import auth from "./auth";
import jwtAuth from "../../middleware/v1/jwtAuth";

const router = express.Router();

router.use("/auth", auth);
router.get("/test", jwtAuth, (req: Request, res: Response) => {
  res.send("OK");
});

export default router;
