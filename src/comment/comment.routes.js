import { Router } from "express"
import { addComment, getUserComments, deleteComment, updateComment } from "../comment/comment.controller.js"
import { addCommentValidator , getCommentValidator, deleteCommentValidator, updateCommentValidator} from "../middlewares/comment-validator.js"

const router = Router()

/**
 * @swagger
 * /comment/addComment/:
 *   post:
 *     summary: Add a new comment (Requires authentication)
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the comment
 *               publicationId:
 *                 type: string
 *                 description: ID of the publication the comment belongs to
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 */
router.post(
    "/addComment",
    addCommentValidator,
    addComment
);

/**
 * @swagger
 * /comment/getComment/{uid}:
 *   get:
 *     summary: Retrieve comments by user ID (Requires authentication)
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique user ID
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       404:
 *         description: Comments not found
 */
router.get(
    "/getComment/:uid",
    getCommentValidator,
    getUserComments 
);

/**
 * @swagger
 * /comment/deleteComment/{uid}:
 *   patch:
 *     summary: Soft delete a comment (Requires authentication)
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       404:
 *         description: Comment not found
 */
router.patch(
    "/deleteComment/:uid",
    deleteCommentValidator,
    deleteComment
);

/**
 * @swagger
 * /comment/updateComment/{uid}:
 *   patch:
 *     summary: Update an existing comment (Requires authentication)
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: New comment content
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       404:
 *         description: Comment not found
 */
router.patch(
    "/updateComment/:uid",
    updateCommentValidator,
    updateComment
);


export default router