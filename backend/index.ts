/* eslint-disable no-console */
import "dotenv/config"
import app from "./app"
import next from "next"

const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dir: "./frontend", dev, customServer: true })
const handler = nextApp.getRequestHandler()

import "./database"
import "./src/services/passport"
import "./src/lib/global"

;(async () => {
  try {
    await nextApp.prepare()
    app.get("*", (req, res) => {
      return handler(req, res)
    })
    app.listen(app.get("port"))
    console.log(`>> Server on port ${app.get("port")}`)
  } catch (error) {
    console.log(">> Error to start the server")
    console.log(error)
  }
})()

export default nextApp
