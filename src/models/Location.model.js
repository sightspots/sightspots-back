import Schema from "mongoose/Schema";
import mongoose from "mongoose";

const { Schema } = mongoose;

const locationSchema = new Schema(
  {
    title: { type: String, required: true },
    tags: [{ type: String }],
    description: { type: String, required: true },
    pictures: [{ type: String }],
    audio: { type: String },
    comments: [{ type: String }],
    visitingHours: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
);

const Location = mongoose.model("Location", locationSchema); 

export default Location;
