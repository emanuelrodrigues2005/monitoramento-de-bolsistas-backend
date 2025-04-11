import { PrismaClient } from "@prisma/client";
import PaymentModel, { PaymentModelInterface } from "../models/paymentModel";

class PaymentRepository {
    private client: PrismaClient;
    private static instance: PaymentRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static getInstance(): PaymentRepository {
        if (!PaymentRepository.instance) {
            PaymentRepository.instance = new PaymentRepository();
        }
        return PaymentRepository.instance;
    }

    async getAllPayments(): Promise<PaymentModelInterface[]> {
        const payments = await this.client.payment.findMany({
            include: {
                student: true,
            },
        });

        return payments.map((payment) => ({
            ...payment}))
    }

    async getPaymentById(paymentId: string): Promise<PaymentModelInterface | null> {
        const payment = await this.client.payment.findUnique({
            where: { paymentId }, 
            include: {
                student: true,
            },
        });

        if (!payment) return null;

        return {
            ...payment
        };
    }

    async createPayment(payment: PaymentModel): Promise<PaymentModelInterface> {
        const newPayment = await this.client.payment.create({
            data: {
                paymentId: payment.getPaymentId(), 
                studentCPF: payment.getStudent().cpf, 
                amount: payment.getAmount(),
                dueDate: payment.getDueDate(),
                processingDate: payment.getProcessingDate(),
                paymentStatus: payment.getPaymentStatus(),
                receipt: payment.getReceipt(),
            },
            include: {
                student: true,
            },
        });

        return {
            ...newPayment
        }
    }

    async updatePayment(payment: PaymentModel): Promise<PaymentModelInterface> {
        const updatedPayment = await this.client.payment.update({
            where: { paymentId: payment.getPaymentId() },
            data: {
                studentCPF: payment.getStudent().cpf,
                amount: payment.getAmount(),
                dueDate: payment.getDueDate(),
                processingDate: payment.getProcessingDate(),
                paymentStatus: payment.getPaymentStatus(),
                receipt: payment.getReceipt(),
            },
            include: {
                student: true,
            },
        });

        return {
            ...updatedPayment
        }
    }

    async deletePayment(paymentId: string): Promise<PaymentModelInterface | null> {
        const deletedPayment = await this.client.payment.delete({
            where: { paymentId: paymentId },
            include: {
                student: true,
            },
        });

        return {
            ...deletedPayment
        }
    }
}

export default PaymentRepository;