import { Router } from "express";
import mountRoutes from "./utils/mountRoutes";

import { userRoute } from "./controllers/userController";
import { studentRoute } from "./controllers/studentController";
import { advisorRoute } from "./controllers/advisorController";
import { projectRoute } from "./controllers/projectController";
import { checkinRoute } from "./controllers/checkinController";

const router = Router();

mountRoutes(router, [userRoute, studentRoute, advisorRoute, projectRoute, checkinRoute]);

export default router;