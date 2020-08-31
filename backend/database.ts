import mongoose from "mongoose"

mongoose
  .connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(">> DB is connected"))
  .catch(error => console.log(error))
