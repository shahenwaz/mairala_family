import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="flex justify-between p-4">
      <h1 className="text-xl font-bold">My App</h1>
      <ModeToggle />
    </header>
  );
}
