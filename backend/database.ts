/* eslint-disable no-console */
import mongoose from "mongoose"
const customUri = "mongodb://localhost/storymash"
mongoose
  .connect(process.env.MONGODB_URI || customUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(">> DB is connected"))
  .catch(error => console.log(error))
