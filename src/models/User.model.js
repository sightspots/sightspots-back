import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    role: { type: String, default: "user" },
    name: { type: String, required: true },
    surname: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://res.cloudinary.com/sightspots/image/upload/v1631092402/default-avatar_fldrkw.jpg" },
    favs: [{ type: mongoose.Types.ObjectId, ref: "Location" }],
    locationLists: [{ type: mongoose.Types.ObjectId, ref: "LocationList" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
