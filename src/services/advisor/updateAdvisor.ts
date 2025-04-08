import AdvisorModel, { AdvisorModelInterface } from "../../models/advisorModel";
import AdvisorRepository from "../../repository/advisorRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface UpdateAdvisorInput extends ServiceInput {
    advisor: AdvisorModelInterface;
}

interface UpdateAdvisorOutput extends ServiceOutput {
    advisor: AdvisorModelInterface | null;
}

export class UpdateAdvisor implements Service {
    private static instance: UpdateAdvisor;
    private repository: AdvisorRepository;

    private constructor() {
        this.repository = AdvisorRepository.getInstance();
    }

    public static getInstance(): UpdateAdvisor {
        if (!UpdateAdvisor.instance) {
            UpdateAdvisor.instance = new UpdateAdvisor();
        }
        return UpdateAdvisor.instance;
    }

    public async execute({ advisor }: UpdateAdvisorInput): Promise<UpdateAdvisorOutput> {
        const newAdvisorObject = new AdvisorModel (
            advisor.cpf,
            advisor.name,
            advisor.email,
            advisor.password,
            advisor.phone,
            advisor.advisorRegistration
        );

        
        const updatedAdvisor = await this.repository.updateAdvisor(newAdvisorObject);
        return { advisor: updatedAdvisor };
    }
}
