import { StudentModelInterface } from "../../models/studentModel";
import StudentRepository from "../../repository/studentRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface DeleteStudentInput extends ServiceInput {
    studentCPF: string;
}

interface DeleteStudentOutput extends ServiceOutput {
    message: string;
}

export class DeleteStudent implements Service {
    private static instance: DeleteStudent;
    private repository: StudentRepository;

    private constructor() {
        this.repository = StudentRepository.getInstance();
    }

    public static getInstance(): DeleteStudent {
        if (!DeleteStudent.instance) {
            DeleteStudent.instance = new DeleteStudent();
        }
        return DeleteStudent.instance;
    }

    async execute({ studentCPF }: DeleteStudentInput): Promise<DeleteStudentOutput> {
        const deletedStudent = await this.repository.deleteStudent(studentCPF);
        return {message: "Estudante deletado com sucesso"};
    }
}
