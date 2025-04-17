import ProjectModel, { ProjectModelInterface } from "../../models/projectModel";
import ProjectRepository from "../../repository/projectRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface DeleteProjectInput extends ServiceInput {
    projectId: string;
}

interface DeleteProjectOutput extends ServiceOutput {
    message: string;
}

export class DeleteProject implements Service {
    private static instance: DeleteProject;
    private repository: ProjectRepository;

    private constructor() {
        this.repository = ProjectRepository.getInstance();
    }

    public static getInstance(): DeleteProject {
        if (!DeleteProject.instance) {
            DeleteProject.instance = new DeleteProject();
        }
        return DeleteProject.instance;
    }

    public async execute({ projectId }: DeleteProjectInput): Promise<DeleteProjectOutput> {
        const deletedProject = await this.repository.deleteProject(projectId);
        return {
            message: "Projeto deletado com sucesso",
        };
    }
}
