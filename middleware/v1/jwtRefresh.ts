import express, { Request, Response } from "express";

import jwt from "jsonwebtoken";
import fs from "fs";
import User from "../../models/User";

export default async function (req: Request, res: Response, next: Function) {
  const cert = fs.readFileSync("public.pem");

  try {
    if (!req.cookies.refresh_token)
      return res
        .status(403)
        .json({ success: false, message: "Invalid Refresh Token!" });

    console.log(req.cookies);
    const refreshToken = req.cookies.refresh_token.split("Bearer ")[1];
    const accessToken = req.cookies.authorization.split("Bearer ")[1];

    jwt.verify(refreshToken, cert, async function (err: any, decoded: any) {
      if (decoded.accessToken !== accessToken)
        return res
          .status(403)
          .json({ success: false, message: "Invalid Refresh Token!" });

      let user = await User.findById(decoded.sub);
      if (!user)
        return res.status(404).json({
          success: false,
          message: "User not found!",
        });

      if (decoded.exp < Date.now()) {
        return res.status(403).json({
          success: false,
          message: "Session Expired!",
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
