import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { LoginModal } from "./LoginModal";
import { useNavigate } from "react-router-dom";
import { useAppSession } from "./AppSessionProvider";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";

function handleClick() {
  alert("yay!!!");
}

export function ScenarioTitleModal() {
  const [showLoginModal, setLoginModal] = useState(false);
  const { username, isLoggedIn, setUsername, setIsLoggedIn } = useAppSession();

  if (isLoggedIn) {
    return (
      <>
        <div className="absolute top-2 left-[42%] z-10 opacity-75 p-4 px-20 border-[2px] text-black bg-red-200 rounded-[10px]">
          <Label
            htmlFor="scenario-title"
            className="text-3xl"
            onClick={handleClick}
          >
            Scenario Title
          </Label>
        </div>

        {showLoginModal && (
          <LoginModal closeModal={() => setLoginModal(false)} />
        )}
      </>
    );
  }
}

/*
<Input
                name="username"
                id="username"
                autoComplete="username"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
*/
