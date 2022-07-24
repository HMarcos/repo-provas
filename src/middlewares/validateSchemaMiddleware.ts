import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import AppError from "../utils/appError.js";

export default function validateSchema(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { body } = req;
        const schemaValidation = schema.validate(body, { abortEarly: false });
        if (schemaValidation.error) {
            const validationErros = schemaValidation.error.details.map(detail => detail.message);
            const formattedValidationErros = validationErros.join('\n');
            throw new AppError(422, formattedValidationErros);
        };

        next();
    };
};