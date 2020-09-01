/* eslint-disable no-console */
import "dotenv/config"
import app from "./app"
import next from "next"

const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dir: "./frontend", dev })
const handler = nextApp.getRequestHandler()

import "./database"
import "./src/services/passport"
import "./src/lib/global"

async function main() {
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
}

main()
