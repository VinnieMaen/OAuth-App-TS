import express, { Express, Request, Response } from "express";

import bcrypt from "bcrypt";

import User from "../../models/User";
import generateToken from "../../lib/generateAccesstoken";
import { ObjectId } from "mongoose";

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

      let accessToken = await generateToken(user?._id);
      res.cookie("authorization", "Bearer " + accessToken);

      res.status(200).json({ success: true, message: "" });
    }
  );
}
