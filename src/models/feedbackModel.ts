class FeedbackModel {
    private id: string;
    private checkin: { id: string };
    private advisor: { cpf: string }; 
    private comment: string; 
    private feedbackDate: Date; 

    constructor(
        id: string,
        checkin: {id: string},
        advisor: {cpf: string},
        comment: string,
        feedbackDate: Date
    ) {
        if (!id || id.trim() === "") {
            throw new Error(FeedbackErrors.INVALID_ID_FEEDBACK);
        }
        if (!checkin || !checkin.id) {
            throw new Error(FeedbackErrors.INVALID_ID_ADVISOR);
            }
        if (!advisor || !advisor.cpf) {
            throw new Error(FeedbackErrors.INVALID_ID_ADVISOR);
            }
        if (!comment || comment.trim() === "") {
            throw new Error(FeedbackErrors.INVALID_COMMENT);
        }
    
            
        this.id = id;
        this.checkin = checkin;
        this.advisor = advisor;
        this.comment = comment;
        this.feedbackDate = feedbackDate;
    }

    public getIdFeedback(): string {
        return this.id;
    }

    public getCheckin(): {id: string} {
        return this.checkin;
    }

    public getAdvisor(): {cpf: string} {
        return this.advisor;
    }

    public getComment(): string {
        return this.comment;
    }

    public getFeedbackDate(): Date {
        return this.feedbackDate;
    }
}

export default FeedbackModel;

export interface FeedbackModelInterface {
    id: string;
    checkin: { id: string };
    advisor: { cpf: string };
    comment: string;
    feedbackDate: Date;
}

export enum FeedbackErrors {
    INVALID_ID_FEEDBACK = "Invalid Feedback ID: Feedback ID cannot be empty or null.",
    INVALID_ID_CHECKIN = "Invalid Checkin ID: Checkin ID cannot be empty or null.",
    INVALID_ID_ADVISOR = "Invalid Advisor ID: Advisor ID cannot be empty or null.",
    INVALID_COMMENT = "Invalid Comment: Comment cannot be empty or null.",
    INVALID_FEEDBACK_DATE = "Invalid Feedback Date: Feedback date must be a valid date."
}