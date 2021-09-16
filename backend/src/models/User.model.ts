import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"
import { getLevel } from "../helpers/levels.helpers"
import { IUser, PublicDataUser } from "./types/User.types"

// Schema
const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    image: { type: String, default: "" },
    about: { type: String, default: "" },
    followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    stories: [{ type: Schema.Types.ObjectId, ref: "Story", default: [] }],
    favorites: [{ type: Schema.Types.ObjectId, ref: "Story", default: [] }],
    type: { type: String, default: "Redactor Becario" },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    points: { type: Number, default: 0 },
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification", default: [] }],
  },
  {
    timestamps: true,
  }
)

// Methods
UserSchema.pre<IUser>("save", async function (next) {
  // Change image based in his gender
  if (!this.image) {
    const defaultImageRoute = "/img/default"
    if (this.gender === "Hombre") {
      this.image = `${defaultImageRoute}/default_male_profile.png`
    } else if (this.gender === "Mujer") {
      this.image = `${defaultImageRoute}/default_female_profile.png`
    } else {
      this.image = `${defaultImageRoute}/default_profile.png`
    }
  }
  if (!this.isModified("password")) return next()
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(this.password, salt)
  this.password = hash
  next()
})

UserSchema.methods.matchPassword = async function (
  this: IUser,
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getPublicData = function (this: IUser): PublicDataUser {
  const user: PublicDataUser = {
    _id: this._id,
    type: this.type,
    level: this.level,
    points: this.points,
    likes: this.likes,
    comments: this.comments,
    stories: this.stories,
    favorites: this.favorites,
    followers: this.followers,
    following: this.following,
    firstName: this.firstName,
    lastName: this.lastName,
    username: this.username,
    email: this.email,
    age: this.age,
    gender: this.gender,
    about: this.about,
    image: this.image,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    getPublicData: this.getPublicData,
  }
  return user
}

UserSchema.pre<IUser>("updateOne", function () {
  this.set({ level: getLevel(this.points) })
})

export default model<IUser>("User", UserSchema)
