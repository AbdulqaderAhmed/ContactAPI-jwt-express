import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    phone: {
      type: String,
      match: [
        /(\+*\(?\d[25]1\)?\s*(\d{2}[\s-]*)(\d{4,7}[\s-]*))/,
        "Invalid phone number",
      ],
      required: [true, "Phone number is required!"],
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.model("Contact", contactSchema);
