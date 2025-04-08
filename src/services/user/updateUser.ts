import UserModel, { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface UpdateUserInput extends ServiceInput {
    user: UserModelInterface;
}

interface UpdateUserOutput extends ServiceOutput {
    user: UserModelInterface | null;
}

export class UpdateUser implements Service {
    private static instance: UpdateUser;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.getInstance();
    }

    public static getInstance(): UpdateUser {
        if (!UpdateUser.instance) {
            UpdateUser.instance = new UpdateUser();
        }
        return UpdateUser.instance;
    }

    public async execute({ user }: UpdateUserInput): Promise<UpdateUserOutput> {
        const newUser = new UserModel(
            user.cpf,
            user.name,
            user.email,
            user.password,
            user.phone
        )
        const updatedUser = await this.repository.updateUser(newUser);
        return { user: updatedUser };
    }
}
