import Schema from "mongoose/Schema";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    role: { type: String, default: "user" },
    name: { type: String, default: "user" },
    surname: { type: String, default: "user_surname" },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    favs: [{ type: String }],
    location: [{ type: mongoose.types.ObjectId, ref: "Location" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
