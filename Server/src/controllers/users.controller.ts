import bcrypt from "bcrypt";
import { Router } from "express";
import { LOGIN_FAIL_ERR, NOT_FOUND_ERR } from "../helpers/customError";
import { asyncTryCatchMiddleware } from "../middleware/async";

import {
  createAccessToken,
  getUser,
  getUserId,
  saveAccount,
  saveUser,
} from "../services/users";

const router = Router();

router.post(
  "/register",
  asyncTryCatchMiddleware(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await saveUser(name, email, password);

    const token = createAccessToken(user.id as string, email);

    res.json({ token });
  })
);

router.post(
  "/login",
  asyncTryCatchMiddleware(async (req, res) => {
    const { email, password } = req.body;

    const user = await getUser({ email });

    if (!user) throw NOT_FOUND_ERR;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw LOGIN_FAIL_ERR;

    const token = createAccessToken(user.id as string, email);

    res.json({ token });
  })
);

router.post(
  "/account",
  asyncTryCatchMiddleware(async (req, res) => {
    const { bankName, bankToken, intervalFetching } = req.body;

    if (!bankName || !bankToken) throw NOT_FOUND_ERR;

    await saveAccount(getUserId(req), bankName, bankToken, intervalFetching);

    res.json({ message: "Updated successfully" });
  })
);

export default router;
