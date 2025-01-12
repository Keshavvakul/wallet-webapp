import { Poppins } from "next/font/google";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/ui/button";
import { LoginButton } from "../components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center w-1/4 h-1/2 py-9 bg-sky-700-100 border border-gray-400">
        <h1
          className={cn(
            "text-blue-500 text-6xl font-normal drop-shadow-md",
            font.className,
          )}
        >
          V-Bank
        </h1>
        <LoginButton>
          <Button
            variant="secondary"
            size="xl"
            className="text-white font-bold h-12 text-lg w-96 hover:bg-sky-700"
          >
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
