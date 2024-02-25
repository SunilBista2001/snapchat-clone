import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IUserDocument } from "@/models/user.model";

type UserCardProps = {
  user: IUserDocument;

  handleSelectUser: (user: IUserDocument) => void;

  selectedUser: IUserDocument | null;
};
const UserCard = ({ user, handleSelectUser, selectedUser }: UserCardProps) => {
  const isSelected = selectedUser?._id === user._id;

  return (
    <div
      className={`flex items-center gap-2 border-b border-b-sigColorBgBorder p-1 hover:bg-sigBackgroundFeedHover cursor-pointer ${
        isSelected && "bg-gray-100 text-black hover:bg-transparent"
      }`}
      onClick={() => handleSelectUser(user)}
    >
      <Avatar className="cursor-pointer hover:bg-sigBackgroundSecondaryHover">
        <AvatarImage src={user?.avatar} />
      </Avatar>
      <span>{user?.username}</span>
    </div>
  );
};
export default UserCard;
