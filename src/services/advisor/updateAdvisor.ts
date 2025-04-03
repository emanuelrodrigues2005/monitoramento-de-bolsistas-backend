import AdvisorModel, { AdvisorModelInterface } from "../../models/advisorModel";
import AdvisorRepository from "../../repository/advisorRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface UpdateAdvisorInput extends ServiceInput {
    advisorCPF: string;
    advisorData: Partial<AdvisorModelInterface>;
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

    public async execute({ advisorCPF, advisorData }: UpdateAdvisorInput): Promise<UpdateAdvisorOutput> {
        const advisorFromDB = await this.repository.getAdvisorByCPF(advisorCPF);

        if (!advisorFromDB) {
            return {
                advisor: null,
            };
        }

        const advisorToUpdate = new AdvisorModel(
            advisorFromDB.cpf,
            advisorData.name || advisorFromDB.name,
            advisorData.email || advisorFromDB.email,
            advisorData.password || advisorFromDB.password,
            advisorData.phone || advisorFromDB.phone,
            advisorData.advisorRegistration || advisorFromDB.advisorRegistration
        );
    
        const updatedAdvisor = await this.repository.updateAdvisor(advisorToUpdate);

        return {
            advisor: updatedAdvisor,
        };
    }
}
