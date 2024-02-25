import Image from "next/image";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center h-14 justify-between">
      <Image src="/logo.svg" alt="logo" width={40} height={40} priority />
      <div className="flex space-x-1">
        <Button className="bg-transparent hover:bg-primary/5 text-black ">
          Stories
        </Button>
        <Button className="bg-transparent hover:bg-primary/5 text-black ">
          Spotlight
        </Button>
        <Button
          asChild
          className="bg-transparent hover:bg-primary/5 text-black "
        >
          <Link href="chat">Chat</Link>
        </Button>
      </div>
      <LogoutBtn />
    </nav>
  );
};

export default Navbar;
