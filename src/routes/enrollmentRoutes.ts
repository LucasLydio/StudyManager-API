import { Router } from "express";
import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository";
import { PrismaCourseRepository } from "../repositories/prisma/PrismaCourseRepository";
import { PrismaEnrollmentRepository } from "../repositories/prisma/PrismaEnrollmentRepository";
import { EnrollmentService } from "../services/EnrollmentService";
import { EnrollmentController } from "../controllers/EnrollmentController";
import { validateBody } from "../infrastructure/http/middlewares/validateMiddleware";
import { createEnrollmentSchema } from "../validators/enrollmentSchemas";
import type { Request, Response, NextFunction } from "express";

export const enrollmentRoutes = Router();

const userRepo = new PrismaUserRepository();
const courseRepo = new PrismaCourseRepository();
const enrollmentRepo = new PrismaEnrollmentRepository();

const enrollmentService = new EnrollmentService(enrollmentRepo, userRepo, courseRepo);
const enrollmentController = new EnrollmentController(enrollmentService);

function normalizeEnrollmentBody(req: Request, _res: Response, next: NextFunction) {
  const body = req.body ?? {};
  req.body = {
    userId: body.userId ?? body.user_id,
    courseId: body.courseId ?? body.course_id
  };
  next();
}

enrollmentRoutes.post(
  "/",
  normalizeEnrollmentBody,
  validateBody(createEnrollmentSchema),
  enrollmentController.create
);
