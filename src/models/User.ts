import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema = new Schema({
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  email: { type: String, required: true, unique: true },
});

export const User = model<IUser>("User", UserSchema);
