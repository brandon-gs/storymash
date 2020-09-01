/*
  @url: /api/auth
*/

import { Router } from "express"
const router = Router()
import {
  loginController,
  registerController,
} from "../controllers/auth.controller"
import { requireLogin } from "../middlewares/authentication"

router.route("/register").post(registerController)
router.route("/login").post(requireLogin, loginController)

module.exports = router
