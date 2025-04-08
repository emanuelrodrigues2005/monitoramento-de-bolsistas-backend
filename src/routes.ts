import { Router } from "express";
import mountRoutes from "./utils/mountRoutes";

// Import de todas as rotas
import { userRoute } from "./controllers/userController";
import { studentRoute } from "./controllers/studentController";
import { advisorRoute } from "./controllers/advisorController";

const router = Router();

// -- Montagem de rotas --
// Esse arquivo é o arquivo principal de rotas, então todas 
// as rotas devem ser montadas aqui. Cada controller deve ser 
// passado para dentro do array na função mountRoutes.
mountRoutes(router, [userRoute, studentRoute, advisorRoute]);

export default router;