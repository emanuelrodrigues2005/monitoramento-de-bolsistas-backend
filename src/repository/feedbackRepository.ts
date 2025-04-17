import { PrismaClient } from "@prisma/client";
import FeedbackModel, { FeedbackModelInterface } from "../models/feedbackModel";

class FeedbackRepository {
    private client: PrismaClient;
    private static instance: FeedbackRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static getInstance(): FeedbackRepository {
        if (!FeedbackRepository.instance) {
            FeedbackRepository.instance = new FeedbackRepository();
        }
        return FeedbackRepository.instance;
    }

    async getAllFeedbacks(): Promise<FeedbackModelInterface[]> {
        const feedbacks = await this.client.feedback.findMany({
            include: {
                checkin: true,
                advisor: true,
            },
        });
        return feedbacks
    }

    async getFeedbackById(id: string): Promise<FeedbackModelInterface | null> {
        const feedback = await this.client.feedback.findUnique({
            where: { id },
            include: {
                checkin: true,
                advisor: true,
            },
        });

        if (!feedback) return null;

        return feedback;
    }

    async createFeedback(feedback: FeedbackModel): Promise<FeedbackModelInterface> {
        const newFeedback = await this.client.feedback.create({
            data: {
                id: feedback.getIdFeedback(),
                checkinId: feedback.getCheckin().id,
                advisorCpf: feedback.getAdvisor().cpf,
                comment: feedback.getComment(),
                feedbackDate: feedback.getFeedbackDate(),
            },
            include: {
                checkin: true,
                advisor: true,
            },
        });

        return newFeedback;
    }

    async updateFeedback(feedback: FeedbackModel): Promise<FeedbackModelInterface  | null> {
        const updatedFeedback = await this.client.feedback.update({
            where: { id: feedback.getIdFeedback() },
            data: {
                checkinId: feedback.getCheckin().id,
                advisorCpf: feedback.getAdvisor().cpf,
                comment: feedback.getComment(),
                feedbackDate: feedback.getFeedbackDate(),
            },
            include: {
                checkin: true,
                advisor: true,
            },
        });

        if (!updatedFeedback) return null;

        return updatedFeedback;
    }

    async deleteFeedback(id: string): Promise<FeedbackModelInterface | null> {
        const deletedFeedback = await this.client.feedback.delete({
            where: { id },
            include: {
                checkin: true,
                advisor: true,
            },
        });

        return deletedFeedback;
    }
}

export default FeedbackRepository;
