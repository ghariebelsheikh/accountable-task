import { Router } from "express";
import { asyncTryCatchMiddleware } from "../middleware/async";
import { getTransactions, saveTransactions } from "../services/transaction";
import { getUserId } from "../services/users";

const router = Router();

router.get(
  "/",
  asyncTryCatchMiddleware(async (req, res) => {
    const transactions = await getTransactions(
      getUserId(req),
      parseInt((req.query.skip as string) || "0"),
      parseInt((req.query.limit as string) || "0")
    );

    res.json({ transactions });
  })
);

router.post(
  "/",
  asyncTryCatchMiddleware(async (req, res) => {
    await saveTransactions(req.body.transactions);

    res.json({ message: "Created successfully" });
  })
);

export default router;
