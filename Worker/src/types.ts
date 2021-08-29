export type SynchronizationData = {
  bankToken: string;
  intervalFetching: number;
  _id?: string;
  userId?: string;
  invalidAccessToken?: boolean;
};

export interface SyncStatus {
  success: boolean;
  failureReason?: string;
  userId?: string;
  invalidAccessToken?: boolean;
}

export interface Transaction {
  amount: string;
  currency: string;
  userId: string;
}
