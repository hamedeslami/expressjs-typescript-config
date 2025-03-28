import { body } from "express-validator"

export const RoleValidator = () => [
    body('name').notEmpty().isString().isLength({max: 100}),
    body("description").optional().isString().isLength({ max: 500 }),
];

export const PermissionValidator = () => [
    body('name').notEmpty().isString().isLength({max: 100}),
    body("description").optional().isString().isLength({ max: 500 }),
];

