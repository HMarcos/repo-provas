import testRepository, { RequestTestData, TestCreationData } from "../repositories/testRepository.js";
import categoryService from "./categoryService.js";
import teacherDisciplineService from "./teacherDisciplineService.js";

async function createTest(requestTestData: RequestTestData) {
    await categoryService.findCategoryOrFail(requestTestData.categoryId);
    const teacherDiscipline = await teacherDisciplineService.findTeacherDisciplineOrFail(requestTestData.disciplineId, requestTestData.teacherId);

    const testCreationData: TestCreationData = {
        name: requestTestData.name,
        pdfUrl: requestTestData.pdfUrl,
        categoryId: requestTestData.categoryId,
        teacherDisciplineId: teacherDiscipline.id
    };

    await testRepository.insertTest(testCreationData);
};

async function findAllTests() {
    const tests = await testRepository.findAllTests();
    return tests;
};

async function findTestsGroupByDisciplines() {
    const tests = await testRepository.findGroupbyDisciplines();
    return tests;
}

const testService = {
    createTest,
    findAllTests,
    findTestsGroupByDisciplines
};

export default testService;