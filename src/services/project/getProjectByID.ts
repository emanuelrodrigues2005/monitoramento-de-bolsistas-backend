import ProjectModel, { ProjectModelInterface } from "../../models/projectModel";
import ProjectRepository from "../../repository/projectRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetProjectByIDInput extends ServiceInput {
    projectId: string;
}

interface GetProjectByIDOutput extends ServiceOutput {
    project: ProjectModelInterface | null;
}

export class GetProjectByID implements Service {
    private static instance: GetProjectByID;
    private repository: ProjectRepository;

    private constructor() {
        this.repository = ProjectRepository.getInstance();
    }

    public static getInstance(): GetProjectByID {
        if (!GetProjectByID.instance) {
            GetProjectByID.instance = new GetProjectByID();
        }
        return GetProjectByID.instance;
    }

    public async execute({ projectId }: GetProjectByIDInput): Promise<GetProjectByIDOutput> {
        const projectFromDB = await this.repository.getProjectById(projectId);
        return { project: projectFromDB };
    }
}
