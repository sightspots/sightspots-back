import mongoose from 'mongoose';

const { Schema } = mongoose;

const locationListSchema = new Schema(
  {
    title: { type: String, required: true },
    locations: [{ type: mongoose.Types.ObjectId, ref: "Location" }],
    user: { type: mongoose.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const LocationList = mongoose.model("LocationList", locationListSchema);

export default LocationList;
