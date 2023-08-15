import express, { Express, Request, Response } from "express";

import generateAccessToken from "../../lib/generateAccesstoken";
import generateRefreshToken from "../../lib/generateRefreshtoken";

export default async function refresh(req: Request, res: Response) {
  const accessToken = await generateAccessToken(res.locals.id);
  const refreshToken = await generateRefreshToken(res.locals.id);

  res.cookie("authorization", "Bearer " + accessToken);
  res.cookie("refresh_token", "Bearer " + refreshToken);

  res.status(200).json({ success: true, message: "" });
}
