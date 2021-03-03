/*
  @url: /api/comment
*/

import { Router } from "express"
import { addComment } from "../controllers/comment.controller"
import { requireAuth } from "../middlewares/authentication"

const router = Router()

router.post("/part/:id", requireAuth, addComment)

module.exports = router
