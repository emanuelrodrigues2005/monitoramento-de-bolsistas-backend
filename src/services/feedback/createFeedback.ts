import FeedbackModel, { FeedbackModelInterface } from "../../models/feedbackModel";
import FeedbackRepository from "../../repository/feedbackRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";
import { FeedbackErrors } from "../../models/feedbackModel";

interface CreateFeedbackInput extends ServiceInput {
    feedback: {
        id: string;
        checkin: { id: string };
        advisor: { cpf: string };
        comment: string;
        feedbackDate: Date;
    };
}

interface CreateFeedbackOutput extends ServiceOutput {
    feedback: FeedbackModelInterface;
}

export class CreateFeedback implements ServiceOutput {
    private static instance: CreateFeedback;
    private repository: FeedbackRepository;

    private constructor() {
        this.repository = FeedbackRepository.getInstance();
    }

    public static getInstance(): CreateFeedback {
        if (!CreateFeedback.instance) {
            CreateFeedback.instance = new CreateFeedback();
        }
        return CreateFeedback.instance;
    }

    public async execute({ feedback }: CreateFeedbackInput): Promise<CreateFeedbackOutput> {
        if (!feedback) {
            throw new Error(FeedbackErrors.INVALID_COMMENT);
        }

        const feedbackObject = new FeedbackModel(
            feedback.id,
            { id: feedback.checkin.id },
            { cpf: feedback.advisor.cpf },
            feedback.comment,
            feedback.feedbackDate
        );

        const createdFeedback = await this.repository.createFeedback(feedbackObject);

        return { feedback: createdFeedback };
    }
}