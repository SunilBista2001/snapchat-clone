import Chat, { IChatDocument } from "@/models/chat.model";
import Message, { IMessageDocument } from "@/models/message.model";
import User, { IUserDocument } from "@/models/user.model";
import { connectToMongoDb } from "./db";

export const getUsersForSidebar = async (authUserId: string) => {
  try {
    const allUsers: IUserDocument[] = await User.find({
      _id: { $ne: authUserId },
    });

    const allUsersInfo = await Promise.all(
      allUsers.map(async (user) => {
        const lastMessage: IMessageDocument | null = await Message.findOne({
          $or: [
            { sender: user?._id, receiver: authUserId },
            { sender: authUserId, receiver: user?._id },
          ],
        })
          .sort({ createdAt: -1 })
          .populate("sender", "username avatar _id")
          .populate("receiver", "username avatar _id")
          .exec();

        return {
          _id: user._id,
          participants: [user],
          lastMessage: lastMessage
            ? {
                ...lastMessage.toJSON(),
                sender: lastMessage.sender,
                receiver: lastMessage.receiver,
              }
            : null,
        };
      })
    );

    return allUsersInfo;
  } catch (error) {
    throw new Error("Error in fetching users for sidebar");
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    await connectToMongoDb();
    const user: IUserDocument | null = await User.findById(userId);

    if (!user) {
      throw new Error("No user found");
    }

    return {
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
    };
  } catch (error) {
    throw new Error("Error in fetching user profile");
  }
};

export const getMessages = async (authUserId: string, receiverId: string) => {
  try {
    await connectToMongoDb();
    const chat: IChatDocument | null = await Chat.findOne({
      participants: { $all: [authUserId, receiverId] },
    }).populate({ path: "messages", populate: { path: "sender" } });

    if (!chat) return [];

    const messages = chat.messages;

    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    throw new Error("Error in fetching messages");
  }
};
