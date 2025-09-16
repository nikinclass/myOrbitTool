import { LoginButton } from "./LoginButton";
import { Logo } from "./Logo";
import { ModeToggle } from "./mode-toggle";
import { ScenarioTitleModal } from "./ScenarioTitleModal";
import { ScenarioDetailsModal } from "./ScenarioDetailsModal";

export function Header() {
  return (
    <>
      <Logo className="h-16 absolute z-1 opacity-75 left-2 top-2" />

      <div className="h-16 flex absolute gap-4 z-1 opacity-75 top-2 right-2 items-center">
        <LoginButton />
      </div>
    </>
  );
}
