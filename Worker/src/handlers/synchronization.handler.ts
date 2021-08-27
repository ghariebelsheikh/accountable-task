import { saveSyncStatus } from "../services/synchronization";
import { SyncStatus } from "../types/syncStatus";

export const sendSyncStatus = async (message: SyncStatus) => {
  await saveSyncStatus(message);
};
