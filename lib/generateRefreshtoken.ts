import jwt from "jsonwebtoken";
import fs from "fs";
import { ObjectId } from "mongoose";

export default async function generateToken(id: ObjectId) {
  const cert = fs.readFileSync("public.pem");
  const expiry = Date.now() + 2 * 24 * 60 * 60 * 1000; // Two day expiry

  const tokenContent = {
    sub: id,
    exp: expiry,
    iat: Date.now(),
    token_type: "refresh",
  };

  const token = jwt.sign(tokenContent, cert, {
    algorithm: "RS256",
  });

  return token;
}
