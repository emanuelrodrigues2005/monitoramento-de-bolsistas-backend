import { CreateUser } from "../services/user/createUser";
import { UpdateUser } from "../services/user/updateUser";
import { GetUserByCPF } from "../services/user/getUserByCPF";
import { GetAllUser } from "../services/user/getAllUser";
import { DeleteUser } from "../services/user/deleteUser";
import { AppRoute } from "./AppRoute";

const userRoute = new AppRoute("user");

userRoute.routes.post("/", async (req, res) => {
    try {
        const { name, cpf, email, password, phone } = req.body;

        const createUser = CreateUser.getInstance();
        const user = await createUser.execute({
            user: { cpf, name, email, password, phone },
        });

        res.status(201).send(user);
    } catch (error: any) {
        res.status(400).send("Erro ao criar usuário: " + error.message);
    }
});

userRoute.routes.put("/:cpf", async (req, res) => {
    try {
        const userCpf = req.params.cpf;
        const { name, email, password, phone } = req.body;
        const userService = UpdateUser.getInstance();
        const user = await userService.execute({ user: { cpf: userCpf, name, email, password, phone } });

        if (!user) {
            res.status(404).send("Usuário não encontrado.");
            return;
        }

        res.status(200).send(user);
    } catch (error: any) {
        res.status(400).send("Erro ao atualizar usuário: " + error.message);
    }
});

userRoute.routes.get("/:cpf", async (req, res) => {
    try {
        const userCPF = req.params.cpf;

        const getUserByCPF = GetUserByCPF.getInstance();
        const result = await getUserByCPF.execute({ userCPF });

        if (!result.user) {
            res.status(404).send("Usuário não encontrado.");
        }

        res.status(200).send(result.user);
    } catch (error: any) {
        res.status(400).send("Erro ao buscar usuário: " + error.message);
    }
});

userRoute.routes.get("/", async (req, res) => {
    try {
        const getAllUser = GetAllUser.getInstance();
        const result = await getAllUser.execute();

        res.status(200).send(result.users);
    } catch (error: any) {
        res.status(400).send("Erro ao buscar usuários: " + error.message);
    }
});

userRoute.routes.delete("/:cpf", async (req, res) => {
    try {
        const userCPF = req.params.cpf;

        const deleteUser = DeleteUser.getInstance();
        const result = await deleteUser.execute({ userCPF });

        res.status(200).send(result);
    } catch (error: any) {
        res.status(400).send("Erro ao deletar usuário: " + error.message);
    }
});

export { userRoute };