import CheckinModel, { CheckinModelInterface } from "../../models/checkinModel";
import CheckinRepository from "../../repository/checkinRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllCheckinInput extends ServiceInput {}

interface GetAllCheckinOutput extends ServiceOutput {
    checkins: CheckinModelInterface[];
}

export class GetAllCheckins implements Service {
    private static instance: GetAllCheckins;
    private repository: CheckinRepository;

    private constructor() {
        this.repository = CheckinRepository.getInstance();
    }

    public static getInstance(): GetAllCheckins {
        if (!GetAllCheckins.instance) {
            GetAllCheckins.instance = new GetAllCheckins();
        }
        return GetAllCheckins.instance;
    }

    public async execute(): Promise<GetAllCheckinOutput> {
        const checkins = await this.repository.getAllCheckins();
        return { checkins };
    }
}
