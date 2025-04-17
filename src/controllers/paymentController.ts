import { CreatePayment } from "../services/payment/createPayment";
import { UpdatePayment } from "../services/payment/updatePayment";
import { GetPaymentById } from "../services/payment/getPaymentById";
import { GetAllPayments } from "../services/payment/getAllPayments";
import { DeletePayment } from "../services/payment/deletePayment";
import { AppRoute } from "./AppRoute";

const paymentRoute = new AppRoute("payment");

paymentRoute.routes.post("/", async (req, res) => {
    try {
        const { paymentId, student, amount, dueDate, processingDate, paymentStatus, receipt } = req.body;

        const createPayment = CreatePayment.getInstance();
        const payment = await createPayment.execute({
            payment: { paymentId, student, amount, dueDate, processingDate, paymentStatus, receipt },
        });

        res.status(201).send(payment);
    } catch (error: any) {
        res.status(400).send("Erro ao criar pagamento: " + error.message);
    }
});

paymentRoute.routes.put("/:id", async (req, res) => {
    try {
        const paymentId = req.params.id;
        const { student, amount, dueDate, processingDate, paymentStatus, receipt } = req.body;

        const updatePayment = UpdatePayment.getInstance();
        const result = await updatePayment.execute({
            payment: { paymentId, student, amount, dueDate, processingDate, paymentStatus, receipt },
        });

        if (!result.payment) {
            res.status(404).send("Pagamento não encontrado.");
            return;
        }

        res.status(200).send(result.payment);
    } catch (error: any) {
        res.status(400).send("Erro ao atualizar pagamento: " + error.message);
    }
});

paymentRoute.routes.get("/:id", async (req, res) => {
    try {
        const paymentId = req.params.id;

        const getPaymentById = GetPaymentById.getInstance();
        const result = await getPaymentById.execute({ paymentId });

        if (!result.payment) {
            res.status(404).send("Pagamento não encontrado.");
            return;
        }

        res.status(200).send(result.payment);
    } catch (error: any) {
        res.status(400).send("Erro ao buscar pagamento: " + error.message);
    }
});

paymentRoute.routes.get("/", async (req, res) => {
    try {
        const getAllPayments = GetAllPayments.getInstance();
        const result = await getAllPayments.execute();

        res.status(200).send(result.payments);
    } catch (error: any) {
        res.status(400).send("Erro ao buscar pagamentos: " + error.message);
    }
});

paymentRoute.routes.delete("/:id", async (req, res) => {
    try {
        const paymentId = req.params.id;

        const deletePayment = DeletePayment.getInstance();
        const result = await deletePayment.execute({ paymentId });

        res.status(200).send(result);
    } catch (error: any) {
        res.status(400).send("Erro ao deletar pagamento: " + error.message);
    }
});

export { paymentRoute };