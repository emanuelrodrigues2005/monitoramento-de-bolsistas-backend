import StudentModel, { StudentModelInterface } from "../../models/studentModel";
import StudentRepository from "../../repository/studentRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetStudentByCPFInput extends ServiceInput {
    studentCPF: string;
}

interface GetStudentByCPFOutput extends ServiceOutput {
    student: StudentModelInterface | null;
}

export class GetStudentByCPF implements Service {
    private static instance: GetStudentByCPF;
    private repository: StudentRepository;

    private constructor() {
        this.repository = StudentRepository.getInstance();
    }

    public static getInstance(): GetStudentByCPF {
        if (!GetStudentByCPF.instance) {
            GetStudentByCPF.instance = new GetStudentByCPF();
        }
        return GetStudentByCPF.instance;
    }

    public async execute({ studentCPF }: GetStudentByCPFInput): Promise<GetStudentByCPFOutput> {
        const studentFromDB = await this.repository.getStudentByCPF(studentCPF);

        if (!studentFromDB) {
            return {
                student: null
            };
        }

        const studentObject = {
            cpf: studentFromDB.cpf,
            name: studentFromDB.name,
            email: studentFromDB.email,
            password: studentFromDB.password,
            phone: studentFromDB.phone,
            studentRegistration: studentFromDB.studentRegistration,
            bankName: studentFromDB.bankName,
            bankAccount: studentFromDB.bankAccount,
            bankAgency: studentFromDB.bankAgency,
            researchGrant: studentFromDB.researchGrant,
        }

        return {
            student: studentObject,
        };
    }
}
