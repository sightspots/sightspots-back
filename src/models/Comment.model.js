import Schema from "mongoose/Schema";
import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    comment: { type: String, required: true},
    author: { type: mongoose.types.ObjectId, ref: "User"  },
    location: { type: mongoose.types.ObjectId, ref: "Location" },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
