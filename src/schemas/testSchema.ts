import joi from "joi";
import { RequestTestData } from "../repositories/testRepository.js";

const testSchema = joi.object<RequestTestData>({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    categoryId: joi.number().integer().required(),
    disciplineId: joi.number().integer().required(),
    teacherId: joi.number().integer().required()
});

export default testSchema;