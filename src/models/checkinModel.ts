class CheckinModel {
    private id: string;
    private student: { cpf: string };
    private project: { id: string };
    private dateCheckin: Date;
    private howLong: number;
    private description: string;
    
    constructor(
        id: string,
        student: { cpf: string },
        project: { id: string },
        dateCheckin: Date,
        howLong: number,
        description: string
    ) {
        if (!id || id.trim() === "") {
            throw new Error(CheckinErrorMessages.INVALID_ID);
        }
        if (!student || !student.cpf) {
            throw new Error(CheckinErrorMessages.INVALID_STUDENT);
        }
        if (!project || !project.id) {
            throw new Error(CheckinErrorMessages.INVALID_PROJECT);
        }
        if (!dateCheckin) {
            throw new Error(CheckinErrorMessages.INVALID_DATE_CHECKIN);
        }
        if (howLong < 0) {
            throw new Error(CheckinErrorMessages.INVALID_HOW_LONG);
        }
        if (!description || description.trim() === "") {
            throw new Error(CheckinErrorMessages.INVALID_DESCRIPTION);
        }

        this.id = id;
        this.student = student;
        this.project = project;
        this.dateCheckin = dateCheckin;
        this.howLong = howLong;
        this.description = description;
    }

    public getId(): string {
        return this.id;
    }

    public getStudent(): { cpf: string } {
        return this.student;
    }

    public getProject(): { id: string } {
        return this.project;
    }

    public getDateCheckin(): Date {
        return this.dateCheckin;
    }

    public getHowLong(): number {
        return this.howLong;
    }

    public getDescription(): string {
        return this.description;
    }
}

export default CheckinModel;

export interface CheckinModelInterface {
    id: string;
    student: { cpf: string };
    project: { id: string };
    dateCheckin: Date;
    howLong: number;
    description: string;
}

export enum CheckinErrorMessages {
    INVALID_ID = "Invalid ID",
    INVALID_STUDENT = "Invalid Student",
    INVALID_PROJECT = "Invalid Project",
    INVALID_DATE_CHECKIN = "Invalid Date Checkin",
    INVALID_HOW_LONG = "Invalid How Long",
    INVALID_DESCRIPTION = "Invalid Description"
}
