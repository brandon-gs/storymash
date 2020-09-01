import express from "express"
import multer from "multer"
import path from "path"

const app = express()

// SETTINGS
app.set("port", process.env.PORT || 3000)

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  multer({
    dest: path.join(__dirname, "../frontend/public/img/user"),
  }).single("image")
)

// ROUTES
app.use("/api/auth", require("./src/routes/auth.routes"))
app.use("/api/user", require("./src/routes/user.routes"))

export default app
