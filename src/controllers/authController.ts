import { Request, Response } from "express";
import { LoginData, SignUpData, UserCreationData } from "../repositories/userRepository.js";
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

export async function signIn(req: Request, res: Response) {
    const login: LoginData = req.body;
    const token: string = await authService.signIn(login);

    console.log(logging.info('User logged successfully'));
    res.status(200).send({ token });
};