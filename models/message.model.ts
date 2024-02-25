import mongoose, { Document, Model, PopulatedDoc } from "mongoose";
import { Types } from "mongoose";
import { IUserDocument } from "./user.model";

interface IMessage {
  sender: Types.ObjectId | PopulatedDoc<IUserDocument>;
  receiver: Types.ObjectId | PopulatedDoc<IUserDocument>;
  content: string;
  messageType: "text" | "image";
  opened: boolean;
}

export interface IMessageDocument extends IMessage, Document {
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema<IMessageDocument>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },

    messageType: {
      type: String,
      enum: ["text", "image"],
      required: true,
    },

    opened: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message: Model<IMessageDocument> =
  mongoose.models.Message ||
  mongoose.model<IMessageDocument>("Message", messageSchema);

export default Message;
