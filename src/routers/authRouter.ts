import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import signUpSchema from "../schemas/signUpSchema.js";

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(signUpSchema), signUp);

export default authRouter;