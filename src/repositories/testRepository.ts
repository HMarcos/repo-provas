import { Test } from "@prisma/client";
import prismaClient from "../config/database.js";

export type TestCreationData = Omit<Test, "id">;
export type RequestTestData = Omit<TestCreationData, "teacherDisciplineId"> & {
    disciplineId: number;
    teacherId: number;
};

async function findByName(name: string) {
    const test = await prismaClient.test.findFirst({
        where: { name }
    });

    return test;
};

async function findAllTests() {
    const tests = await prismaClient.test.findMany();
    return tests;
};

async function insertTest(test: TestCreationData) {
    await prismaClient.test.create({
        data: test
    });
};

const testRepository = {
    findByName,
    findAllTests,
    insertTest
};

export default testRepository;