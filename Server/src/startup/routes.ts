import express, { Express, NextFunction, Request, Response } from "express";
import transactions from "../controllers/transactions.controller";
import users from "../controllers/users.controller";
import synchronizations from "../controllers/synchronizations.controller";
import { CustomError } from "../helpers/customError";

export default function (app: Express) {
  app.use(express.json());
  app.use("/api/transactions", transactions);
  app.use("/api/users", users);
  app.use("/api/synchronizations", synchronizations);
  app.use(
    (err: CustomError, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof CustomError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        next(err);
      }
    }
  );
}
