import type { Request, Response, NextFunction } from "express";
import type { UserService } from "../services/UserService";
import { created, noContent, ok } from "../shared/http/httpResponses";
import { toUserJson } from "../presenters/userPresenter";

export class UserController {
  constructor(private readonly service: UserService) {}

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.list();
      return ok(res, users.map(toUserJson));
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.service.create(req.body);
      return created(res, toUserJson(user));
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const user = await this.service.getById(id);
      return ok(res, toUserJson(user));
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const user = await this.service.update(id, req.body);
      return ok(res, toUserJson(user));
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

