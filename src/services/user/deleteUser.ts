import UserModel, { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";


interface DeleteUserInput extends ServiceInput {
    userCPF: string;
}

interface DeleteUserOutput extends ServiceOutput {
    message: string;
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
        const user = await this.repository.deleteUser(userCPF);
        return { message: "Usuário deletado com sucesso" };
    }
}