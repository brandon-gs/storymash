import express from "express"
const app = express()

// SETTINGS
app.set("port", process.env.PORT || 3000)

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.use("/api/auth", require("./src/routes/auth.routes"))
app.use("/api/user", require("./src/routes/user.routes"))

export default app
