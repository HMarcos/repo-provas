import { Test } from "@prisma/client";
import prismaClient from "../config/database.js";

export type TestCreationData = Omit<Test, "id">;
export type RequestTestData = Omit<TestCreationData, "teacherDisciplineId"> & {
    disciplineId: number;
    teacherId: number;
};

async function insertTest(test: TestCreationData) {
    await prismaClient.test.create({
        data: test
    });
}

const testRepository = {
    insertTest
};

export default testRepository;