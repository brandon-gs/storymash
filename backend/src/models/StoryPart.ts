import { Schema, model } from "mongoose"
const StoryPartSchema = new Schema(
  {
    comments: [{ type: Schema.Types.ObjectId, default: [], ref: "Comment" }],
    likes: [{ type: Schema.Types.ObjectId, default: [], ref: "User" }],
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
export default model("StoryPart", StoryPartSchema)
