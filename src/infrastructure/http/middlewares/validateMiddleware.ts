import type { NextFunction, Request, Response } from "express";
import type { AnyObjectSchema } from "yup";

export function validateBody(schema: AnyObjectSchema) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      (req as any).body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
      next();
    } catch (err) {
      next(err);
    }
  };
}

export function validateParams(schema: AnyObjectSchema) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      (req as any).params = await schema.validate(req.params, { abortEarly: false, stripUnknown: true });
      next();
    } catch (err) {
      next(err);
    }
  };
}
