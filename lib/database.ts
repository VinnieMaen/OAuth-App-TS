import mongoose, { ConnectOptions } from "mongoose";

export async function connect() {
  const DB_URL: string = process.env.MONGODB_URI!;
  await mongoose
    .connect(DB_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then((res) => {
      console.log("Connected to Database - Initial Connection");
    })
    .catch((err) => {
      console.log(`Initial Database connection error occured -`, err);
    });
}
