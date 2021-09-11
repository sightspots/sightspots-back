import mongoose from 'mongoose';

const { Schema } = mongoose;

const locationSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String , enum: ['naturaleza', 'construcción civil', 'construcción religiosa', 'galería de arte', 'jardín botánico', 'zoológico', 'monumento'] },
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
