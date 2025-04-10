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

    constructor(
        cpf: string,
        name: string,
        email: string,
        password: string,
        phone: string,
        studentRegistration: string,
        bankName: string,
        bankAccount: string,
        bankAgency: string,
        researchGrant: string
    ) {
        if (!cpf || cpf.trim() === "" || !this.isValidCPF(cpf)) {
            throw new Error(StudentErrors.INVALID_CPF);
        }
        if (!name || name.trim() === "") {
            throw new Error(StudentErrors.INVALID_NAME);
        }
        if (!email || !this.isValidEmail(email)) {
            throw new Error(StudentErrors.INVALID_EMAIL);
        }
        if (!password || password.length < 6) {
            throw new Error(StudentErrors.INVALID_PASSWORD);
        }
        if (!phone || !this.isValidPhone(phone)) {
            throw new Error(StudentErrors.INVALID_PHONE);
        }
        if (!studentRegistration || studentRegistration.trim() === "") {
            throw new Error(StudentErrors.INVALID_STUDENT_REGISTRATION);
        }
        if (!bankName || bankName.trim() === "") {
            throw new Error(StudentErrors.INVALID_BANK_NAME);
        }
        if (!bankAccount || bankAccount.trim() === "") {
            throw new Error(StudentErrors.INVALID_BANK_ACCOUNT);
        }
        if (!bankAgency || bankAgency.trim() === "") {
            throw new Error(StudentErrors.INVALID_BANK_AGENCY);
        }
        if (!researchGrant || researchGrant.trim() === "") {
            throw new Error(StudentErrors.INVALID_RESEARCH_GRANT);
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

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private isValidPhone(phone: string): boolean {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phone);
    }

    private isValidCPF(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]+/g, '');

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false;
        }

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let firstVerifier = 11 - (sum % 11);
        if (firstVerifier >= 10) firstVerifier = 0;

        if (firstVerifier !== parseInt(cpf.charAt(9))) {
            return false;
        }

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let secondVerifier = 11 - (sum % 11);
        if (secondVerifier >= 10) secondVerifier = 0;

        return secondVerifier === parseInt(cpf.charAt(10));
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
    INVALID_CPF = "Invalid CPF: CPF cannot be empty, invalid, or does not correspond to a real person.",
    INVALID_NAME = "Invalid Name: Name cannot be empty or null.",
    INVALID_EMAIL = "Invalid Email: Email format is incorrect.",
    INVALID_PASSWORD = "Invalid Password: Password must be at least 6 characters long.",
    INVALID_PHONE = "Invalid Phone: Phone format is incorrect.",
    INVALID_STUDENT_REGISTRATION = "Invalid Student Registration: Registration cannot be empty or null.",
    INVALID_BANK_NAME = "Invalid Bank Name: Bank name cannot be empty or null.",
    INVALID_BANK_ACCOUNT = "Invalid Bank Account: Bank account cannot be empty or null.",
    INVALID_BANK_AGENCY = "Invalid Bank Agency: Bank agency cannot be empty or null.",
    INVALID_RESEARCH_GRANT = "Invalid Research Grant: Research grant cannot be empty or null.",
}
