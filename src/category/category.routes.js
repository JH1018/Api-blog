import { Router } from "express";
import { getCategory ,registerCategory ,deleteCategory , updateCategory} from "./category.controller.js";
import { registerBrandValidator , deleteCategoryValidator, updateCategoryValidator} from "../middlewares/category-validators.js";

const router = Router();

/**
 * @swagger
 * /category/registerCategory/:
 *   post:
 *     summary: Register a new category (Admin only)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer Token required for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *     responses:
 *       201:
 *         description: Category registered successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       403:
 *         description: Forbidden (Admin only)
 */
router.post(
    "/registerCategory/",
    registerBrandValidator,
    registerCategory
);

/**
 * @swagger
 * /category/deleteCategory/{uid}:
 *   patch:
 *     summary: Soft delete a category (Admin only)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer Token required for authentication
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Category not found
 */
router.patch(
    "/deleteCategory/:uid",
    deleteCategoryValidator,
    deleteCategory
);

/**
 * @swagger
 * /category/updateCategory/{uid}:
 *   patch:
 *     summary: Update an existing category (Admin only)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer Token required for authentication
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New category name
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Category not found
 */
router.patch(
    "/updateCategory/:uid",
    updateCategoryValidator,
    updateCategory
);

router.get(
    "/getCategory",
    getCategory
)

export default router;