import { CreateProject } from "../services/project/createProject";
import { UpdateProject } from "../services/project/updateProject";
import { GetProjectByID } from "../services/project/getProjectByID";
import { GetAllProjects } from "../services/project/getAllProject";
import { DeleteProject } from "../services/project/deleteProject";
import { AppRoute } from "./AppRoute";

const projectRoute = new AppRoute("project");

projectRoute.routes.post("/", async (req, res) => {
    try {
        const { id, name, description, startDate, endDate, status, scholarshipValue, advisor, scholarshipStudents } = req.body;

        const createProject = CreateProject.getInstance();
        const project = await createProject.execute({
            project: { id, name, description, startDate, endDate, status, scholarshipValue, advisor, scholarshipStudents },
        });

        res.status(201).send(project);
    } catch (error: any) {
        res.status(400).send("Erro ao criar projeto: " + error.message);
    }
});

projectRoute.routes.put("/:id", async (req, res) => {
    try {
        const projectId = req.params.id;
        const { name, description, startDate, endDate, status, scholarshipValue, advisor, scholarshipStudents } = req.body;

        const updateProject = UpdateProject.getInstance();
        const result = await updateProject.execute({
            project: { id: projectId, name, description, startDate, endDate, status, scholarshipValue, advisor, scholarshipStudents },
        });

        if (!result.project) {
            res.status(404).send("Projeto não encontrado.");
            return;
        }

        res.status(200).send(result.project);
    } catch (error: any) {
        res.status(400).send("Erro ao atualizar projeto: " + error.message);
    }
});

projectRoute.routes.get("/:id", async (req, res) => {
    try {
        const projectId = req.params.id;

        const getProjectByID = GetProjectByID.getInstance();
        const result = await getProjectByID.execute({ projectId });

        if (!result.project) {
            res.status(404).send("Projeto não encontrado.");
            return;
        }

        res.status(200).send(result.project);
    } catch (error: any) {
        res.status(400).send("Erro ao buscar projeto: " + error.message);
    }
});

projectRoute.routes.get("/", async (req, res) => {
    try {
        const getAllProjects = GetAllProjects.getInstance();
        const result = await getAllProjects.execute();

        res.status(200).send(result.projects);
    } catch (error: any) {
        res.status(400).send("Erro ao buscar projetos: " + error.message);
    }
});

projectRoute.routes.delete("/:id", async (req, res) => {
    try {
        const projectId = req.params.id;

        const deleteProject = DeleteProject.getInstance();
        const result = await deleteProject.execute({ projectId });

        res.status(200).send(result);
    } catch (error: any) {
        res.status(400).send("Erro ao deletar projeto: " + error.message);
    }
});

export { projectRoute };
