import { Router } from "express";
import { asyncTryCatchMiddleware } from "../middleware/async";
import Synchronization from "../models/synchronization.model";

import {
  removeInvalidToken,
  saveTechnicalFailureToFile,
} from "../services/synchronization";

const router = Router();

router.get(
  "/",
  asyncTryCatchMiddleware(async (req, res) => {
    const synchronizations = await Synchronization.find().exec();

    res.json({ synchronizations });
  })
);

router.post(
  "/",
  asyncTryCatchMiddleware(async (req, res) => {
    const data = req.body;

    const { success, userId, invalidAccessToken } = data;

    if (!success && invalidAccessToken) {
      await removeInvalidToken(userId);
    }

    if (!success && !invalidAccessToken) {
      await saveTechnicalFailureToFile(userId);
    }

    await Synchronization.create(data);

    res.json({
      success: true,
    });
  })
);

export default router;
