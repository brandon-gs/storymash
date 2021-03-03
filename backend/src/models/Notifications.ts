import { Schema, model } from "mongoose"

const NotificationSchema = new Schema(
  {
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    transmitter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    view: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

export default model("Notification", NotificationSchema)
