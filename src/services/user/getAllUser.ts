import UserModel, { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllUserInput extends ServiceInput {}

interface GetAllUserOutput extends ServiceOutput {
    users: UserModelInterface[];
}

export class GetAllUser implements Service {
    private static instance: GetAllUser;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.getInstance();
    }

    public static getInstance(): GetAllUser {
        if (!GetAllUser.instance) {
            GetAllUser.instance = new GetAllUser();
        }
        return GetAllUser.instance;
    }

    public async execute(): Promise<GetAllUserOutput> {
        const users = await this.repository.getAllUsers();
        const userObjects = users.map((user) => ({
            cpf: user.cpf,
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
        }));

        return {
            users: userObjects,
        };
    }
}
