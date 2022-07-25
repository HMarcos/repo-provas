import { Router } from "express";
import { getCategories } from "../controllers/categoryController.js";
import { validateToken } from "../middlewares/sessionMiddleware.js";

const categoryRouter = Router();

categoryRouter.get("/categories", validateToken, getCategories);

export default categoryRouter;