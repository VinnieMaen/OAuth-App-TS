import express, { Express, Request, Response } from "express";

import bcrypt from "bcrypt";
import { ObjectId } from "mongoose";

import User from "../../models/User";

import generateAccessToken from "../../lib/generateAccesstoken";
import generateRefreshToken from "../../lib/generateRefreshtoken";

type User = {
  _id: ObjectId;
  email: string;
  password: string;
  role: string;
  enabled: boolean;
  createdAt: number;
};

export default async function login(req: Request, res: Response) {
  let user: User = (await User.findOne({ email: req.body.email })) as User;

  if (!user)
    return res.status(403).json({
      success: true,
      message: "Invalid credentials!",
    });

  bcrypt.compare(
    req.body.password,
    user?.password,
    async function (err, result) {
      if (!result)
        return res.status(403).json({
          success: true,
          message: "Invalid credentials!",
        });

      let accessToken = await generateAccessToken(user?._id);
      let refreshToken = await generateRefreshToken(user?._id, accessToken);

      res.cookie("authorization", "Bearer " + accessToken);
      res.cookie("refresh_token", "Bearer " + refreshToken);

      res.status(200).json({ success: true, message: "" });
    }
  );
}
