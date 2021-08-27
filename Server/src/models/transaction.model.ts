import { Schema, model, Types } from "mongoose";

export interface ITransaction {
  amount: number;
  currency: string;
  userId: Types.ObjectId;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Transaction = model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
