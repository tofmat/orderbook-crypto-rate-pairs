import { Button, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="flex justify-center items-center py-4 px-4 lg:py-8 lg:px-10">
        <Link href="/">
          {" "}
          <div className="flex gap-2 items-center">
            <Image
              src="/svg/bitcoin-svgrepo-com.svg"
              width={"20px"}
              alt="bitcoin"
            />
            <p className="text-lg">Token Pairs</p>
          </div>
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
