import { CreateAdvisor } from "../services/advisor/createAdvisor";
import { UpdateAdvisor } from "../services/advisor/updateAdvisor"; 
import { GetAdvisorByCPF } from "../services/advisor/getAdvisorByCPF";
import { GetAllAdvisors } from "../services/advisor/getAllAdvisors";
import { AppRoute } from "./AppRoute";
import { DeleteAdvisor } from "../services/advisor/deleteAdvisor";

const advisorRoute = new AppRoute("advisor");

advisorRoute.routes.post("/", async (req, res) => {
    try {
        const { name, cpf, email, password, phone,  advisorRegistration} = req.body;

        const createAdvisor = CreateAdvisor.getInstance();
        const advisor = await createAdvisor.execute({
            advisor: { cpf, name, email, password, phone, advisorRegistration },
        });

        res.status(201).send(advisor);
    } catch (error: any) {
        res.status(400).send("Erro ao criar orientador: " + error.message);
    }
});

advisorRoute.routes.put("/:cpf", async (req, res) => {
    try {
        const advisorCPF = req.params.cpf;
        const advisorData = req.body;

        const updateAdvisor = UpdateAdvisor.getInstance();
        const result = await updateAdvisor.execute({ advisorCPF, advisorData });

        if (!result.advisor) {
            res.status(404).send("Orientador não encontrado.");
        }

        res.status(200).send(result.advisor);
    } catch (error: any) {
        res.status(400).send("Erro ao atualizar orientador: " + error.message);
    }
});

advisorRoute.routes.get("/:cpf", async (req, res) => {
    try {
        const advisorCPF = req.params.cpf;

        const getAdvisorByCPF = GetAdvisorByCPF.getInstance();
        const result = await getAdvisorByCPF.execute({ advisorCPF });

        if (!result.advisor) {
            res.status(404).send("Orientador não encontrado.");
        }

        res.status(200).send(result.advisor);
    } catch (error: any) {
        res.status(400).send("Erro ao buscar orientador: " + error.message);
    }
});


advisorRoute.routes.get("/", async (req, res) => {
    try {
        const getAllAdvisors = GetAllAdvisors.getInstance();
        const result = await getAllAdvisors.execute();
        
        res.status(200).send(result.advisors);
        } catch (error: any) {
            res.status(400).send("Erro ao buscar orientadores: " + error.message);
            }
            });
            

advisorRoute.routes.delete("/:cpf", async (req, res) => {
    try {
        const advisorCPF = req.params.cpf;

        const deleteAdvisor = DeleteAdvisor.getInstance();
        const result = await deleteAdvisor.execute({ advisorCPF });

        res.status(200).send(deleteAdvisor);
    } catch (error: any) {
        res.status(400).send("Erro ao deletar orientador: " + error.message);
    }
});


export { advisorRoute };