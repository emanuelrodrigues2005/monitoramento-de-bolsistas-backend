import PaymentRepository from "../../repository/paymentRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";
import { PaymentModelInterface } from "../../models/paymentModel";

interface GetAllPaymentsInput extends ServiceInput {}

interface GetAllPaymentsOutput extends ServiceOutput {
    payments: PaymentModelInterface[];
}

export class GetAllPayments implements Service {
    private static instance: GetAllPayments;
    private repository: PaymentRepository;

    private constructor() {
        this.repository = PaymentRepository.getInstance();
    }

    public static getInstance(): GetAllPayments {
        if (!GetAllPayments.instance) {
            GetAllPayments.instance = new GetAllPayments();
        }
        return GetAllPayments.instance;
    }

    public async execute(): Promise<GetAllPaymentsOutput> {
        const payments = await this.repository.getAllPayments();
        return { payments };
    }
}