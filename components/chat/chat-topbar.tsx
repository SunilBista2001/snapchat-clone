import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ChatUserInfo from "./chat-user-info";
import DeleteMessagesButton from "./delete-messages-button";
import { Button } from "../ui/button";
import { getUserProfile } from "@/lib/data";

const ChatTopbar = async ({ id }: { id: string }) => {
  const user = await getUserProfile(id);

  return (
    <div className="mt-4 flex justify-between items-center w-full">
      <div className="flex gap-2">
        <Button
          asChild
          className="bg-sigButtonSecondary hover:bg-sigButtonSecondaryHover w-11 h-11 rounded-full "
        >
          <Link href={"/chat"}>
            <ChevronLeft className="min-w-7" />
          </Link>
        </Button>
        <ChatUserInfo username={user?.username} avatar={user?.avatar} />
      </div>
      {/* right */}
      <DeleteMessagesButton />
    </div>
  );
};
export default ChatTopbar;
