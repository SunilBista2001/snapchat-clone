import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logoutAction } from "@/lib/actions";

const LogoutBtn = () => {
  return (
    <form action={logoutAction}>
      <Button className="hover:bg-primary/5 bg-transparent text-white ">
        <LogOut size={24} className="cursor-pointer" />
      </Button>
    </form>
  );
};

export default LogoutBtn;
