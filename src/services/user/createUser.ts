import UserModel, { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface CreateUserInput extends ServiceInput {
    user: UserModelInterface;
}

interface CreateUserOutput extends ServiceOutput {
    user: UserModelInterface;
}

export class CreateUser implements Service {
    private static instance: CreateUser;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.getInstance();
    }

    public static getInstance(): CreateUser {
        if (!CreateUser.instance) {
            CreateUser.instance = new CreateUser();
        }
        return CreateUser.instance;
    }

    public async execute({ user }: CreateUserInput): Promise<CreateUserOutput> {
        const userObject = new UserModel(user.cpf, user.name, user.email, user.password, user.phone);

        const newUser = await this.repository.createUser(userObject);

        return {
            user: newUser,
        };
    }
}