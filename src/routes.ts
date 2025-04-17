import { Router } from "express";
import mountRoutes from "./utils/mountRoutes";

import { userRoute } from "./controllers/userController";
import { studentRoute } from "./controllers/studentController";
import { advisorRoute } from "./controllers/advisorController";
import { projectRoute } from "./controllers/projectController";
import { paymentRoute } from "./controllers/paymentController";
import { checkinRoute } from "./controllers/checkinController";
import { feedbackRoute } from "./controllers/feedbackController";

const router = Router();

mountRoutes(router, [userRoute, studentRoute, advisorRoute, projectRoute, paymentRoute, checkinRoute, feedbackRoute]);

export default router;