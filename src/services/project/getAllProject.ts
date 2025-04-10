import ProjectModel, { ProjectModelInterface } from '../../models/projectModel';
import ProjectRepository from '../../repository/projectRepository';
import { Service, ServiceInput, ServiceOutput } from '../service';

interface GetAllProjectInput extends ServiceInput {}

interface GetAllProjectOutput extends ServiceOutput {
    projects: ProjectModelInterface[];
}

export class GetAllProjects implements Service {
    private static instance: GetAllProjects;
    private repository: ProjectRepository;

    private constructor() {
        this.repository = ProjectRepository.getInstance();
    }

    public static getInstance(): GetAllProjects {
        if (!GetAllProjects.instance) {
            GetAllProjects.instance = new GetAllProjects();
        }
        return GetAllProjects.instance;
    }

    public async execute(): Promise<GetAllProjectOutput> {
        const projects = await this.repository.getAllProjects();
        return { projects };
    }
}
