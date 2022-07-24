import { NextFunction, Request, Response } from "express";
import sessionService from "../services/sessionService.js";
import userService from "../services/userService.js";
import AppError from "../utils/appError.js";
import logging from "../utils/logging.js";

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) {
        throwInvalidTokenError();
    };

    const sessionId = sessionService.getSessionIdByToken(token);
    const session = await sessionService.getById(sessionId);
    if (!session) {
        throwInvalidTokenError();
    };

    const user = await userService.getById(session.userId);
    if (!user) {
        throwInvalidTokenError();
    };

    res.locals.user = user;
    console.log(logging.debug('Token is valid'));
    next();
};

function throwInvalidTokenError() {
    throw new AppError(401, "Invalid Token!");
};