import AdvisorModel, { AdvisorModelInterface } from "../../models/advisorModel";
import AdvisorRepository from "../../repository/advisorRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface CreateAdvisorInput extends ServiceInput {
    advisor: AdvisorModelInterface;
}

interface CreateAdvisorOutput extends ServiceOutput {
    advisor: AdvisorModelInterface;
}

export class CreateAdvisor implements Service {
    private static instance: CreateAdvisor;
    private repository: AdvisorRepository;

    private constructor() {
        this.repository = AdvisorRepository.getInstance();
    }

    public static getInstance(): CreateAdvisor {
        if (!CreateAdvisor.instance) {
            CreateAdvisor.instance = new CreateAdvisor();
        }
        return CreateAdvisor.instance;
    }

    public async execute({ advisor }: CreateAdvisorInput): Promise<CreateAdvisorOutput> {
        const advisorObject = new AdvisorModel(advisor.cpf, advisor.name, advisor.email, advisor.password, advisor.phone, advisor.advisorRegistration);

        const newAdvisor = await this.repository.createAdvisor(advisorObject);

        return {
            advisor: newAdvisor,
        };
    }
}