class StudentModel {
    private cpf: string;
    private name: string;
    private email: string;
    private password: string;
    private phone: string;
    private studentRegistration: string;
    private bankName: string;
    private bankAccount: string;
    private bankAgency: string;
    private researchGrant: string;

    constructor(cpf: string, name: string, email: string, password: string, phone: string, studentRegistration: string, bankName: string ,bankAccount: string, bankAgency: string, researchGrant: string) {
        if (!cpf || cpf.trim() === "") {
            throw new Error(StudentErrors.INVALID_CPF);
        }
        this.cpf = cpf;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.studentRegistration = studentRegistration;
        this.bankName = bankName;
        this.bankAccount = bankAccount;
        this.bankAgency = bankAgency;
        this.researchGrant = researchGrant;
    }

    getStudentCpf(): string {
        return this.cpf;
    }

    getStudentName(): string {
        return this.name;
    }

    getStudentEmail(): string {
        return this.email;
    }

    getStudentPassword(): string {
        return this.password;
    }

    getStudentPhone(): string {
        return this.phone;
    }

    getStudentRegistration(): string {
        return this.studentRegistration;
    }

    getStudentBankName(): string {
        return this.bankName;
    }

    getStudentBankAccount(): string {
        return this.bankAccount;
    }
    getStudentBankAgency(): string {
        return this.bankAgency;
    }
    getStudentResearchGrant(): string {
        return this.researchGrant;
    }
}

export default StudentModel;

export interface StudentModelInterface {
    cpf: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    studentRegistration: string;
    bankName: string;
    bankAccount: string;
    bankAgency: string;
    researchGrant: string;
}

export enum StudentErrors {
    INVALID_CPF = "Invalid CPF: CPF cannot be empty or null.",
}
