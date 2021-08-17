import { Schema, model, Document } from "mongoose"
import bcrypt from "bcryptjs"

export type ObjectUser = {
  _id: string
  type: string
  level: number
  points: number
  likes: number
  comments: number
  stories: Array<string>
  favorites: Array<{ story: string; storyPart: string }>
  followers: Array<string>
  following: Array<string>
  firstName: string
  lastName: string
  username: string
  email: string
  age: number
  gender: string
  about: string
  image: string
  createdAt: Date
  updatedAt: Date
  getPublicData: () => ObjectUser
}

export interface IUser extends Document {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  gender: string
  age: number
  points: number
  image: string
  about: string
  followers: Array<string>
  following: Array<string>
  stories: Array<string>
  favorites: Array<{ story: string; storyPart: string }>
  type: string
  likes: number
  comments: number
  level: number
  notifications: Array<string>
  createdAt: Date
  updatedAt: Date
  matchPassword: (password: string) => Promise<boolean>
  getPublicData: () => ObjectUser
}

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
    favorites: [
      {
        story: { type: Schema.Types.ObjectId, ref: "Story" },
        storyPart: { type: Schema.Types.ObjectId, ref: "StoryPart" },
      },
    ],
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

UserSchema.methods.getPublicData = function (this: IUser): ObjectUser {
  const user: ObjectUser = {
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

export default model<IUser>("User", UserSchema)
