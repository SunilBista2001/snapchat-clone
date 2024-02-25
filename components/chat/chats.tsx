import { auth } from "@/auth";
import { getUsersForSidebar } from "@/lib/data";
import Chat from "./chat";

const Chats = async () => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const session = await auth();
  const chats = session?.user ? await getUsersForSidebar(session.user._id) : [];

  console.log("chats", chats);

  // Simulate loading
  await sleep(1000);
  return (
    <nav className="flex-1 overflow-y-auto">
      <ul>
        {chats?.map((chat) => (
          <Chat key={chat._id} chat={chat} />
        ))}
      </ul>
    </nav>
  );
};
export default Chats;
