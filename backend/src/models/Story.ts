import { Schema, model } from "mongoose"

const StorySchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    category: { type: Array, required: true },
    views: [{ type: Schema.Types.ObjectId, default: [] }],
    image: { type: String, default: "" },
    parts: [{ type: Schema.Types.ObjectId, default: [], ref: "StoryPart" }],
  },
  {
    timestamps: true,
  }
)

export default model("Story", StorySchema)
