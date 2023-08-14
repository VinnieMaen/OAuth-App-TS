import express, { Request, Response } from "express";

import jwt from "jsonwebtoken";
import fs from "fs";
import User from "../../models/User";

interface JWTResult {
  id: string;
  expires: number;
}

export default async function (req: Request, res: Response, next: Function) {
  const cert = fs.readFileSync("public.pem");

  try {
    if (!req.cookies.refresh_token)
      return res
        .status(403)
        .json({ success: false, message: "Invalid Refresh Token!" });

    let refreshToken = req.cookies.refresh_token.split("Bearer ")[1];

    jwt.verify(refreshToken, cert, async function (err: any, decoded: any) {
      let user = await User.findById(decoded.sub);

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User not found!",
        });

      if (decoded.exp < Date.now()) {
        return res.status(403).json({
          success: false,
          message: "Refresh Token Expired!",
        });
      }

      res.locals.id = decoded.sub;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
}
