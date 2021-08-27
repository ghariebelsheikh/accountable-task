export interface SyncStatus {
  success: boolean;
  failureReason?: string;
  userId?: string;
  invalidAccessToken?: boolean;
}
