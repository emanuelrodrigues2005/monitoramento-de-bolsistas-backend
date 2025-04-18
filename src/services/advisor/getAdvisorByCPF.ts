import AdvisorModel, { AdvisorModelInterface } from "../../models/advisorModel";
import AdvisorRepository from "../../repository/advisorRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAdvisorByCPFInput extends ServiceInput {
    advisorCPF: string;
}

interface GetAdvisorByCPFOutput extends ServiceOutput {
    advisor: AdvisorModelInterface | null;
}

export class GetAdvisorByCPF implements Service {
    private static instance: GetAdvisorByCPF;
    private repository: AdvisorRepository;

    private constructor() {
        this.repository = AdvisorRepository.getInstance();
    }

    public static getInstance(): GetAdvisorByCPF {
        if (!GetAdvisorByCPF.instance) {
            GetAdvisorByCPF.instance = new GetAdvisorByCPF();
        }
        return GetAdvisorByCPF.instance;
    }

    public async execute({ advisorCPF }: GetAdvisorByCPFInput): Promise<GetAdvisorByCPFOutput> {
        const advisorFromDB = await this.repository.getAdvisorByCPF(advisorCPF);
        return { advisor: advisorFromDB };
    }
}
