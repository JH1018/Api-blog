import { Router } from "express"
import { getUserById, getUsers, updatePassword, updateUser, } from "./user.controller.js"
import { getUserByIdValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/user-validators.js"

const router = Router()

/**
 * @swagger
 * /user/findUser/{uid}:
 *   get:
 *     summary: Retrieve a user by ID (Admin only)
 *     tags: [User]
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
 *         description: User found successfully
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       403:
 *         description: Forbidden (Only admins can access)
 *       404:
 *         description: User not found
 */
router.get(
    "/findUser/:uid",
    getUserByIdValidator,
    getUserById
);

/**
 * @swagger
 * /user/findUser:
 *   get:
 *     summary: Retrieve all users (Admin only)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       403:
 *         description: Forbidden (Only admins can access)
 */
router.get(
    "/findUser/",
    getUsers
);

/**
 * @swagger
 * /user/updatePassword/{uid}:
 *   patch:
 *     summary: Update a user's password (Requires authentication)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 description: Current password
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       403:
 *         description: Forbidden (Incorrect old password)
 */
router.patch("/updatePassword/:uid", 
    updatePasswordValidator, 
    updatePassword
);

/**
 * @swagger
 * /user/updateUser/{uid}:
 *   put:
 *     summary: Update user details (Requires authentication)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: New email
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 */
router.put("/updateUser/:uid", 
    updateUserValidator, 
    updateUser
);


export default router