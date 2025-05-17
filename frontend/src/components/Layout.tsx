import Navigation from "./Navigation";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <header className="p-4 shadow flex justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl bold">Brighte Eats</h1>
        </div>
        <Navigation />
      </header>

      <main className="p-6 flex-1">{children}</main>
      <Toaster />
    </div>
  );
}
