import { Schema, model, Document } from "mongoose"

export interface IComment extends Document {
  author: Array<string>
  content: string
  likes: Array<string>
  createdAt: Date
  updatedAt: Date
}

const CommentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  {
    timestamps: true,
  }
)
export default model<IComment>("Comment", CommentSchema)
