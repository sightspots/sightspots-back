import Schema from "mongoose/Schema";
import mongoose from "mongoose";

const locationListSchema = new Schema(
  {
    title: { type: String, required: true },
    locations: [{ type: mongoose.Types.ObjectId, ref: "Location" }],
  },
  { timestamps: true }
);

const LocationList = mongoose.model("LocationList", locationListSchema);

export default LocationList;
