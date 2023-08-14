import express, { Express, Request, Response } from "express";

export default function validate(req: Request, res: Response, next: Function) {
  let errors = [];

  if (!req.body.email) errors.push("No email provided!");

  if (!req.body.email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"))
    errors.push("Invalid email!");

  if (!req.body.password)
    errors.push("Password has to be longer then 0 characters");

  if (errors.length > 0) {
    return res.status(500).json({
      success: false,
      message: errors,
    });
  }
  next();
}
