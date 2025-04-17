import CheckinModel, { CheckinModelInterface } from "../../models/checkinModel";
import CheckinRepository from "../../repository/checkinRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface UpdateCheckinInput extends ServiceInput {
    checkin: {
        id: string;
        student: { cpf: string };
        project: { id: string };
        dateCheckin: Date;
        howLong: number;
        description: string;
    };
}

interface UpdateCheckinOutput extends ServiceOutput {
    checkin: CheckinModelInterface | null;
}

export class UpdateCheckin implements Service {
    private static instance: UpdateCheckin;
    private repository: CheckinRepository;

    private constructor() {
        this.repository = CheckinRepository.getInstance();
    }

    public static getInstance(): UpdateCheckin {
        if (!UpdateCheckin.instance) {
            UpdateCheckin.instance = new UpdateCheckin();
        }
        return UpdateCheckin.instance;
    }

    public async execute({ checkin }: UpdateCheckinInput): Promise<UpdateCheckinOutput> {
        const checkinObject = new CheckinModel(
            checkin.id,
            { cpf: checkin.student.cpf },
            { id: checkin.project.id },
            checkin.dateCheckin,
            checkin.howLong,
            checkin.description
        );

        const updatedCheckin = await this.repository.updateCheckin(checkinObject);

        return { checkin: updatedCheckin };
    }
}
