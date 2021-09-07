import Schema from "mongoose/Schema";
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    role: { type: String, default: "user" },
    name: { type: String, required: true },
    surname: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    favs: [{ type: mongoose.types.ObjectId, ref: "Location" }],
    location: [{ type: mongoose.types.ObjectId, ref: "Location" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
