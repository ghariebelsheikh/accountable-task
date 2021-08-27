import { Express } from "express";
import cors from "cors";

export default function (app: Express) {
  app.use(cors());
}
