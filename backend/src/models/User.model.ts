import { Schema, model, Document } from "mongoose"
import bcrypt from "bcryptjs"

export type ObjectUser = {
  type: string
  level: number
  points: number
  likes: number
  comments: number
  stories: Array<string>
  favorites: Array<string>
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
  favorites: Array<string>
  type: string
  likes: number
  comments: number
  level: number
  notifications: Array<string>
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
    favorites: [{ type: Schema.Types.ObjectId, ref: "Story", default: [] }],
    type: { type: String, default: "Redactor Becario" },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    points: { type: Number, default: 0 },
    notifications: [
      { type: Schema.Types.ObjectId, ref: "Notification", default: [] },
    ],
  },
  {
    timestamps: true,
  }
)

UserSchema.pre<IUser>("save", async function (next) {
  const user = this
  // Change image based in his gender
  if (user.gender === "Hombre") {
    user.image = "default_male_profile.png"
  } else if (user.gender === "Mujer") {
    user.image = "default_female_profile.png"
  } else {
    user.image = "default_profile.png"
  }
  if (!user.isModified("password")) return next()
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt)
  user.password = hash
  next()
})

UserSchema.methods.matchPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getPublicData = function (): ObjectUser {
  const user: ObjectUser = {
    type: this.type,
    level: this.level,
    points: this.points,
    likes: this.likes,
    comments: this.comments,
    stories: this.stories,
    favorites: this.favorites,
    followers: this.followers,
    following: this.following,
    firstName: this.firsName,
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
