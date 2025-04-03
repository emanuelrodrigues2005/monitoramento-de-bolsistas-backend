import UserModel, { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetUserByCPFInput extends ServiceInput {
    userCPF: string;
}

interface GetUserByCPFOutput extends ServiceOutput {
    user: UserModelInterface | null;
}

export class GetUserByCPF implements Service {
    private static instance: GetUserByCPF;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.getInstance();
    }

    public static getInstance(): GetUserByCPF {
        if (!GetUserByCPF.instance) {
            GetUserByCPF.instance = new GetUserByCPF();
        }
        return GetUserByCPF.instance;
    }

    public async execute({ userCPF }: GetUserByCPFInput): Promise<GetUserByCPFOutput> {
        const userFromDB = await this.repository.getUserByCPF(userCPF);

        if (!userFromDB) {
            return {
                user: null
            };
        }

        const userObject = {
            cpf: userFromDB.cpf,
            name: userFromDB.name,
            email: userFromDB.email,
            password: userFromDB.password,
            phone: userFromDB.phone,
        }

        return {
            user: userObject,
        };
    }
}
