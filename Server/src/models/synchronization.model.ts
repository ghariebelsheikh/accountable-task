import { Schema, model, Types } from "mongoose";

export interface ISynchronization {
  success: boolean;
  failureReason?: string;
  userId: string;
}

const synchronizationSchema = new Schema<ISynchronization>(
  {
    success: {
      type: Boolean,
      required: true,
    },
    failureReason: {
      type: String,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Synchronization = model<ISynchronization>(
  "Synchronization",
  synchronizationSchema
);

export default Synchronization;
