import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  ImageMessageSvg,
  TextMessageSent,
  TextMessageSvgReceived,
} from "../svgs/chatSvg";

type ChatProps = {
  chat: any;
};

const Chat = ({ chat }: ChatProps) => {
  const userToChat = chat?.participants[0];
  const lastMessage = chat?.lastMessage;
  const lastMessageType = chat?.lastMessage?.messageType;

  const amISender = lastMessage && lastMessage?.sender._id !== userToChat?._id;
  const isMessageOpened = lastMessage?.opened;

  let messageStatus: String;
  let iconComponent: JSX.Element;

  if (amISender) {
    messageStatus = isMessageOpened ? "Opened" : "Sent";
    iconComponent =
      lastMessageType === "text" ? (
        <TextMessageSent
          className={
            isMessageOpened
              ? "text-sigSnapChat "
              : "text-sigSnapChat fill-current"
          }
        />
      ) : (
        <ImageMessageSvg
          className={
            isMessageOpened ? "text-sigSnapImg" : "text-sigSnapImg fill-current"
          }
        />
      );
  } else {
    if (!lastMessage) {
      iconComponent = <TextMessageSvgReceived className="fill-current" />;
      messageStatus = "Say Hi!";
    } else {
      messageStatus = isMessageOpened ? "Received" : "Show Message";
      iconComponent =
        lastMessageType === "text" ? (
          <TextMessageSvgReceived
            className={
              !isMessageOpened
                ? "text-sigSnapChat fill-current"
                : "text-sigSnapChat"
            }
          />
        ) : (
          <ImageMessageSvg
            className={
              !isMessageOpened
                ? "text-sigSnapImg fill-current"
                : "text-sigSnapImg"
            }
          />
        );
    }
  }

  return (
    <Link href={`/chat/${userToChat?._id}`}>
      <li className="flex items-center p-2  bg-sigSurface hover:bg-sigBackgroundFeedHover cursor-pointer border-b border-b-sigColorBgBorder">
        <Avatar className="w-14 h-14 bg-black">
          <AvatarImage
            src={
              userToChat?.avatar ||
              "https://questhowth.ie/wp-content/uploads/2018/04/user-placeholder.png"
            }
          />
        </Avatar>

        <div className="ml-3">
          <p>{userToChat?.fullName}</p>
          <p className="text-gray-400 text-xs flex gap-1">
            {iconComponent}
            {messageStatus} - Feb 24
          </p>
        </div>
        <Image
          src={"/camera.svg"}
          height={0}
          width={0}
          style={{ width: "20px", height: "auto" }}
          className="ml-auto hover:scale-95 "
          alt="Camera Icon"
        />
      </li>
    </Link>
  );
};

export default Chat;
