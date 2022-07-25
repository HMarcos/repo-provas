import { Router } from "express";
import { getTests, setTest } from "../controllers/testController.js";
import { validateToken } from "../middlewares/sessionMiddleware.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import testSchema from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.post("/tests", validateToken, validateSchema(testSchema), setTest);
testRouter.get("/tests", validateToken, getTests);

export default testRouter;