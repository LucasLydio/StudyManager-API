import { Router } from "express";
import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository";
import { PrismaCourseRepository } from "../repositories/prisma/PrismaCourseRepository";
import { PrismaEnrollmentRepository } from "../repositories/prisma/PrismaEnrollmentRepository";
import { UserService } from "../services/UserService";
import { EnrollmentService } from "../services/EnrollmentService";
import { UserController } from "../controllers/UserController";
import { EnrollmentController } from "../controllers/EnrollmentController";
import { validateBody, validateParams } from "../infrastructure/http/middlewares/validateMiddleware";
import { idParamSchema } from "../validators/commonSchemas";
import { createUserSchema, updateUserSchema } from "../validators/userSchemas";

export const userRoutes = Router();

const userRepo = new PrismaUserRepository();
const courseRepo = new PrismaCourseRepository();
const enrollmentRepo = new PrismaEnrollmentRepository();

const userService = new UserService(userRepo);
const enrollmentService = new EnrollmentService(enrollmentRepo, userRepo, courseRepo);

const userController = new UserController(userService);
const enrollmentController = new EnrollmentController(enrollmentService);

userRoutes.post("/", validateBody(createUserSchema), userController.create);
userRoutes.get("/", userController.list);
userRoutes.get("/:id", validateParams(idParamSchema), userController.getById);
userRoutes.put("/:id", validateParams(idParamSchema), validateBody(updateUserSchema), userController.update);
userRoutes.delete("/:id", validateParams(idParamSchema), userController.delete);

userRoutes.get("/:id/courses", validateParams(idParamSchema), enrollmentController.listUserCourses);
