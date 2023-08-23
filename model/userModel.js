import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: "String",
      required: [true, "Username required!"],
      unique: [true, "Username already exists!"],
    },
    email: {
      type: "String",
      required: [true, "Email required!"],
      unique: [true, "Email already exists!"],
    },
    password: {
      type: "string",
      required: [true, "Password required!"],
    },
    token: {
      type: "String",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
