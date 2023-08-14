import express, { Express, Request, Response } from "express";

import bcrypt from "bcrypt";
import User from "../../models/User";
import { ObjectId } from "mongoose";

type User = {
  _id: ObjectId;
  email: string;
  password: string;
  role: string;
  enabled: boolean;
  createdAt: number;
};

export default async function register(req: Request, res: Response) {
  let user: User = (await User.findOne({ email: req.body.email })) as User;

  if (user)
    return res.status(500).json({
      success: false,
      message: "User with this email already exists!",
    });

  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    await new User({
      email: req.body.email,
      password: hash,
      role: "user",
      enabled: true,
      createdAt: Date.now(),
    }).save();
  });

  res.status(201).json({
    success: true,
  });
}
