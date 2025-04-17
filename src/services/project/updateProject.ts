import ProjectModel, { ProjectModelInterface } from "../../models/projectModel";
import ProjectRepository from "../../repository/projectRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";
import { ProjectStatus } from "@prisma/client";

interface UpdateProjectInput extends ServiceInput {
    project: {
        id: string;
        name: string;
        description: string;
        startDate: Date;
        endDate: Date;
        status: ProjectStatus;
        scholarshipValue: number;
        advisor: { cpf: string };
        scholarshipStudents: { cpf: string }[];
    };
}

interface UpdateProjectOutput extends ServiceOutput {
    project: ProjectModelInterface | null;
}

export class UpdateProject implements Service {
    private static instance: UpdateProject;
    private repository: ProjectRepository;

    private constructor() {
        this.repository = ProjectRepository.getInstance();
    }

    public static getInstance(): UpdateProject {
        if (!UpdateProject.instance) {
            UpdateProject.instance = new UpdateProject();
        }
        return UpdateProject.instance;
    }

    public async execute({ project }: UpdateProjectInput): Promise<UpdateProjectOutput> {
        if (!project.advisor || !project.advisor.cpf) {
            throw new Error("Advisor CPF is required.");
        }

        if (!project.scholarshipStudents || !Array.isArray(project.scholarshipStudents)) {
            throw new Error("Scholarship students data is required and must be an array.");
        }

        const scholarshipStudentsCpf = project.scholarshipStudents.map((student) => {
            if (!student.cpf) {
                throw new Error("Each scholarship student must have a CPF.");
            }
            return { scholarshipStudentCpf: student.cpf };
        });

        const projectObject = new ProjectModel(
            project.id,
            project.name,
            project.description,
            project.startDate,
            project.endDate,
            project.status,
            project.scholarshipValue,
            { cpf: project.advisor.cpf },
            scholarshipStudentsCpf
        );

        const updatedProject = await this.repository.updateProject(projectObject);

        return {
            project: updatedProject,
        };
    }
}