class AdvisorModel {
    private cpf: string;
    private name: string;
    private email: string;
    private password: string;
    private phone: string;
    private advisorRegistration: string;

    constructor(
        cpf: string,
        name: string,
        email: string,
        password: string,
        phone: string,
        advisorRegistration: string
    ) {
        if (!cpf || cpf.trim() === "" || !this.isValidCPF(cpf)) {
            throw new Error(AdvisorErrors.INVALID_CPF);
        }
        if (!name || name.trim() === "") {
            throw new Error(AdvisorErrors.INVALID_NAME);
        }
        if (!email || !this.isValidEmail(email)) {
            throw new Error(AdvisorErrors.INVALID_EMAIL);
        }
        if (!password || password.length < 6) {
            throw new Error(AdvisorErrors.INVALID_PASSWORD);
        }
        if (!phone || !this.isValidPhone(phone)) {
            throw new Error(AdvisorErrors.INVALID_PHONE);
        }
        if (!advisorRegistration || advisorRegistration.trim() === "") {
            throw new Error(AdvisorErrors.INVALID_ADVISOR_REGISTRATION);
        }

        this.cpf = cpf;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.advisorRegistration = advisorRegistration;
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

        // Verifica o primeiro dígito
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

    public getAdvisorRegistration(): string {
        return this.advisorRegistration;
    }
}

export default AdvisorModel;

export interface AdvisorModelInterface {
    cpf: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    advisorRegistration: string;
}

export enum AdvisorErrors {
    INVALID_CPF = "Invalid CPF: CPF cannot be empty, invalid, or does not correspond to a real person.",
    INVALID_NAME = "Invalid Name: Name cannot be empty or null.",
    INVALID_EMAIL = "Invalid Email: Email format is incorrect.",
    INVALID_PASSWORD = "Invalid Password: Password must be at least 6 characters long.",
    INVALID_PHONE = "Invalid Phone: Phone format is incorrect.",
    INVALID_ADVISOR_REGISTRATION = "Invalid Advisor Registration: Registration cannot be empty or null.",
}