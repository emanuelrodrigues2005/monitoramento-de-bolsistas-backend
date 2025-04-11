import FeedbackModel, { FeedbackModelInterface } from "../../models/feedbackModel";
import FeedbackRepository from "../../repository/feedbackRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface UpdateFeedbackInput extends ServiceInput {
    feedback: {
        id: string;
        checkin: { id: string };
        advisor: { cpf: string };
        comment: string;
        feedbackDate: Date;
    };
}

interface UpdateFeedbackOutput extends ServiceOutput {
    feedback: FeedbackModelInterface | null;
}

export class UpdateFeedback implements Service {
    private static instance: UpdateFeedback;
    private repository: FeedbackRepository;

    private constructor() {
        this.repository = FeedbackRepository.getInstance();
    }

    public static getInstance(): UpdateFeedback {
        if (!UpdateFeedback.instance) {
            UpdateFeedback.instance = new UpdateFeedback();
        }
        return UpdateFeedback.instance;
    }

    public async execute({ feedback }: UpdateFeedbackInput): Promise<UpdateFeedbackOutput> {
        const feedbackObject = new FeedbackModel(
            feedback.id,
            { id: feedback.checkin.id },
            { cpf: feedback.advisor.cpf },
            feedback.comment,
            feedback.feedbackDate
        );

        const updatedFeedback = await this.repository.updateFeedback(feedbackObject);

        return { feedback: updatedFeedback };
    }
}