import { CreateUser } from "../services/user/createUser";
import { AppRoute } from "./AppRoute";

const userRoute = new AppRoute("user");

userRoute.routes.post("/", async (req, res) => {
    try {
        const name = req.body.name;
        const cpf = req.body.cpf;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;

        const createUser = CreateUser.getInstance();

        const user = await createUser.execute({
            user: {
                cpf, 
                name, 
                email, 
                password,
                phone
            }
        })

        res.status(201).send(user);
    } catch (error: any) {
        res.status(400).send("Erro ao criar usuário: " + error.message);
    }
});

export { userRoute };