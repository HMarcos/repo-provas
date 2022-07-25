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
    const tests = await prismaClient.test.findMany({
        select: {
            id: true,
            name: true,
            pdfUrl: true,
            category: true,
            teacherDiscipline: {
                select: {
                    id: true,
                    teacher: true,
                    discipline: {
                        select: {
                            id: true,
                            name: true,
                            term: true
                        }
                    }
                }
            }
        }
    }
    );
    return tests;
};

async function insertTest(test: TestCreationData) {
    await prismaClient.test.create({
        data: test
    });
};

async function findGroupbyDisciplines() {
    const tests = await prismaClient.term.findMany({
        include: {
            disciplines: {
                select: {
                    id: true,
                    name: true,
                    term: true,
                    teacherDisciplines: {
                        select: {
                            id: true,
                            teacher: true,
                            discipline: {
                                select: {
                                    id: true,
                                    name: true,
                                    term: true
                                }
                            },
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    category: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return tests;
}

const testRepository = {
    findByName,
    findAllTests,
    findGroupbyDisciplines,
    insertTest
};

export default testRepository;