import { Schema, model, Document } from "mongoose"
import { getRandomNumber } from "../lib/random"

export interface IStory extends Document {
  author: string
  title: string
  image: string
  category: Array<string>
  views: Array<string>
  parts: Array<string>
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
  const story = this
  const random = getRandomNumber(1, 20)
  if (!story.image) {
    story.image = `/img/default/default_story_${random}.jpg`
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

export default model<IStory>("Story", StorySchema)
