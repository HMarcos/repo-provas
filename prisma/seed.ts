import prismaClient from "../src/config/database.js";
import logging from "../src/utils/logging.js";

async function main() {
    await insertTerms();
    await insertCategories();
    await insertTeachers();
    await insertDisciplines();
    await insertTeachersDisciplines();
}

main().catch(e => {
    console.log(logging.error(e));
    process.exit(1);
}).finally(async () => {
    await prismaClient.$disconnect();
});

async function insertTerms() {
    const terms = [];
    for (let i = 1; i <= 6; i++) {
        terms.push({ number: i });
    }
    await prismaClient.term.createMany({
        data: terms,
        skipDuplicates: true,
    });
};

async function insertCategories() {
    const categories = [{ name: "Projeto" }, { name: "Prática" }, { name: "Recuperação" }];
    await prismaClient.category.createMany({
        data: categories,
        skipDuplicates: true,
    });
};

async function insertTeachers() {
    const teachers = [{ name: "Diego Pinho" }, { name: "Bruna Hamori" }];
    await prismaClient.teacher.createMany({
        data: teachers,
        skipDuplicates: true
    });
};

async function insertDisciplines() {
    const disciplines = [
        { name: "HTML e CSS", termId: 1 },
        { name: "JavaScript", termId: 2 },
        { name: "React", termId: 3 },
        { name: "Humildade", termId: 1 },
        { name: "Planejamento", termId: 2 },
        { name: "Autoconfiança", termId: 3 },
    ];

    await prismaClient.discipline.createMany({
        data: disciplines,
        skipDuplicates: true
    });
};

async function insertTeachersDisciplines() {
    const teachersDisciplines = [
        {teacherId: 1, disciplineId: 1},
        {teacherId: 1, disciplineId: 2},
        {teacherId: 1, disciplineId: 3},
        {teacherId: 2, disciplineId: 4},
        {teacherId: 2, disciplineId: 5},
        {teacherId: 2, disciplineId: 6},
    ];

    await prismaClient.teacherDiscipline.createMany({
        data: teachersDisciplines,
        skipDuplicates: true,
    });
};





