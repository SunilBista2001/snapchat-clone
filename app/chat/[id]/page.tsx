import { auth } from "@/auth";
import ChatMessages from "@/components/chat/chat-messages";
import ChatTopbar from "@/components/chat/chat-topbar";
import SendMsgInput from "@/components/chat/send-msg-input";
import { getMessages } from "@/lib/data";

const ChatHistoryPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const authUserId = session?.user._id as string;

  console.log("authUserId=>", authUserId);

  const messages = await getMessages(authUserId, params.id);

  console.log("messsages=>", messages);

  return (
    <div className="bg-sigMain h-screen flex-[3_3_0%] flex flex-col px-4 text-white">
      {/* topbar */}
      <ChatTopbar id={params.id} />
      {/* below-topbar section */}
      <div className="bg-sigSurface flex-1 overflow-y-auto rounded-xl my-4 border border-sigColorBgBorder  py-2 px-3 ">
        {/* Message container */}
        <div className="flex flex-col">
          <ChatMessages messages={messages} session={session} />
        </div>
      </div>
      {/* Input */}
      <SendMsgInput />
    </div>
  );
};
export default ChatHistoryPage;
