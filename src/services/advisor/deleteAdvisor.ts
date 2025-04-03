import { AdvisorModelInterface } from "../../models/advisorModel";
import AdvisorRepository from "../../repository/advisorRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface DeleteAdvisorInput extends ServiceInput {
    advisorCPF: string;
}

interface DeleteAdvisorOutput extends ServiceOutput {
    advisor: AdvisorModelInterface;
}

export class DeleteAdvisor implements Service {
    private static instance: DeleteAdvisor;
    private repository: AdvisorRepository;

    private constructor() {
        this.repository = AdvisorRepository.getInstance();
    }

    public static getInstance(): DeleteAdvisor {
        if (!DeleteAdvisor.instance) {
            DeleteAdvisor.instance = new DeleteAdvisor();
        }
        return DeleteAdvisor.instance;
    }

    async execute({ advisorCPF }: DeleteAdvisorInput): Promise<DeleteAdvisorOutput> {
        const advisorObject = await this.repository.getAdvisorByCPF(advisorCPF);

        const deletedAdvisor = await this.repository.deleteAdvisor(advisorCPF);

        return {
            advisor: deletedAdvisor,
        };
    }
}