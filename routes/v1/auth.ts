import express, { Express, Request, Response } from "express";

import { register, login, refresh } from "../../controllers/v1/";
import registerValidator from "../../middleware/v1/registerValidator";
import loginValidator from "../../middleware/v1/loginValidator";
import jwtRefresh from "../../middleware/v1/jwtRefresh";

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/refresh", jwtRefresh, refresh);

export default router;
