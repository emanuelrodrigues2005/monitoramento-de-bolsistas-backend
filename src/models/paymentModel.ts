import { PaymentStatus } from "@prisma/client";

class PaymentModel {
    private paymentId: string; 
    private student: {cpf: string}; 
    private amount: number; 
    private dueDate: Date; 
    private processingDate: Date; 
    private paymentStatus: PaymentStatus; 
    private receipt: string; 

    constructor(
        paymentId: string,
        student: {cpf: string},
        amount: number,
        dueDate: Date,
        processingDate: Date,
        paymentStatus: PaymentStatus,
        receipt: string
    ) {
        this.paymentId = paymentId;
        this.student = student;
        this.amount = amount;
        this.dueDate = dueDate;
        this.processingDate = processingDate;
        this.paymentStatus = paymentStatus;
        this.receipt = receipt;
    }

    
    public getPaymentId(): string {
        return this.paymentId;
    }

    public getStudent(): {cpf: string}{
        return this.student;
    }

    public getAmount(): number {
        return this.amount;
    }

    public getDueDate(): Date {
        return this.dueDate;
    }

    public getProcessingDate(): Date {
        return this.processingDate;
    }

    public getPaymentStatus(): PaymentStatus {
        return this.paymentStatus;
    }

    public getReceipt(): string {
        return this.receipt;
    }

}

export default PaymentModel;

export interface PaymentModelInterface {
    paymentId: string;
    student: {cpf: string};
    amount: number;
    dueDate: Date;
    processingDate: Date;
    paymentStatus: PaymentStatus;
    receipt: string; 

}

export enum PaymentErrorMessages {
    INVALID_PAYMENT_ID = "The payment ID is invalid.",
    INVALID_STUDENT_CPF = "The student CPF is invalid.",
    INVALID_AMOUNT = "The payment amount must be greater than zero.",
    INVALID_DUE_DATE = "The due date is invalid or missing.",
    INVALID_PROCESSING_DATE = "The processing date is invalid.",
    INVALID_PAYMENT_STATUS = "The payment status is invalid.",
    INVALID_RECEIPT = "The receipt is invalid or missing.",
    PAYMENT_NOT_FOUND = "The payment was not found.",
    STUDENT_NOT_FOUND = "The student associated with the payment was not found.",
}