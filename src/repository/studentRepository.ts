import { PrismaClient } from "@prisma/client";
import StudentModel, { StudentModelInterface } from "../models/studentModel";

class StudentRepository {
    private client: PrismaClient;
    private static instance: StudentRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static getInstance(): StudentRepository {
        if (!StudentRepository.instance) {
            StudentRepository.instance = new StudentRepository();
        }
        return StudentRepository.instance;
    }

    async getAllStudents(): Promise<StudentModelInterface[]> {
        const students = await this.client.student.findMany();
        return students;
    }

    async getStudentByCPF(cpf: string): Promise<StudentModelInterface | null> {
        const student = await this.client.student.findUnique({
            where: {
                cpf,
            },
        });

        return student;
    }

    async createStudent(student: StudentModel): Promise<StudentModelInterface> {
        const newStudent = await this.client.student.create({
            data: {
                cpf: student.getCpf(),
                name: student.getName(),
                email: student.getEmail(),
                password: student.getPassword(),
                phone: student.getPhone(),
                studentRegistration: student.getStudentRegistration(),
                bankName: student.getBankName(),
                bankAccount: student.getBankAccount(),
                bankAgency: student.getBankAgency(),
                researchGrant: student.getResearchGrant(),
            },
        });

        return newStudent;
    }

    async updateStudent(student: StudentModel): Promise<StudentModelInterface> {
        const updatedStudent = await this.client.student.update({
            where: {
                cpf: student.getCpf(),
            },
            data: {
                name: student.getName(),
                email: student.getEmail(),
                password: student.getPassword(),
                phone: student.getPhone(),
                studentRegistration: student.getStudentRegistration(),
                bankName: student.getBankName(),
                bankAccount: student.getBankAccount(),
                bankAgency: student.getBankAgency(),
                researchGrant: student.getResearchGrant(),
            },
        });

        return updatedStudent;
    }

    async deleteStudent(cpf: string): Promise<StudentModelInterface> {
        const deletedStudent = await this.client.student.delete({
            where: {
                cpf,
            },
        });

        return deletedStudent;
    }
}

export default StudentRepository;
