import { Schema, model, Document } from "mongoose"

export interface IStoryPart extends Document {
  comments: Array<string>
  likes: Array<string>
  content: string
  createdAt: Date
  updatedAt: Date
}

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
export default model<IStoryPart>("StoryPart", StoryPartSchema)
