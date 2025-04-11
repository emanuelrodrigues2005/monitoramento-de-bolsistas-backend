import FeedbackModel, { FeedbackModelInterface } from "../../models/feedbackModel";
import FeedbackRepository from "../../repository/feedbackRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllFeedbacksInput extends ServiceInput {}

interface GetAllFeedbacksOutput extends ServiceOutput {
    feedbacks: FeedbackModelInterface[];
}

export class GetAllFeedbacks implements Service {
    private static instance: GetAllFeedbacks;
    private repository: FeedbackRepository;

    private constructor() {
        this.repository = FeedbackRepository.getInstance();
    }

    public static getInstance(): GetAllFeedbacks {
        if (!GetAllFeedbacks.instance) {
            GetAllFeedbacks.instance = new GetAllFeedbacks();
        }
        return GetAllFeedbacks.instance;
    }

    public async execute(): Promise<GetAllFeedbacksOutput> {
        const feedbacks = await this.repository.getAllFeedbacks();
        return { feedbacks };
    }
}