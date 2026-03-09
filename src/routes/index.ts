import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { courseRoutes } from "./courseRoutes";
import { enrollmentRoutes } from "./enrollmentRoutes";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/courses", courseRoutes);
routes.use("/enrollments", enrollmentRoutes);

