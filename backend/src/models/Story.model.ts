import mongoosePagination from "mongoose-paginate-v2"
import { Schema, model, Document, PaginateModel } from "mongoose"
import { getRandomNumber } from "../lib/random"
import { IStory } from "./types/Story.types"

const StorySchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    image: { type: String, default: "" },
    category: { type: Array, required: true },
    lastPartCreatedAt: { type: Date, default: new Date() },
    views: [{ type: Schema.Types.ObjectId, default: [] }],
    totalLikes: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    totalRankPoints: { type: Number, default: 0 },
    totalParts: { type: Number, default: 0 },
    parts: [
      {
        type: Schema.Types.Mixed,
        ref: "IStoryPart",
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
    this.image = `https://res.cloudinary.com/dsyibmoda/image/upload/v1632104315/default/default_story_${random}.jpg`
  }
  next()
})

StorySchema.methods.populateAuthor = async function () {
  await this.populate({
    path: "author",
    select: { username: 1, image: 1 },
  }).execPopulate()
}

StorySchema.plugin(mongoosePagination)

interface IStoryModel<T extends Document> extends PaginateModel<T> {}

export default model<IStory>("Story", StorySchema) as IStoryModel<IStory>
