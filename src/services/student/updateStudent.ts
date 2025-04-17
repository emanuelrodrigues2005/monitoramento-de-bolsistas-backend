import StudentModel, { StudentModelInterface } from "../../models/studentModel";
import StudentRepository from "../../repository/studentRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface UpdateStudentInput extends ServiceInput {
    student: StudentModelInterface;
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

    public async execute({ student }: UpdateStudentInput): Promise<UpdateStudentOutput> {
        const studentObject = new StudentModel(
            student.cpf,
            student.name,
            student.email,
            student.password,
            student.phone,
            student.studentRegistration,
            student.bankName,
            student.bankAccount,
            student.bankAgency,
            student.researchGrant
        );

        const updatedStudent = await this.repository.updateStudent(studentObject);

        return {
            student: updatedStudent,
        };
    }
}
