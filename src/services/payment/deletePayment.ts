import PaymentRepository from "../../repository/paymentRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";
import { PaymentErrorMessages } from "../../models/paymentModel";

interface DeletePaymentInput extends ServiceInput {
    paymentId: string;
}

interface DeletePaymentOutput extends ServiceOutput {
    message: string;
}

export class DeletePayment implements Service {
    private static instance: DeletePayment;
    private repository: PaymentRepository;

    private constructor() {
        this.repository = PaymentRepository.getInstance();
    }

    public static getInstance(): DeletePayment {
        if (!DeletePayment.instance) {
            DeletePayment.instance = new DeletePayment();
        }
        return DeletePayment.instance;
    }

    public async execute({ paymentId }: DeletePaymentInput): Promise<DeletePaymentOutput> {
        const payment = await this.repository.getPaymentById(paymentId);

        if (!payment) {
            throw new Error(PaymentErrorMessages.PAYMENT_NOT_FOUND);
        }

        await this.repository.deletePayment(paymentId);

        return {
            message: "Payment successfully deleted",
        };
    }
}