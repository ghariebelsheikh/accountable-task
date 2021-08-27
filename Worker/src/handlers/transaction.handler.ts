import { handleError } from "../helpers/handleError";
import Logger from "signale";

import { getTransactions, saveTransactions } from "../services/transaction";
import { sendSyncStatus } from "./synchronization.handler";
import { SynchronizationData } from "../types/synchronizationData";

export async function syncTransactions(
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

    await saveTransactions(
      transactions.map((transaction) => ({ ...transaction, userId }))
    );

    Logger.debug("finished saving transactions for userId %s", userId);

    await sendSyncStatus({ success: true, userId });
  } catch (e) {
    const errorObj = await handleError(e);
    await sendSyncStatus({
      ...errorObj,
      userId,
    });
  }
}
