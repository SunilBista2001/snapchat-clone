import { auth } from "@/auth";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  const session = await auth();

  return (
    <div className="w-full flex flex-col  bg-[#fffc00] min-h-screen justify-center items-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
      <Navbar />
      <main className="flex flex-1 flex-col md:flex-row items-center justify-center">
        <div className="flex-1 md:text-left text-center h-full">
          <h1 className="text-2xl md:text-5xl font-bold">
            SnapNext 4 programmers 🚀
          </h1>
          <p className="mt-4 text-lg font-semibold">
            Share your code with your friends to get feedback and improve your
            code.
          </p>
          <div className="mt-4">
            <p className="mt-2 text-lg font-semibold">
              What are you waiting for?
            </p>
          </div>
          {!session ? (
            <Button
              asChild
              className="mt-4 bg-black text-white flex items-center rounded-lg gap-2 mx-auto md:mx-0"
            >
              <Link href={"/login"} className="max-w-max">
                <Image
                  src="/logo.svg"
                  width={20}
                  height={20}
                  alt="Snapchat logo"
                />
                Log in to explore
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              className="mt-4 bg-black text-white flex items-center rounded-lg gap-2 mx-auto md:mx-0"
            >
              <Link href={"/chat"} className="max-w-max">
                <Image
                  src="/logo.svg"
                  width={20}
                  height={20}
                  alt="Snapchat logo"
                />
                Start chatting
              </Link>
            </Button>
          )}
        </div>
        <div className="flex-1 md:w-full md:flex">
          <Image alt="Avatar" width={651} height={621} src="/hero.png" />
        </div>
      </main>
    </div>
  );
};

export default Home;
