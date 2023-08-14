import express, { Express, Request, Response } from "express";

import jwt from "jsonwebtoken";
import fs from "fs";
import { ObjectId } from "mongoose";

export default async function generateToken(id: ObjectId) {
  const cert = fs.readFileSync("public.pem");
  const expiry = 10 * 60 * 1000;

  const token = jwt.sign({ id: id, expiry: expiry }, cert, {
    algorithm: "RS256",
  });

  return token;
}
