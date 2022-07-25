import { RequestTestData } from "../../src/repositories/testRepository.js";

const validTest: RequestTestData = {
    name: "Prova 01",
    pdfUrl: "http://site.com/prova.pf",
    categoryId: 1,
    disciplineId: 1,
    teacherId: 1
};

const testFactory = {
    validTest
};

export default testFactory;