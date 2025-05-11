import { body , param} from "express-validator";
import { validationsFields } from "./fields-validator.js";
import { catchErrors } from "./catch-errors.js";
import { uidExist , uidPublicationExist} from "../helpers/db-validators.js";

export const registerPublicationValidator = [
    body("title").not().isEmpty().withMessage("El título es requerido"),
    body("category").not().isEmpty().withMessage("La categoría es requerida").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("publicationContent").not().isEmpty().withMessage("Content is Required"),
    body("owner").isMongoId().withMessage("Invalid Id").custom(uidExist),
    validationsFields,
    catchErrors
];

export const getPublicationByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(uidPublicationExist),
    validationsFields,
    catchErrors
];

export const deletePublicationsValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB").custom(uidPublicationExist),
    validationsFields,
    catchErrors
];

export const updatePublicationsValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB").custom(uidPublicationExist),
    validationsFields,
    catchErrors
];
