"use server";

import { auth, signIn, signOut } from "@/auth";
import { connectToMongoDb } from "./db";
import { v2 as cloudinary } from "cloudinary";
import Message, { IMessageDocument } from "@/models/message.model";
import Chat, { IChatDocument } from "@/models/chat.model";
import { unstable_noStore as noStore } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const authAction = async () => {
  try {
    await signIn("github");
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") {
      throw error;
    }
    return error.message;
  }
};

export const logoutAction = async () => {
  await signOut();
};

export const sendMessageAction = async (
  receiverId: string,
  content: string,
  messageType: "text" | "image"
) => {
  noStore();
  try {
    const session = await auth();

    if (!session) return;

    // Connecting to MONGO DB
    await connectToMongoDb();

    const senderId = session?.user._id;

    let sendResponse;

    if (messageType === "image") {
      sendResponse = await cloudinary.uploader.upload(content);
    }

    const newMessage: IMessageDocument = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content: sendResponse?.secure_url || content,
      messageType,
    });

    const isChatExists: IChatDocument | null = await Chat.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!isChatExists) {
      await Chat.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
      });
    } else {
      isChatExists.messages.push(newMessage._id);
      await isChatExists.save();
    }
  } catch (error: any) {
    console.log("Error sending message:", error.message);
    throw error;
  }
};
