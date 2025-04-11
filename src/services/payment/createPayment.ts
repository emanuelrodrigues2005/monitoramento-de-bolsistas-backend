import PaymentModel, { PaymentModelInterface, PaymentErrorMessages } from "../../models/paymentModel";
import PaymentRepository from "../../repository/paymentRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";
import { PaymentStatus } from "@prisma/client";

interface CreatePaymentInput extends ServiceInput {
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

interface CreatePaymentOutput extends ServiceOutput {
    payment: PaymentModelInterface;
}

export class CreatePayment implements Service {
    private static instance: CreatePayment;
    private repository: PaymentRepository;

    private constructor() {
        this.repository = PaymentRepository.getInstance();
    }

    public static getInstance(): CreatePayment {
        if (!CreatePayment.instance) {
            CreatePayment.instance = new CreatePayment();
        }
        return CreatePayment.instance;
    }

    public async execute({ payment }: CreatePaymentInput): Promise<CreatePaymentOutput> {
        if (!payment) {
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

        const newPayment = await this.repository.createPayment(paymentObject);

        return {
            payment: newPayment,
        };
    }
}