import CheckinModel, { CheckinModelInterface } from "../../models/checkinModel";
import CheckinRepository from "../../repository/checkinRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface DeleteCheckinInput extends ServiceInput {
    checkinId: string;
}

interface DeleteCheckinOutput extends ServiceOutput {
    message: string;
}

export class DeleteCheckin implements Service {
    private static instance: DeleteCheckin;
    private repository: CheckinRepository;

    private constructor() {
        this.repository = CheckinRepository.getInstance();
    }

    public static getInstance(): DeleteCheckin {
        if (!DeleteCheckin.instance) {
            DeleteCheckin.instance = new DeleteCheckin();
        }
        return DeleteCheckin.instance;
    }

    public async execute({ checkinId }: DeleteCheckinInput): Promise<DeleteCheckinOutput> {
        const deletedCheckin = await this.repository.deleteCheckin(checkinId);
        return {
            message: "Check-in deletado com sucesso",
        };
    }
}