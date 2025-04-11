import FeedbackRepository from "../../repository/feedbackRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";
import { FeedbackErrors } from "../../models/feedbackModel";

interface DeleteFeedbackInput extends ServiceInput {
    feedbackId: string;
}

interface DeleteFeedbackOutput extends ServiceOutput {
    message: string;
}

export class DeleteFeedback implements Service {
    private static instance: DeleteFeedback;
    private repository: FeedbackRepository;

    private constructor() {
        this.repository = FeedbackRepository.getInstance();
    }

    public static getInstance(): DeleteFeedback {
        if (!DeleteFeedback.instance) {
            DeleteFeedback.instance = new DeleteFeedback();
        }
        return DeleteFeedback.instance;
    }

    public async execute({ feedbackId }: DeleteFeedbackInput): Promise<DeleteFeedbackOutput> {
        const feedback = await this.repository.getFeedbackById(feedbackId);

        if (!feedback) {
            throw new Error(FeedbackErrors.INVALID_ID_FEEDBACK);
        }

        await this.repository.deleteFeedback(feedbackId);

        return {
            message: "Feedback deletado com sucesso",
        };
    }
}