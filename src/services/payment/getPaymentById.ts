import PaymentRepository from "../../repository/paymentRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";
import { PaymentModelInterface, PaymentErrorMessages } from "../../models/paymentModel";

interface GetPaymentByIdInput extends ServiceInput {
    paymentId: string;
}

interface GetPaymentByIdOutput extends ServiceOutput {
    payment: PaymentModelInterface | null;
}

export class GetPaymentById implements Service {
    private static instance: GetPaymentById;
    private repository: PaymentRepository;

    private constructor() {
        this.repository = PaymentRepository.getInstance();
    }

    public static getInstance(): GetPaymentById {
        if (!GetPaymentById.instance) {
            GetPaymentById.instance = new GetPaymentById();
        }
        return GetPaymentById.instance;
    }

    public async execute({ paymentId }: GetPaymentByIdInput): Promise<GetPaymentByIdOutput> {
        const payment = await this.repository.getPaymentById(paymentId);

        if (!payment) {
            throw new Error(PaymentErrorMessages.PAYMENT_NOT_FOUND);
        }

        return { payment };
    }
}