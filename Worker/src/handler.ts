import Logger from "signale";
import axios from "axios";
import config from "config";
import { SynchronizationData, SyncStatus, Transaction } from "./types";

const getTransactions = async (
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

const saveSyncStatus = async (status: SyncStatus) => {
  await axios.post(config.get("server") + "/api/synchronizations", status);
};

const handleFailureSyncStatus = async (
  error: any
): Promise<{
  failureReason: string;
  success: boolean;
  invalidAccessToken: boolean;
}> => {
  return {
    failureReason: error.response.data,
    success: false,
    invalidAccessToken: error.response.status === 401,
  };
};

export async function saveTransactions(
  data: SynchronizationData
): Promise<void> {
  const { bankToken, intervalFetching, userId } = data!;

  Logger.debug("start syncing for userId %s", userId);

  try {
    const transactions = await getTransactions(bankToken, intervalFetching);
    Logger.debug(
      "finished syncing for userId %s and transaction Length is %d",
      userId,
      transactions.length
    );

    const modifiedTransactions = transactions.map((transaction) => ({
      ...transaction,
      userId,
    }));

    await axios.post(config.get("server") + "/api/transactions", {
      transactions: modifiedTransactions,
    });

    Logger.debug("finished saving transactions for userId %s", userId);

    await saveSyncStatus({ success: true, userId });
  } catch (e) {
    const errorObj = await handleFailureSyncStatus(e);
    await saveSyncStatus({
      ...errorObj,
      userId,
    });
  }
}
