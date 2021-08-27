import axios from "axios";
import config from "config";
import { Transaction } from "../types/transaction";

export const getTransactions = async (
  bankToken: string,
  intervalFetching: number
): Promise<Transaction[]> => {
  const { data } = await axios.get(config.get("bank") + "/transactions", {
    headers: {
      authorization: bankToken,
    },
    params: {
      intervalFetching: intervalFetching,
    },
  });

  return data.transactions;
};

export const saveTransactions = async (transactions: any): Promise<void> => {
  await axios.post(config.get("server") + "/api/transactions", {
    transactions,
  });
};
