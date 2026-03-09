import type { Request, Response } from "express";
import { ErrorCodes } from "../../../shared/errors/errorCodes";

export function notFoundMiddleware(_req: Request, res: Response) {
  return res.status(404).json({
    error: {
      code: ErrorCodes.NotFound,
      message: "Route not found."
    }
  });
}

