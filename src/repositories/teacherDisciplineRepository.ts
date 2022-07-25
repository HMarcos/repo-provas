import prismaClient from "../config/database.js";

async function findByDisciplineIdAndTeacherId(disciplineId: number, teacherId: number) {
    const teacherDiscipline = await prismaClient.teacherDiscipline.findFirst({
        where: {
            disciplineId,
            teacherId
        }
    });

    return teacherDiscipline;
}

const teacherDisciplineRepository = {
    findByDisciplineIdAndTeacherId
};

export default teacherDisciplineRepository;