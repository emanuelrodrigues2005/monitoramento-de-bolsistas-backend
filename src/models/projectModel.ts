import { ProjectStatus } from "@prisma/client";

class ProjectModel {
    private id: string;
    private name: string;
    private description: string;
    private startDate: Date;
    private endDate: Date;
    private status: ProjectStatus;
    private scholarshipValue: number;
    private advisor: { cpf: string };
    private scholarshipStudents: { scholarshipStudentCpf: string }[];

    constructor(
        id: string,
        name: string,
        description: string,
        startDate: Date,
        endDate: Date,
        status: ProjectStatus,
        scholarshipValue: number,
        advisor: { cpf: string },
        scholarshipStudents: { scholarshipStudentCpf: string }[]
    ) {
        if (!id || id.trim() === "") {
            throw new Error(ProjectErrorMessages.INVALID_ID);
        }
        if (!name || name.trim() === "") {
            throw new Error(ProjectErrorMessages.INVALID_NAME);
        }
        if (!description || description.trim() === "") {
            throw new Error(ProjectErrorMessages.INVALID_DESCRIPTION);
        }
        if (!startDate || !endDate || startDate > endDate) {
            throw new Error(ProjectErrorMessages.INVALID_DATE_RANGE);
        }
        if (!status) {
            throw new Error(ProjectErrorMessages.INVALID_STATUS);
        }
        if (scholarshipValue < 0) {
            throw new Error(ProjectErrorMessages.INVALID_SCHOLARSHIP_VALUE);
        }
        if (!advisor || !advisor.cpf) {
            throw new Error(ProjectErrorMessages.INVALID_ADVISOR);
        }
    
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.scholarshipValue = scholarshipValue;
        this.advisor = advisor;
        this.scholarshipStudents = scholarshipStudents;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public getStatus(): ProjectStatus {
        return this.status;
    }

    public getScholarshipValue(): number {
        return this.scholarshipValue;
    }

    public getAdvisor(): { cpf: string } {
        return this.advisor;
    }

    public getScholarshipStudents(): { scholarshipStudentCpf: string }[] {
        return this.scholarshipStudents;
    }
}

export default ProjectModel;

export interface ProjectModelInterface {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus;
    scholarshipValue: number;
    advisor: { cpf: string };
    scholarshipStudents: { cpf: string }[];
}

export enum ProjectErrorMessages {
    INVALID_ID = "Invalid ID: ID cannot be empty or null.",
    INVALID_NAME = "Invalid Name: Name cannot be empty or null.",
    INVALID_DESCRIPTION = "Invalid Description: Description cannot be empty or null.",
    INVALID_DATE_RANGE = "Invalid Date Range: Start date must be before end date.",
    INVALID_STATUS = "Invalid Status: Status cannot be empty or null.",
    INVALID_SCHOLARSHIP_VALUE = "Invalid Scholarship Value: Value cannot be negative.",
    INVALID_ADVISOR = "Invalid Advisor: Advisor CPF is required."
}
