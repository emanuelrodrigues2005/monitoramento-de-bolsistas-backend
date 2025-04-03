import { PrismaClient } from "@prisma/client";
import AdvisorModel, { AdvisorModelInterface } from "../models/advisorModel";

class AdvisorRepository {
    private client: PrismaClient
    private static instance: AdvisorRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static getInstance(): AdvisorRepository {
        if (!AdvisorRepository.instance) {
            AdvisorRepository.instance = new AdvisorRepository();
        }
        return AdvisorRepository.instance;
    }

    async getAllAdvisors(): Promise<AdvisorModelInterface[]> {
        const advisors = await this.client.advisor.findMany();
        return advisors;
    }

    async getAdvisorByCPF(cpf: string): Promise<AdvisorModelInterface | null> {
        const user = await this.client.user.findUnique({
            where: {
                cpf,
            },
        })

        return user;
    }

    async createAdvisor(advisor: AdvisorModel): Promise<AdvisorModelInterface> {
        const newUser = await this.client.advisor.create({
            data: {
                cpf: advisor.getAdvisorCpf(),
                name: advisor.getAdvisorName(),
                email: advisor.getAdvisorEmail(),
                password: advisor.getAdvisorPassword(),
                phone: advisor.getAdvisorPhone()
    
            }
        });

        return newUser;
    }

    async updateAdvisor(advisor: AdvisorModel): Promise<AdvisorModelInterface> {
        const updateAdvisor = await this.client.advisor.update({
            where: {
                cpf: advisor.getAdvisorCpf()
            }, 
            data: {
                name: advisor.getAdvisorName(),
                email: advisor.getAdvisorEmail(),
                password: advisor.getAdvisorPassword(),
                phone: advisor.getAdvisorPhone()
            }
        });

        return updateAdvisor;
    }
    
    async deleteAdvisor(cpf: string): Promise<AdvisorModelInterface> {
        const advisor = await this.client.advisor.delete({
            where: {
                cpf,
            },
        });

        return advisor;
    }
}

export default AdvisorRepository;