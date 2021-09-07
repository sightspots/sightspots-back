import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    comment: { type: String, required: true},
    author: { type: mongoose.Types.ObjectId, ref: "User"  },
    location: { type: mongoose.Types.ObjectId, ref: "Location" },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
