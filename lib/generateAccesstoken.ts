import jwt from "jsonwebtoken";
import fs from "fs";
import { ObjectId } from "mongoose";

export default async function generateToken(id: ObjectId) {
  const cert = fs.readFileSync("public.pem");
  const expiry = Date.now() + 5 * 60 * 1000;

  const tokenContent = {
    sub: id,
    exp: expiry,
    iat: Date.now(),
    aud: "api",
    scope: "read write",
    token_type: "access",
  };

  const token = jwt.sign(tokenContent, cert, {
    algorithm: "RS256",
  });

  return token;
}
