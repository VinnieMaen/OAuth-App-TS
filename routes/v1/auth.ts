import express, { Express, Request, Response } from "express";

import { register, login } from "../../controllers/v1/";
import registerValidator from "../../middleware/v1/registerValidator";
import loginValidator from "../../middleware/v1/loginValidator";

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

export default router;
