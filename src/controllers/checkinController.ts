import { CreateCheckin } from "../services/checkin/createCheckin";
import { DeleteCheckin } from "../services/checkin/deleteCheckin";
import { GetCheckinByID } from "../services/checkin/getCheckinByID";
import { GetAllCheckins } from "../services/checkin/getAllCheckin";
import { UpdateCheckin } from "../services/checkin/updateCheckin";
import { AppRoute } from "./AppRoute";

const checkinRoute = new AppRoute("checkin");

checkinRoute.routes.post("/", async (req, res) => {
    try {
        const { id, student, project, dateCheckin, howLong, description } = req.body;

        const createCheckin = CreateCheckin.getInstance();
        const checkin = await createCheckin.execute({
            checkin: { id, student, project, dateCheckin, howLong, description },
        });

        res.status(201).send(checkin);
    } catch (error: any) {
        res.status(400).send("Erro ao criar checkin: " + error.message);
    }
});

checkinRoute.routes.put("/:id", async (req, res) => {
    try {
        const checkinId = req.params.id;
        const { student, project, dateCheckin, howLong, description } = req.body;

        const updateCheckin = UpdateCheckin.getInstance();
        const result = await updateCheckin.execute({
            checkin: { id: checkinId, student, project, dateCheckin, howLong, description },
        });

        if (!result.checkin) {
            res.status(404).send("Checkin não encontrado.");
            return;
        }

        res.status(200).send(result.checkin);
    } catch (error: any) {
        res.status(400).send("Erro ao atualizar checkin: " + error.message);
    }
});

checkinRoute.routes.get("/:id", async (req, res) => {
    try {
        const checkinId = req.params.id;

        const getCheckinByID = GetCheckinByID.getInstance();
        const result = await getCheckinByID.execute({ checkinId });

        if (!result.checkin) {
            res.status(404).send("Checkin não encontrado.");
            return;
        }

        res.status(200).send(result.checkin);
    } catch (error: any) {
        res.status(400).send("Erro ao buscar checkin: " + error.message);
    }
});

checkinRoute.routes.get("/", async (req, res) => {
    try {
        const getAllCheckins = GetAllCheckins.getInstance();
        const result = await getAllCheckins.execute();

        res.status(200).send(result.checkins);
    } catch (error: any) {
        res.status(400).send("Erro ao buscar checkins: " + error.message);
    }
});

checkinRoute.routes.delete("/:id", async (req, res) => {
    try {
        const checkinId = req.params.id;

        const deleteCheckin = DeleteCheckin.getInstance();
        const result = await deleteCheckin.execute({ checkinId });

        res.status(200).send(result);
    } catch (error: any) {
        res.status(400).send("Erro ao deletar checkin: " + error.message);
    }
});

export { checkinRoute }
