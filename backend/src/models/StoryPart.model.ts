import { Schema, model, Document } from "mongoose"

export interface IStoryPart extends Document {
  story: string
  author: string
  comments: Array<string>
  likes: Array<string>
  content: string
  createdAt: Date
  updatedAt: Date
}

const StoryPartSchema = new Schema(
  {
    story: { type: Schema.Types.ObjectId, required: true },
    author: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, default: [], ref: "Comment" }],
    likes: [{ type: Schema.Types.ObjectId, default: [], ref: "User" }],
  },
  {
    timestamps: true,
  }
)

export default model<IStoryPart>("StoryPart", StoryPartSchema)
