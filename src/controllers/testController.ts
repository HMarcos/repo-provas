import { Request, Response } from "express";
import { RequestTestData } from "../repositories/testRepository.js";
import testService from "../services/testService.js";
import logging from "../utils/logging.js";

export async function setTest(req: Request, res: Response) {
    const requestTestData = req.body as RequestTestData;
    await testService.createTest(requestTestData);

    console.log(logging.info('Test registered successfully.'));
    res.sendStatus(201);
};

export async function getTests(req: Request, res: Response) {
    const groupBy = req.query.groupBy;
    let tests = null;
    if (!groupBy) {
        tests = await testService.findAllTests();
    }
    else if (groupBy === "disciplines") {
        tests = await testService.findTestsGroupByDisciplines();
    }
    else if (groupBy === "teachers") {
        tests = await testService.findTestsGroupByTeachers();
    }

    console.log(logging.info("Tests retrieved successfully."));
    res.status(200).send({ tests });
};