import { Avatar, AvatarImage } from "@/components/ui/avatar";

type ChatUserInfoProps = {
  username: string | null;
  avatar: string | undefined;
};

const ChatUserInfo = ({ username, avatar }: ChatUserInfoProps) => {
  return (
    <div className="cursor-pointer bg-sigButtonSecondary hover:bg-sigButtonSecondaryHover rounded-full flex gap-2 items-center py-1 px-3 text-white font-semibold">
      <Avatar className="h-8 w-8 rounded-full flex items-center justify-center">
        <AvatarImage src={avatar || "/logo.svg"} />
      </Avatar>

      <span>{username}</span>
    </div>
  );
};
export default ChatUserInfo;
