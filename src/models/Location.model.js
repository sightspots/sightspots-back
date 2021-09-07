import mongoose from 'mongoose';

const { Schema } = mongoose;

const locationSchema = new Schema(
  {
    title: { type: String, required: true },
    //TODO hacer enum
    tags: [{ type: String }],
    description: { type: String, required: true },
    pictures: [{ type: String }],
    audio: { type: String },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment"}],
    visitingHours: { type: String },
    rating: { type: Number, min: 0},
  },
  { timestamps: true }
);

const Location = mongoose.model("Location", locationSchema); 

export default Location;
