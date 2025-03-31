import { PrismaClient } from "@prisma/client";
import UserModel, { UserModelInterface } from "../models/userModel";

class UserRepository {
    private client: PrismaClient
    private static instace: UserRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static getInstance(): UserRepository {
        if (!UserRepository.instace) {
            UserRepository.instace = new UserRepository();
        }
        return UserRepository.instace;
    }

    async getAllUsers(): Promise<UserModelInterface[]> {
        const users = await this.client.user.findMany();
        return users;
    }

    async getUserByCPF(cpf: string): Promise<UserModelInterface | null> {
        const user = await this.client.user.findUnique({
            where: {
                cpf,
            },
        })

        return user;
    }

    async createUser(user: UserModel): Promise<UserModelInterface> {
        const newUser = await this.client.user.create({
            data: {
                cpf: user.getCpf(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                phone: user.getPhone()
            }
        });

        return newUser;
    }

    async updateUser(user: UserModel): Promise<UserModelInterface> {
        const updateUser = await this.client.user.update({
            where: {
                cpf: user.getCpf()
            }, 
            data: {
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                phone: user.getPhone()
            }
        });

        return updateUser;
    }
    
    async deleteUser(cpf: string): Promise<UserModelInterface> {
        const user = await this.client.user.delete({
            where: {
                cpf,
            },
        });

        return user;
    }
}

export default UserRepository;