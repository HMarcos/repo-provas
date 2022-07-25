import prismaClient from "../config/database.js";

async function findById(categoryId: number) {
    const category = await prismaClient.category.findUnique({
        where: {id: categoryId}
    });

    return category;
};

async function findAllCategories() {
    const categories = await prismaClient.category.findMany();
    return categories;
}

const categoryRepository = {
    findById,
    findAllCategories
};

export default categoryRepository;