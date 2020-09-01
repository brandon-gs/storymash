import { Schema, model } from "mongoose"
const CommentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    part: { type: Schema.Types.ObjectId, ref: "StoryPart", required: true },
    content: { type: String, required: true },
    likes: { type: Schema.Types.ObjectId, ref: "User", default: [] },
  },
  {
    timestamps: true,
  }
)
export default model("Comment", CommentSchema)
