import Link from "next/link";
import LoginCard from "./LoginCard";
import Image from "next/image";

export default async function Login() {
  return (
    <div className="flex flex-col p-8 shadow-xl bg-white rounded-md">
      <Link href={"/"} className="flex justify-center mb-4">
        <Image src={"/logo.svg"} width={40} height={40} alt="logo" />
      </Link>
      <h1 className="text-2xl font-bold text-center mb-4">
        Log in to SnapNext
      </h1>
      <LoginCard />
    </div>
  );
}
