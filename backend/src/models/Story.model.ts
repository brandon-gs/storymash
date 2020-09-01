import { Schema, model, Document } from "mongoose"

export interface IStory extends Document {
  author: string
  title: string
  image: string
  category: Array<string>
  views: Array<string>
  parts: Array<string>
  createdAt: Date 
  updatedAt: Date
}

const StorySchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    category: { type: Array, required: true },
    image: { type: String, default: "" },
    views: [{ type: Schema.Types.ObjectId, default: [] }],
    parts: [{ type: Schema.Types.ObjectId, default: [], ref: "StoryPart" }],
  },
  {
    timestamps: true,
  }
)

export default model<IStory>("Story", StorySchema)
