import CheckinModel, { CheckinModelInterface } from "../../models/checkinModel";
import CheckinRepository from "../../repository/checkinRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetCheckinByIDInput extends ServiceInput {
    checkinId: string;
}

interface GetCheckinByIDOutput extends ServiceOutput {
    checkin: CheckinModelInterface | null;
}

export class GetCheckinByID implements Service {
    private static instance: GetCheckinByID;
    private repository: CheckinRepository;

    private constructor() {
        this.repository = CheckinRepository.getInstance();
    }

    public static getInstance(): GetCheckinByID {
        if (!GetCheckinByID.instance) {
            GetCheckinByID.instance = new GetCheckinByID();
        }
        return GetCheckinByID.instance;
    }

    public async execute({ checkinId }: GetCheckinByIDInput): Promise<GetCheckinByIDOutput> {
        const checkinFromDB = await this.repository.getCheckinById(checkinId);
        return { checkin: checkinFromDB };
    }
}
