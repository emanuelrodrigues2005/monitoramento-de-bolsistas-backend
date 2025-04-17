import { CreateFeedback } from "../services/feedback/createFeedback";
import { UpdateFeedback } from "../services/feedback/updateFeedback";
import { GetFeedbackById } from "../services/feedback/getFeedbackById";
import { GetAllFeedbacks } from "../services/feedback/getAllFeedbacks";
import { DeleteFeedback } from "../services/feedback/deleteFeedback";
import { AppRoute } from "./AppRoute";

const feedbackRoute = new AppRoute("feedback");

feedbackRoute.routes.post("/", async (req, res) => {
    try {
        const { id, checkin, advisor, comment, feedbackDate } = req.body;

        const createFeedback = CreateFeedback.getInstance();
        const feedback = await createFeedback.execute({
            feedback: { id, checkin, advisor, comment, feedbackDate },
        });

        res.status(201).send(feedback);
    } catch (error: any) {
        res.status(400).send("Erro ao criar feedback: " + error.message);
    }
});

feedbackRoute.routes.put("/:id", async (req, res) => {
    try {
        const feedbackId = req.params.id;
        const { checkin, advisor, comment, feedbackDate } = req.body;

        const updateFeedback = UpdateFeedback.getInstance();
        const result = await updateFeedback.execute({
            feedback: { id: feedbackId, checkin, advisor, comment, feedbackDate },
        });

        if (!result.feedback) {
            res.status(404).send("Feedback não encontrado.");
            return;
        }

        res.status(200).send(result.feedback);
    } catch (error: any) {
        res.status(400).send("Erro ao atualizar feedback: " + error.message);
    }
});

feedbackRoute.routes.get("/:id", async (req, res) => {
    try {
        const feedbackId = req.params.id;

        const getFeedbackByID = GetFeedbackById.getInstance();
        const result = await getFeedbackByID.execute({ feedbackId });

        if (!result.feedback) {
            res.status(404).send("Feedback não encontrado.");
            return;
        }

        res.status(200).send(result.feedback);
    } catch (error: any) {
        res.status(400).send("Erro ao buscar feedback: " + error.message);
    }
});

feedbackRoute.routes.get("/", async (req, res) => {
    try {
        const getAllFeedbacks = GetAllFeedbacks.getInstance();
        const result = await getAllFeedbacks.execute();

        res.status(200).send(result.feedbacks);
    } catch (error: any) {
        res.status(400).send("Erro ao buscar feedbacks: " + error.message);
    }
});

feedbackRoute.routes.delete("/:id", async (req, res) => {
    try {
        const feedbackId = req.params.id;

        const deleteFeedback = DeleteFeedback.getInstance();
        await deleteFeedback.execute({ feedbackId });

        res.status(200).send("Feedback deletado com sucesso.");
    } catch (error: any) {
        res.status(400).send("Erro ao deletar feedback: " + error.message);
    }
});

export {  feedbackRoute };
