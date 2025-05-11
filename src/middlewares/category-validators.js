import { body , param } from "express-validator";
import { validationsFields } from "./fields-validator.js";

export const registerBrandValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("description").not().isEmpty().withMessage("Description is required"),
    validationsFields
];


export const deleteCategoryValidator = [
    param("uid").not().isEmpty().withMessage("The ID is Required").isMongoId().withMessage("The Id isn't valid"),
    validationsFields
];

export const updateCategoryValidator = [
    param("uid").not().isEmpty().withMessage("The ID is Required").isMongoId().withMessage("The Id isn't valid"),
    body("name").optional(),
    body("description").optional(),
    validationsFields
];

