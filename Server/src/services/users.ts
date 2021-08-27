import jwt from "jsonwebtoken";
import config from "config";
import User from "../models/user.model";
import { Request } from "express";
import { UNAUTHORIZED_ERR } from "../helpers/customError";

export const getUser = (query: { email: string }) => {
  return User.findOne(query).exec();
};

export const saveUser = (name: string, email: string, password: string) => {
  const user = new User({ name, email, password });
  return user.save();
};

export const createAccessToken = (userId: string, email: string): string => {
  return jwt.sign({ userId, email }, config.get("jwtPrivateKey"));
};

export const getUserId = (req: Request) => {
  const { authorization } = req.headers;
  if (!authorization) throw UNAUTHORIZED_ERR;

  try {
    const { userId } = jwt.verify(
      authorization,
      config.get("jwtPrivateKey")
    ) as {
      userId: string;
      email: string;
    };
    return userId;
  } catch (error) {
    throw UNAUTHORIZED_ERR;
  }
};

export const saveAccount = async (
  userId: string,
  bankName: string,
  bankToken: string,
  intervalFetching: number
) => {
  await User.updateOne(
    { _id: userId },
    { $set: { account: { bankName, bankToken, intervalFetching } } }
  );
};

export const getAccountWithInterval = async (intervalFetching: 1 | 3 | 6) => {
  const users = await User.find({
    "account.intervalFetching": intervalFetching,
  });

  const accounts = users
    .filter((user) => {
      if (
        !user.account ||
        user.account.intervalFetching != intervalFetching ||
        !user.account.bankName ||
        !user.account.bankToken
      )
        return false;

      return true;
    })
    .map((user) => {
      return { userId: user._id, ...user.toJSON().account };
    });

  return accounts;
};
