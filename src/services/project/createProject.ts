import ProjectModel, { ProjectModelInterface, ProjectErrorMessages } from "../../models/projectModel";
import ProjectRepository from "../../repository/projectRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";
import { ProjectStatus } from "@prisma/client";

interface CreateProjectInput extends ServiceInput {
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

interface CreateProjectOutput extends ServiceOutput {
    project: ProjectModelInterface;
}

export class CreateProject implements Service {
    private static instance: CreateProject;
    private repository: ProjectRepository;

    private constructor() {
        this.repository = ProjectRepository.getInstance();
    }

    public static getInstance(): CreateProject {
        if (!CreateProject.instance) {
            CreateProject.instance = new CreateProject();
        }
        return CreateProject.instance;
    }

    public async execute({ project }: CreateProjectInput): Promise<CreateProjectOutput> {
        if (!project) {
            throw new Error(ProjectErrorMessages.INVALID_DESCRIPTION);
        }

        if (!project.advisor?.cpf) {
            throw new Error(ProjectErrorMessages.INVALID_ADVISOR);
        }

        if (!Array.isArray(project.scholarshipStudents)) {
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

        const newProject = await this.repository.createProject(projectObject);

        return {
            project: newProject,
        };
    }
}