import StudentModel, {StudentModelInterface} from "../../models/studentModel";
import StudentRepository from "../../repository/studentRepository";
import {Service, ServiceInput, ServiceOutput} from "../service";

interface UpdateStudentInput extends ServiceInput {
    studentCPF: string;
    studentData: Partial<StudentModelInterface>;

}

interface UpdateStudentOutput extends ServiceOutput {
    student: StudentModelInterface | null;
}

export class UpdateStudent implements Service {
    private static instance: UpdateStudent;
    private repository: StudentRepository;

    private constructor() {
        this.repository = StudentRepository.getInstance();
    }

    public static getInstance(): UpdateStudent {
        if (!UpdateStudent.instance) {
            UpdateStudent.instance = new UpdateStudent();
        }
        return UpdateStudent.instance;
    }

    public async execute({ studentCPF, studentData }: UpdateStudentInput): Promise<UpdateStudentOutput> {
        const studentFromDB = await this.repository.getStudentByCPF(studentCPF);

        if (!studentFromDB) {
            return {
                student: null,
            };
        }

        const studentToUpdate = new StudentModel(
            studentData.name || studentFromDB.name,
            studentData.email || studentFromDB.email,
            studentData.password || studentFromDB.password,
            studentData.phone || studentFromDB.phone,
            studentData.cpf || studentFromDB.cpf,
            studentData.studentRegistration || studentFromDB.studentRegistration,
            studentData.bankName || studentFromDB.bankName,
            studentData.bankAccount || studentFromDB.bankAccount,
            studentData.bankAgency || studentFromDB.bankAgency,
            studentData.researchGrant || studentFromDB.researchGrant,
        ); 

        const updatedStudent = await this.repository.updateStudent(studentToUpdate);

        return {
            student: updatedStudent,
        };
    }
}
