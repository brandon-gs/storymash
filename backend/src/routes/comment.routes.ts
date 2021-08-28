/*
  @url: /api/comment
*/

import { Router } from "express"
import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller"
import { requireAuth } from "../middlewares/authentication"

const router = Router()

router.route("/part/:id").get(getComments).post(requireAuth, addComment)

router.route("/:id").put(requireAuth, updateComment).delete(requireAuth, deleteComment)

module.exports = router
