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

    constructor(cpf: string, name: string, email: string, password: string, phone: string, studentRegistration: string, bankName: string, bankAccount: string, bankAgency: string, researchGrant: string) {
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

    public getCpf(): string {
        return this.cpf;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getPhone(): string {
        return this.phone;
    }

    public getStudentRegistration(): string {
        return this.studentRegistration;
    }

    public getBankName(): string {
        return this.bankName;
    }

    public getBankAccount(): string {
        return this.bankAccount;
    }

    public getBankAgency(): string {
        return this.bankAgency;
    }

    public getResearchGrant(): string {
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
