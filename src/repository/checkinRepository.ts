import { PrismaClient } from "@prisma/client";
import CheckinModel, { CheckinModelInterface } from "../models/checkinModel";

class CheckinRepository {
    private client: PrismaClient;
    private static instance: CheckinRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static getInstance(): CheckinRepository {
        if (!CheckinRepository.instance) {
            CheckinRepository.instance = new CheckinRepository();
        }
        return CheckinRepository.instance;
    }

    async getAllCheckins(): Promise<CheckinModelInterface[]> {
        const checkins = await this.client.checkin.findMany({
            include: {
                student: true,
                project: true,
            },
        });

        return checkins;
    }

    async getCheckinById(id: string): Promise<CheckinModelInterface | null> {
        const checkin = await this.client.checkin.findUnique({
            where: { id },
            include: {
                student: true,      
                project: true,
            },
        });

        if (!checkin) return null;

        return checkin;
    }

    async createCheckin(checkin: CheckinModel): Promise<CheckinModelInterface> {
        const newCheckin = await this.client.checkin.create({
            data: {
                id: checkin.getId(),
                studentCpf: checkin.getStudent().cpf,
                projectId: checkin.getProject().id,
                dateCheckin: checkin.getDateCheckin(),
                howLong: checkin.getHowLong(),
                description: checkin.getDescription(),
            },
            
            include: {
                student: true,
                project: true,
            },
        });

        return newCheckin;
    }

    async updateCheckin(checkin: CheckinModel): Promise<CheckinModelInterface | null> {
        const updatedCheckin = await this.client.checkin.update({
            where: { id: checkin.getId() },
            data: {
                studentCpf: checkin.getStudent().cpf,
                projectId: checkin.getProject().id,
                dateCheckin: checkin.getDateCheckin(),
                howLong: checkin.getHowLong(),
                description: checkin.getDescription(),
            },
            include: {
                student: true,
                project: true,
            },
        });

        return updatedCheckin;
    }

    async deleteCheckin(id: string): Promise<CheckinModelInterface | null> {
        const deletedCheckin = await this.client.checkin.delete({
            where: { id },
            include: {
                student: true,
                project: true,
            },
        });

        return deletedCheckin;
    }
}

export default CheckinRepository;
