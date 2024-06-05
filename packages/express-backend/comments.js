import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
  },

  { collection: "comment_list" },
);

const Comment = mongoose.model("Comment", userSchema);
export default Comment;
