import jwt from "jsonwebtoken";
import fs from "fs";
import { ObjectId } from "mongoose";
import User from "../models/User";

export default async function generateToken(id: ObjectId, accessToken: String) {
  const cert = fs.readFileSync("public.pem");
  const expiry = Date.now() + 2 * 24 * 60 * 60 * 1000; // Two day expiry

  const tokenContent = {
    sub: id,
    exp: expiry,
    iat: Date.now(),
    accessToken: accessToken,
    token_type: "refresh",
  };

  const token = jwt.sign(tokenContent, cert, {
    algorithm: "RS256",
  });

  // Save refresh token in database + invalidate previous
  await User.findOneAndUpdate({ _id: id }, { $set: { refresh_token: token } });

  return token;
}
