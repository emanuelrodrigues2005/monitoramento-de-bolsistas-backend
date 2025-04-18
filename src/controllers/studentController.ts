import { CreateStudent } from "../services/student/createStudent";
import { UpdateStudent } from "../services/student/updateStudent";
import { GetStudentByCPF } from "../services/student/getStudentByCPF";
import { GetAllStudent } from "../services/student/getAllStudent";
import { DeleteStudent } from "../services/student/deleteStudent";
import { AppRoute } from "./AppRoute";

const studentRoute = new AppRoute("student");

studentRoute.routes.post("/", async (req, res) => {
    try {
        const { cpf, name, email, password, phone, studentRegistration, bankName, bankAccount, bankAgency, researchGrant } = req.body;

        const createStudent = CreateStudent.getInstance();
        const student = await createStudent.execute({
            student: { cpf, name, email, password, phone, studentRegistration, bankName, bankAccount, bankAgency, researchGrant },
        });

        res.status(201).send(student);
    } catch (error: any) {
        res.status(400).send("Erro ao criar aluno: " + error.message);
    }
});

studentRoute.routes.put("/:cpf", async (req, res) => {
    try {
        const studentCPF = req.params.cpf;
        const { name, email, password, phone, studentRegistration, bankName, bankAccount, bankAgency, researchGrant } = req.body;

        const updateStudent = UpdateStudent.getInstance();
        const result = await updateStudent.execute({
            student: { cpf: studentCPF, name, email, password, phone, studentRegistration, bankName, bankAccount, bankAgency, researchGrant },
        });

        if (!result.student) {
            res.status(404).send("Aluno não encontrado.");
            return;
        }

        res.status(200).send(result.student);
    } catch (error: any) {
        res.status(400).send("Erro ao atualizar aluno: " + error.message);
    }
});

studentRoute.routes.get("/:cpf", async (req, res) => {
    try {
        const studentCPF = req.params.cpf;

        const getStudentByCPF = GetStudentByCPF.getInstance();
        const result = await getStudentByCPF.execute({ studentCPF });

        if (!result.student) {
            res.status(404).send("Aluno não encontrado.");
            return;
        }

        res.status(200).send(result.student);
    } catch (error: any) {
        res.status(400).send("Erro ao buscar aluno: " + error.message);
    }
});

studentRoute.routes.get("/", async (req, res) => {
    try {
        const getAllStudent = GetAllStudent.getInstance();
        const result = await getAllStudent.execute();

        res.status(200).send(result.students);
    } catch (error: any) {
        res.status(400).send("Erro ao buscar alunos: " + error.message);
    }
});

studentRoute.routes.delete("/:cpf", async (req, res) => {
    try {
        const studentCPF = req.params.cpf;

        const deleteStudent = DeleteStudent.getInstance();
        const result = await deleteStudent.execute({ studentCPF });

        res.status(200).send(result);
    } catch (error: any) {
        res.status(400).send("Erro ao deletar aluno: " + error.message);
    }
});

export { studentRoute };
