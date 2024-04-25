import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  likes: number;
  image: string;
  createdAt: Date;
  description?: string;
  user: Types.ObjectId;
  title: string;
  likedBy: Schema.Types.ObjectId[];
}

const ProductSchema = new Schema({
  description: { type: String, required: true },
  likes: { type: Number, default: 0 },
  image: { type: String },
  user: { type: Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  title: { type: String, required: true },
  likedBy: [{ type: Types.ObjectId, ref: "User" }],
});

export const Product = model<IProduct>("Product", ProductSchema);
