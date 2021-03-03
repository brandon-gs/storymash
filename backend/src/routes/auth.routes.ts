/*
  @url: /api/auth
*/

import { Router } from "express"
const router = Router()
import {
  loginController,
  registerController,
  verifyUsername,
  verifyEmail,
} from "../controllers/auth.controller"
import { requireLogin } from "../middlewares/authentication"

router.route("/register").post(registerController)
router.route("/login").post(requireLogin, loginController)
router.post("/verify/username", verifyUsername)
router.post("/verify/email", verifyEmail)

module.exports = router
