import { Schema, model, Document } from "mongoose"
import { getRandomNumber } from "../lib/random"
import { IStoryPart } from "./StoryPart.model"
import mongoosePagination from "mongoose-paginate-v2"

export interface IStory extends Document {
  author: string
  title: string
  image: string
  totalLikes: number
  totalComments: number
  views: Array<string>
  category: Array<string>
  parts: Array<IStoryPart | string>
  lastPartCreatedAt: Date
  createdAt: Date
  updatedAt: Date
  populateAuthor: () => Promise<VoidFunction>
  populateParts: () => Promise<VoidFunction>
}

const StorySchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    category: { type: Array, required: true },
    image: { type: String, default: "" },
    totalLikes: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    lastPartCreatedAt: { type: Date, default: new Date() },
    views: [{ type: Schema.Types.ObjectId, default: [] }],
    parts: [
      {
        type: Schema.Types.ObjectId,
        ref: "StoryPart",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
)

StorySchema.pre<IStory>("save", async function (next) {
  const random = getRandomNumber(1, 20)
  if (!this.image) {
    this.image = `/img/default/default_story_${random}.jpg`
  }
  next()
})

StorySchema.methods.populateAuthor = async function () {
  await this.populate("author", { username: 1, image: 1 }).execPopulate()
}

StorySchema.methods.populateParts = async function () {
  await this.populate({
    path: "parts",
    populate: {
      path: "comments",
      populate: { path: "author", select: { username: 1, image: 1 } },
    },
  }).execPopulate()
}

StorySchema.plugin(mongoosePagination)

export default model<IStory>("Story", StorySchema)
