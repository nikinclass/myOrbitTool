import { useContext, useEffect, useState } from "react";
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

export function ScenarioTitleModal() {
  const [showTitleModal, setTitleModal] = useState(false);
  const [titleLabel, setTitleLabel] = useState("Scenario Title");
  const { username, isLoggedIn, setUsername, setIsLoggedIn } = useAppSession();
  const [changed, setChange] = useState(true);

  function handleClick() {
    setTitleModal(true);
  }

  function updateTitle() {
    console.log("updated the title");
  }

  useEffect(() => {
    console.log("test");
  }, [changed]);

  if (isLoggedIn) {
    return (
      <>
        <div className="opacity-75 p-4 px-5 border-[2px] text-black bg-red-200 rounded-[10px]">
          <Label
            htmlFor="scenario-title"
            className="!text-3xl"
            onClick={handleClick}
          >
            Scenario Title
          </Label>
        </div>

        {showTitleModal && <ChangeTitleModal closeModal={() => updateTitle} />}
      </>
    );
  }
}

function ChangeTitleModal({ closeModal }: { closeModal: () => void }) {
  return (
    <div
      className="absolute top-20 z-10 flex justify-center items-center z-1 bg-black/50 "
      onClick={() => closeModal()}
      onBlur={() => closeModal()}
    >
      <Card
        className="min-w-[500px] h-fit rounded-3xl drop-shadow-[0_0_200px_rgba(0,0,0,1)] backdrop-blur-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader>
          <CardTitle>Change Title</CardTitle>
          <CardDescription>Change the damn title.</CardDescription>
        </CardHeader>

        <CardContent>
          <Input placeholder="Scenario Title" value="scenario" />
        </CardContent>
      </Card>
    </div>
  );
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
