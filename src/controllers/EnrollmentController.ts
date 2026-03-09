import type { Request, Response, NextFunction } from "express";
import type { EnrollmentService } from "../services/EnrollmentService";
import { created, ok } from "../shared/http/httpResponses";
import { toEnrollmentJson } from "../presenters/enrollmentPresenter";
import { toUserJson } from "../presenters/userPresenter";
import { toCourseJson } from "../presenters/coursePresenter";

export class EnrollmentController {
  constructor(private readonly service: EnrollmentService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const enrollment = await this.service.create(req.body);
      return created(res, toEnrollmentJson(enrollment));
    } catch (err) {
      next(err);
    }
  };

  listUserCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const result = await this.service.listUserCourses(userId);
      return ok(res, {
        user: toUserJson(result.user),
        courses: result.courses.map(toCourseJson)
      });
    } catch (err) {
      next(err);
    }
  };
}

