import CheckinModel, { CheckinErrorMessages, CheckinModelInterface } from "../../models/checkinModel";
import CheckinRepository from "../../repository/checkinRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface CreateCheckinInput extends ServiceInput {
    checkin: {
        id: string;
        student: { cpf: string };
        project: { id: string };
        dateCheckin: Date;
        howLong: number;
        description: string;
    }
}

interface CreateCheckinOutput extends ServiceOutput {
    checkin: CheckinModelInterface;
}

export class CreateCheckin implements ServiceOutput {
    private static instance: CreateCheckin;
    private repository: CheckinRepository;

    private constructor() {
        this.repository = CheckinRepository.getInstance();
    }

    public static getInstance(): CreateCheckin {
        if (!CreateCheckin.instance) {
            CreateCheckin.instance = new CreateCheckin();
        }
        return CreateCheckin.instance;
    }

    public async execute({ checkin }: CreateCheckinInput): Promise<CreateCheckinOutput> {
        if (!checkin) {
            throw new Error(CheckinErrorMessages.INVALID_DESCRIPTION);
        }

        const checkinObject = new CheckinModel(
            checkin.id,
            { cpf: checkin.student.cpf },
            { id: checkin.project.id },
            checkin.dateCheckin,
            checkin.howLong,
            checkin.description
        );

        const createdCheckin = await this.repository.createCheckin(checkinObject);

        return { checkin: createdCheckin };
    }
}