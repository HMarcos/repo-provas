import categoryRepository from "../repositories/categoryRepository.js";
import AppError from "../utils/appError.js";

async function findCategoryOrFail(categoryId: number) {
    const category = await categoryRepository.findById(categoryId);
    if (!category){
        throw new AppError(404, "Category not found");
    }
}

const categoryService = {
    findCategoryOrFail
};

export default categoryService;