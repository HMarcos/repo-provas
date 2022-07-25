import { Request, Response } from "express";
import categoryService from "../services/categoryService.js";
import logging from "../utils/logging.js";

export async function getCategories(req: Request, res: Response) {
    const categories = await categoryService.findAllCategories();
    console.log(logging.info('Categories retrieved successfully.'));
    res.status(200).send(categories);
};