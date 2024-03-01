import { Schema, model, Document, Types } from "mongoose";

export interface IPost extends Document {
  likes: number;
  image: string;
  createdAt: Date;
  description?: string;
  user: Types.ObjectId;
  // likedBy: Schema.Types.ObjectId[];
}

const PostSchema = new Schema({
  description: { type: String },
  likes: { type: Number, default: 0 },
  image: { type: String, required: true },
  user: { type: Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  // likedBy: [{ type: Types.ObjectId, ref: "User" }],
});

export const Post = model<IPost>("Post", PostSchema);
