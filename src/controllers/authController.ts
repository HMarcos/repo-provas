import { Request, Response } from "express";
import { SignUpData, UserCreationData } from "../repositories/userRepository.js";
import authService from "../services/authService.js";
import logging from "../utils/logging.js";

export async function signUp(req: Request, res: Response) {
    const userData = req.body as SignUpData;
    const user: UserCreationData = {
        email: userData.email,
        password: userData.password
    };

    await authService.signUp(user);

    console.log(logging.info('User registered successfully'));
    res.sendStatus(201);
};