import { CreateStudent } from "../services/student/creatStudent";
import { UpdateStudent } from "../services/student/updateStudent";
import { GetStudentByCPF } from "../services/student/getStudentByCPF";
import { GetAllStudent } from "../services/student/getAllStudent";
import { AppRoute } from "./AppRoute";
import { DeleteStudent } from "../services/student/deleteStudent";

const studentRoute = new AppRoute("student");

studentRoute.routes.post("/", async (req, res) => {
    try {
        const { name, cpf, email, password, phone, studentRegistration } = req.body;

        const createStudent = CreateStudent.getInstance();
        const student = await createStudent.execute({
            student: { cpf, name, email, password, phone, studentRegistration },
        });

        res.status(201).send(student);
    } catch (error: any) {
        res.status(400).send("Erro ao criar aluno: " + error.message);
    }
});

studentRoute.routes.put("/:cpf", async (req, res) => {
    try {
        const studentCPF = req.params.cpf;
        const studentData = req.body;

        const updateStudent = UpdateStudent.getInstance();
        const result = await updateStudent.execute({ studentCPF, studentData });

        if (!result.student) {
            res.status(404).send("Aluno não encontrado.");
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

        if (!result.student) {
            res.status(404).send("Aluno não encontrado.");
        }

        res.status(200).send(result.student);
    } catch (error: any) {
        res.status(400).send("Erro ao deletar aluno: " + error.message);
    }
});

export { studentRoute };
