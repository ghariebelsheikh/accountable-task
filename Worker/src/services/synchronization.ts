import axios from "axios";
import config from "config";
import { SyncStatus } from "../types/syncStatus";

export const saveSyncStatus = async (status: SyncStatus) => {
  await axios.post(config.get("server") + "/api/synchronizations", status);
};
