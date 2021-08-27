import { Request, Response, NextFunction } from "express";

export const asyncTryCatchMiddleware = (
  handler: (req: Request, res: Response) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};
