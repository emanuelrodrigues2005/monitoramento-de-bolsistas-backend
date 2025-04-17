import FeedbackModel, { FeedbackModelInterface, FeedbackErrors } from "../../models/feedbackModel";
import FeedbackRepository from "../../repository/feedbackRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetFeedbackByIdInput extends ServiceInput {
    feedbackId: string;
}

interface GetFeedbackByIdOutput extends ServiceOutput {
    feedback: FeedbackModelInterface | null;
}

export class GetFeedbackById implements Service {
    private static instance: GetFeedbackById;
    private repository: FeedbackRepository;

    private constructor() {
        this.repository = FeedbackRepository.getInstance();
    }

    public static getInstance(): GetFeedbackById {
        if (!GetFeedbackById.instance) {
            GetFeedbackById.instance = new GetFeedbackById();
        }
        return GetFeedbackById.instance;
    }

    public async execute({ feedbackId }: GetFeedbackByIdInput): Promise<GetFeedbackByIdOutput> {
        if (!feedbackId || feedbackId.trim() === "") {
            throw new Error(FeedbackErrors.INVALID_ID_FEEDBACK);
        }

        const feedbackFromDB = await this.repository.getFeedbackById(feedbackId);

        if (!feedbackFromDB) {
            throw new Error(FeedbackErrors.INVALID_ID_FEEDBACK);
        }

        return { feedback: feedbackFromDB };
    }
}