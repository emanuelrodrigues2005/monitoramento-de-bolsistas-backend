import { PrismaClient } from "@prisma/client";
import AdvisorModel, { AdvisorModelInterface } from "../models/advisorModel";

class AdvisorRepository {
    private client: PrismaClient;
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
        const advisor = await this.client.advisor.findUnique({
            where: {
                cpf,
            },
        });

        return advisor;
    }

    async createAdvisor(advisor: AdvisorModel): Promise<AdvisorModelInterface> {
        const newAdvisor = await this.client.advisor.create({
            data: {
                cpf: advisor.getCpf(),
                name: advisor.getName(),
                email: advisor.getEmail(),
                password: advisor.getPassword(),
                phone: advisor.getPhone(),
                advisorRegistration: advisor.getAdvisorRegistration(),
            },
        });

        return newAdvisor;
    }

    async updateAdvisor(advisor: AdvisorModel): Promise<AdvisorModelInterface> {
        const updatedAdvisor = await this.client.advisor.update({
            where: {
                cpf: advisor.getCpf(),
            },
            data: {
                name: advisor.getName(),
                email: advisor.getEmail(),
                password: advisor.getPassword(),
                phone: advisor.getPhone(),
                advisorRegistration: advisor.getAdvisorRegistration(),
            },
        });

        return updatedAdvisor;
    }

    async deleteAdvisor(cpf: string): Promise<AdvisorModelInterface> {
        const deletedAdvisor = await this.client.advisor.delete({
            where: {
                cpf,
            },
        });

        return deletedAdvisor;
    }
}

export default AdvisorRepository;