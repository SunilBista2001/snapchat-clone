import mongoose, { Document, Model } from "mongoose";

export interface Iuser {
  username: string | null;
  fullName: string;
  email: string;
  avatar?: string | undefined;
}

export interface IUserDocument extends Iuser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    // Getting the createdAt and updatedAt fields
    timestamps: true,
  }
);

const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema);

export default User;
