import { Router } from "express";
import { PrismaCourseRepository } from "../repositories/prisma/PrismaCourseRepository";
import { CourseService } from "../services/CourseService";
import { CourseController } from "../controllers/CourseController";
import { validateBody, validateParams } from "../infrastructure/http/middlewares/validateMiddleware";
import { idParamSchema } from "../validators/commonSchemas";
import { createCourseSchema, updateCourseSchema } from "../validators/courseSchemas";

export const courseRoutes = Router();

const courseRepo = new PrismaCourseRepository();
const courseService = new CourseService(courseRepo);
const courseController = new CourseController(courseService);

courseRoutes.post("/", validateBody(createCourseSchema), courseController.create);
courseRoutes.get("/", courseController.list);
courseRoutes.get("/:id", validateParams(idParamSchema), courseController.getById);
courseRoutes.put("/:id", validateParams(idParamSchema), validateBody(updateCourseSchema), courseController.update);
courseRoutes.delete("/:id", validateParams(idParamSchema), courseController.delete);
