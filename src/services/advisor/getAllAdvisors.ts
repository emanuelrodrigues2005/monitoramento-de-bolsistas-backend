import AdvisorModel, { AdvisorModelInterface } from "../../models/advisorModel";
import AdvisorRepository from "../../repository/advisorRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllAdvisorsInput extends ServiceInput {}

interface GetAllAdvisorsOutput extends ServiceOutput {
    advisors: AdvisorModelInterface[];
}

export class GetAllAdvisors implements Service {
    private static instance: GetAllAdvisors;
    private repository: AdvisorRepository;

    private constructor() {
        this.repository = AdvisorRepository.getInstance();
    }

    public static getInstance(): GetAllAdvisors {
        if (!GetAllAdvisors.instance) {
            GetAllAdvisors.instance = new GetAllAdvisors();
        }
        return GetAllAdvisors.instance;
    }

    public async execute(): Promise<GetAllAdvisorsOutput> {
        const advisors = await this.repository.getAllAdvisors();
        const advisorObjects = advisors.map((advisor) => ({
            cpf: advisor.cpf,
            name: advisor.name,
            email: advisor.email,
            password: advisor.password,
            phone: advisor.phone,
            advisorRegistration: advisor.advisorRegistration,
        }));

        return {
            advisors: advisorObjects,
        };
    }
}