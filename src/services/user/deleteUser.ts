import UserModel, { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";


interface DeleteUserInput extends ServiceInput {
    userCPF: string;
}

interface DeleteUserOutput extends ServiceOutput {
    user: UserModelInterface;
}

export class DeleteUser implements Service {


    private static instance: DeleteUser;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.getInstance();
    }

    public static getInstance(): DeleteUser {
        if (!DeleteUser.instance) {
            DeleteUser.instance = new DeleteUser();
        }
        return DeleteUser.instance;
    }


    async execute({ userCPF }: DeleteUserInput): Promise<DeleteUserOutput> {
        const userObject = await this.repository.getUserByCPF(userCPF);

        const deletedUser = await this.repository.deleteUser(userCPF);

        return {
            user: deletedUser,
        };
    }
}