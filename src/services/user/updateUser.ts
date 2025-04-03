import UserModel, { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface UpdateUserInput extends ServiceInput {
    userCPF: string;
    userData: Partial<UserModelInterface>;
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

    public async execute({ userCPF, userData }: UpdateUserInput): Promise<UpdateUserOutput> {
        const userFromDB = await this.repository.getUserByCPF(userCPF);

        if (!userFromDB) {
            return {
                user: null,
            };
        }

        const userToUpdate = new UserModel(
            userFromDB.cpf,
            userData.name || userFromDB.name,
            userData.email || userFromDB.email,
            userData.password || userFromDB.password,
            userData.phone || userFromDB.phone
        );
    
        const updatedUser = await this.repository.updateUser(userToUpdate);

        return {
            user: updatedUser,
        };
    }
}
