import express from "express"
const app = express()

// SETTINGS
app.set("port", process.env.PORT || 3000)

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES

export default app
