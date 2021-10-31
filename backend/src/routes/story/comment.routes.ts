/*
  @url: /api/story/comment
*/

import { Router } from "express"
import { requireAuth } from "../../middlewares/authentication"
import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../../controllers/story/comments.controller"

const router = Router()

router.route("/:storyId/:storyPartIndex").get(getComments).put(requireAuth, addComment)

router
  .route("/:storyId/:storyPartIndex/:commentIndex")
  .put(requireAuth, updateComment)
  .delete(requireAuth, deleteComment)

module.exports = router
