import type { Request, Response, NextFunction } from "express";
import type { CourseService } from "../services/CourseService";
import { created, noContent, ok } from "../shared/http/httpResponses";
import { toCourseJson } from "../presenters/coursePresenter";

export class CourseController {
  constructor(private readonly service: CourseService) {}

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await this.service.list();
      return ok(res, courses.map(toCourseJson));
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await this.service.create(req.body);
      return created(res, toCourseJson(course));
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const course = await this.service.getById(id);
      return ok(res, toCourseJson(course));
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const course = await this.service.update(id, req.body);
      return ok(res, toCourseJson(course));
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.service.delete(id);
      return noContent(res);
    } catch (err) {
      next(err);
    }
  };
}

