import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "staff"],
      default: "user",
      required: true,
    },
    createdAt: {
      type: Number,
      require: true,
    },
    enabled: {
      type: Boolean,
      require: true,
    },
  },
  { collection: "Users", minimize: false }
);

const User = mongoose.model("Users", userSchema);
export default User;
