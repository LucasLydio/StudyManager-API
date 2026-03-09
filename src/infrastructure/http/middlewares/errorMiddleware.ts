import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ValidationError } from "yup";
import { AppError } from "../../../shared/errors/AppError";
import { ErrorCodes } from "../../../shared/errors/errorCodes";

function fromYupError(err: ValidationError) {
  const details = err.inner.length
    ? err.inner.map((i) => ({ path: i.path ?? null, message: i.message }))
    : [{ path: err.path ?? null, message: err.message }];

  return new AppError({
    statusCode: 400,
    code: ErrorCodes.Validation,
    message: "Validation error.",
    details
  });
}

function fromPrismaError(err: Prisma.PrismaClientKnownRequestError) {
  if (err.code === "P2002") {
    return new AppError({ statusCode: 409, code: ErrorCodes.Conflict, message: "Unique constraint failed." });
  }

  if (err.code === "P2025") {
    return new AppError({ statusCode: 404, code: ErrorCodes.NotFound, message: "Resource not found." });
  }

  return new AppError({ statusCode: 500, code: ErrorCodes.Internal, message: "Internal server error." });
}

export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const normalized =
    err instanceof AppError
      ? err
      : err instanceof ValidationError
        ? fromYupError(err)
        : err instanceof Prisma.PrismaClientKnownRequestError
          ? fromPrismaError(err)
          : new AppError({ statusCode: 500, code: ErrorCodes.Internal, message: "Internal server error." });

  return res.status(normalized.statusCode).json({
    error: {
      code: normalized.code,
      message: normalized.message,
      details: normalized.details
    }
  });
}

