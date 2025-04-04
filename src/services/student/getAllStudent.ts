import StudentModel, { StudentModelInterface } from "../../models/studentModel";
import StudentRepository from "../../repository/studentRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllStudentInput extends ServiceInput {}

interface GetAllStudentOutput extends ServiceOutput {
    students: StudentModelInterface[];
}

export class GetAllStudent implements Service {
    private static instance: GetAllStudent;
    private repository: StudentRepository;

    private constructor() {
        this.repository = StudentRepository.getInstance();
    }

    public static getInstance(): GetAllStudent {
        if (!GetAllStudent.instance) {
            GetAllStudent.instance = new GetAllStudent();
        }
        return GetAllStudent.instance;
    }

    public async execute(): Promise<GetAllStudentOutput> {
        const students = await this.repository.getAllStudents();
        const studentObjects = students.map((student) => ({
            cpf: student.cpf,
            name: student.name,
            email: student.email,
            password: student.password,
            phone: student.phone,
            studentRegistration: student.studentRegistration,
            bankName: student.bankName,
            bankAgency: student.bankAgency,
            bankAccount: student.bankAccount,
            researchGrant: student.researchGrant
        }));

        return {
            students: studentObjects,
        };
    }
}
