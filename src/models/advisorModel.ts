class AdvisorModel {
    private cpf: string; 
    private name: string; 
    private email: string; 
    private password: string; 
    private phone: string; 
    private advisorRegistration: string;

    constructor(cpf: string, name: string, email: string, password: string, phone: string, advisorRegistration: string) {
        if (!cpf || cpf.trim() === "") {
            throw new Error(AdvisorErrors.INVALID_CPF);
        }
        this.cpf = cpf;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.advisorRegistration = advisorRegistration;
    }

    public getAdvisorCpf(): string {
        return this.cpf;
    }

    public getAdvisorName(): string {
        return this.name;
    }

    public getAdvisorEmail(): string {
        return this.email;
    }

    public getAdvisorPassword(): string {
        return this.password;
    }

    public getAdvisorPhone(): string {
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
    INVALID_CPF = "Invalid CPF: CPF cannot be empty or null.",
}