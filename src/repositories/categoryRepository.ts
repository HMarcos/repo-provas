import prismaClient from "../config/database.js";

async function findById(categoryId: number) {
    const category = await prismaClient.category.findUnique({
        where: {id: categoryId}
    });

    return category;
}

const categoryRepository = {
    findById
};

export default categoryRepository;