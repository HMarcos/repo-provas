import { Request, Response } from "express";
import { RequestTestData } from "../repositories/testRepository.js";
import testService from "../services/testService.js";
import logging from "../utils/logging.js";

export async function setTest(req: Request, res: Response){
    const requestTestData = req.body as RequestTestData;
    await testService.createTest(requestTestData);

    console.log(logging.info('Test registered successfully.'));
    res.sendStatus(201);
}