"use client";
import Image from "next/image";
import { EmojiPopover } from "./emoji-popover";
import { TextMessageSent } from "../svgs/chatSvg";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { sendMessageAction } from "@/lib/actions";

const SendMsgInput = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");

  const { id } = useParams<{ id: string }>();

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendMessageAction(id, message, "text");
      setMessage("");
    } catch (error: any) {
      console.log("error in sending msg from client", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center py-1">
      <div className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-sigBackgroundSecondaryHover">
        <Image
          src={"/camera.svg"}
          height={0}
          width={0}
          style={{ width: "20px", height: "auto" }}
          alt="camera icon"
        />
      </div>
      <form
        onSubmit={handleSendMessage}
        className="flex-1 flex  items-center gap-1 bg-sigBackgroundSecondaryHover rounded-full border   border-sigColorBgBorder"
      >
        <Input
          placeholder="Send a chat"
          className="bg-transparent focus:outline-transparent border-none outline-none w-full h-full rounded-full"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          size={"sm"}
          className="bg-transparent hover:bg-transparent text-sigSnapChat"
          type="submit"
        >
          {isLoading ? (
            <Loader2 className="animate-spin w-6 h-6" />
          ) : (
            <TextMessageSent className=" scale-150 mr-1" />
          )}
        </Button>
      </form>
      <div className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-white bg-sigBackgroundSecondaryHover">
        <EmojiPopover />
      </div>
    </div>
  );
};
export default SendMsgInput;
