import teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";
import AppError from "../utils/appError.js";

async function findTeacherDisciplineOrFail(disciplineId: number, teacherId: number) {
    const teacherDiscipline = await teacherDisciplineRepository.findByDisciplineIdAndTeacherId(disciplineId, teacherId);
    if (!teacherDiscipline){
        throw new AppError(404, "The combination between discipline and teacher was not found");
    };

    return teacherDiscipline;
}

const teacherDisciplineService = {
    findTeacherDisciplineOrFail
};

export default teacherDisciplineService;