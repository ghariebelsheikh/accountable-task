import Transaction, { ITransaction } from "../models/transaction.model";

export const getTransactions = async (
  userId: string,
  skip: number,
  limit: number
) => {
  return Transaction.find({ userId }).skip(skip).limit(limit).exec();
};

export const saveTransactions = async (transactions: ITransaction[]) => {
  return Transaction.insertMany(transactions);
};
