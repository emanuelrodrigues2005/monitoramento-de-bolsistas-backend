import PaymentModel, { PaymentModelInterface, PaymentErrorMessages } from "../../models/paymentModel";
import PaymentRepository from "../../repository/paymentRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";
import { PaymentStatus } from "@prisma/client";

interface UpdatePaymentInput extends ServiceInput {
    payment: {
        paymentId: string;
        student: { cpf: string };
        amount: number;
        dueDate: Date;
        processingDate: Date;
        paymentStatus: PaymentStatus;
        receipt: string;
    };
}

interface UpdatePaymentOutput extends ServiceOutput {
    payment: PaymentModelInterface | null;
}

export class UpdatePayment implements Service {
    private static instance: UpdatePayment;
    private repository: PaymentRepository;

    private constructor() {
        this.repository = PaymentRepository.getInstance();
    }

    public static getInstance(): UpdatePayment {
        if (!UpdatePayment.instance) {
            UpdatePayment.instance = new UpdatePayment();
        }
        return UpdatePayment.instance;
    }

    public async execute({ payment }: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
        if (!payment.paymentId) {
            throw new Error(PaymentErrorMessages.INVALID_PAYMENT_ID);
        }

        if (!payment.student?.cpf) {
            throw new Error(PaymentErrorMessages.INVALID_STUDENT_CPF);
        }

        if (!payment.amount || payment.amount <= 0) {
            throw new Error(PaymentErrorMessages.INVALID_AMOUNT);
        }

        if (!payment.dueDate) {
            throw new Error(PaymentErrorMessages.INVALID_DUE_DATE);
        }

        if (!payment.paymentStatus) {
            throw new Error(PaymentErrorMessages.INVALID_PAYMENT_STATUS);
        }

        const paymentObject = new PaymentModel(
            payment.paymentId,
            { cpf: payment.student.cpf },
            payment.amount,
            payment.dueDate,
            payment.processingDate,
            payment.paymentStatus,
            payment.receipt
        );

        const updatedPayment = await this.repository.updatePayment(paymentObject);

        return {
            payment: updatedPayment,
        };
    }
}