
class UserModel {
    private cpf: string; 
    private name: string; 
    private email: string; 
    private password: string; 
    private phone: string; 

    constructor(cpf: string, name: string, email: string, password: string, phone: string) {
        if (!cpf || cpf.trim() === "") {
            throw new Error(UserErros.INVALID_CPF);
        }
        this.cpf = cpf;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
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
}

export default UserModel;

export interface UserModelInterface {
    cpf: string;
    name: string;
    email: string;
    password: string;
    phone: string;
}

export enum UserErros {
    INVALID_CPF = "Invalid CPF: CPF cannot be empty or null.",
}