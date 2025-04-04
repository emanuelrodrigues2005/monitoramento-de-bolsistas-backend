import StudentModel, {StudentModelInterface} from "../../models/studentModel";
import StudentRepository from "../../repository/studentRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface CreateStudentInput extends ServiceInput {
    student: StudentModelInterface;
}

interface CreateStudentOutput extends ServiceOutput {
    student: StudentModelInterface;
}

export class CreateStudent implements Service {
    private static instance: CreateStudent;
    private repository: StudentRepository;

    private constructor() {
        this.repository = StudentRepository.getInstance();
    }

    public static getInstance(): CreateStudent {
        if (!CreateStudent.instance) {
            CreateStudent.instance = new CreateStudent();
        }
        return CreateStudent.instance;
    }

    public async execute(input: ServiceInput): Promise<ServiceOutput> {
        const { student } = input as CreateStudentInput;

        const studentObject = new StudentModel(student.cpf, student.name, student.email, student.password, student.phone, student.studentRegistration,student.bankName, student.bankAccount, student.bankAgency,student.researchGrant);

        const newStudent = await this.repository.createStudent(studentObject);

        return {
            student: newStudent,
        };
    }

}
