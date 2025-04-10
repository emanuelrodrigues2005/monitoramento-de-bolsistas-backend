import { PrismaClient } from "@prisma/client";
import ProjectModel, { ProjectModelInterface } from "../models/projectModel";

class ProjectRepository {
    private client: PrismaClient;
    private static instance: ProjectRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static getInstance(): ProjectRepository {
        if (!ProjectRepository.instance) {
            ProjectRepository.instance = new ProjectRepository();
        }
        return ProjectRepository.instance;
    }

    async getAllProjects(): Promise<ProjectModelInterface[]> {
        const projects = await this.client.project.findMany({
            include: {
                advisor: true,
                scholarshipStudent: {
                    include: {
                        scholarshipStudent: true,
                    },
                },
            },
        });
        return projects.map((project) => ({
            ...project,
            scholarshipStudents: project.scholarshipStudent.map((relation) => relation.scholarshipStudent),
        }));
    }

    async getProjectById(id: string): Promise<ProjectModelInterface | null> {
        const project = await this.client.project.findUnique({
            where: { id },
            include: {
                advisor: true,
                scholarshipStudent: {
                    include: {
                        scholarshipStudent: true,
                    },
                },
            },
        });

        if (!project) return null;

        return {
            ...project,
            scholarshipStudents: project.scholarshipStudent.map((relation) => relation.scholarshipStudent),
        };
    }

    async createProject(project: ProjectModel): Promise<ProjectModelInterface> {
        const newProject = await this.client.project.create({
            data: {
                id: project.getId(),
                name: project.getName(),
                description: project.getDescription(),
                startDate: project.getStartDate(),
                endDate: project.getEndDate(),
                status: project.getStatus(),
                scholarshipValue: project.getScholarshipValue(),
                advisorCpf: project.getAdvisor().cpf,
                scholarshipStudent: {
                    create: project.getScholarshipStudents().map((student) => ({
                        scholarshipStudentCpf: student.scholarshipStudentCpf,
                    })),
                },
            },
            include: {
                advisor: true,
                scholarshipStudent: {
                    include: {
                        scholarshipStudent: true,
                    },
                },
            },
        });

        return {
            ...newProject,
            scholarshipStudents: newProject.scholarshipStudent.map((relation) => relation.scholarshipStudent),
        };
    }

    async updateProject(project: ProjectModel): Promise<ProjectModelInterface> {
        const updatedProject = await this.client.project.update({
            where: { id: project.getId() },
            data: {
                name: project.getName(),
                description: project.getDescription(),
                startDate: project.getStartDate(),
                endDate: project.getEndDate(),
                status: project.getStatus(),
                scholarshipValue: project.getScholarshipValue(),
                advisorCpf: project.getAdvisor().cpf,
                scholarshipStudent: {
                    deleteMany: {},
                    create: project.getScholarshipStudents().map((student) => ({
                        scholarshipStudentCpf: student.scholarshipStudentCpf,
                    })),
                },
            },
            include: {
                advisor: true,
                scholarshipStudent: {
                    include: {
                        scholarshipStudent: true,
                    },
                },
            },
        });

        return {
            ...updatedProject,
            scholarshipStudents: updatedProject.scholarshipStudent.map((relation) => relation.scholarshipStudent),
        };
    }

    async deleteProject(id: string): Promise<ProjectModelInterface | null> {
        const deletedProject = await this.client.project.delete({
            where: { id },
            include: {
                advisor: true,
                scholarshipStudent: {
                    include: {
                        scholarshipStudent: true,
                    },
                },
            },
        });

        return {
            ...deletedProject,
            scholarshipStudents: deletedProject.scholarshipStudent.map((relation) => relation.scholarshipStudent),
        };
    }
}

export default ProjectRepository;
