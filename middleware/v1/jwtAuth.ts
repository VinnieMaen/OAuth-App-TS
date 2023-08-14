import express, { Request, Response } from "express";

import jwt from "jsonwebtoken";
import fs from "fs";
import User from "../../models/User";

interface JWTResult {
  id: string;
  expires: number;
}

export default async function (req: Request, res: Response, next: Function) {
  var cert = fs.readFileSync("public.pem");

  try {
    let accessToken = req.cookies.authorization.split("Bearer")[1];
    jwt.verify(accessToken, cert, async function (err: any, decoded: any) {
      let user = await User.findById(decoded.id);

      if (!user)
        return res.status(404).json({
          success: false,
          message: "User not found!",
        });

      if (decoded.expires < Date.now()) {
        return res.status(403).json({
          success: false,
          message: "Session Expired!",
        });
      }

      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
}
