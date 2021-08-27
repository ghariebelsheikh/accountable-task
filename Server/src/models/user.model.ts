import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  name: string;
  account?: {
    bankName: string;
    bankToken: string;
    intervalFetching: number;
  };
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  account: {
    type: new Schema<{ bankName: string }>({
      bankName: { type: String, unique: true, sparse: true },
      bankToken: { type: String, hide: true },
      intervalFetching: { type: Number, enum: [1, 3, 6], default: 1 },
    }),
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = model<IUser>("User", userSchema);

export default User;
