import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError.js";
import logging from "../utils/logging.js";

export default function handleErros(error: Error, req: Request, res: Response, next: NextFunction) {
    console.log(logging.error(error));

    if (error instanceof AppError) {
        return res.status(error.status).send(error.message);
    };

    return res.status(500).send("Internal Server Error");
};
