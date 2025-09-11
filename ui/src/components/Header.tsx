// @ts-nocheck

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Login } from "./Login";
import LogoutButton from "../components/Logout";
import { Button } from "./ui/button";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  const [showLoginModal, setLoginModal] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="h-fit">
      <div className="flex justify-between items-center p-2 pl-4 pr-4 border-b-2 border-foreground-light">
        <Button
          onClick={() => {
            setLoginModal(true);
          }}
        >
          Login
        </Button>

        <Button
          onClick={async () => {
            try {
              await fetch("/api/sessions", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              });
            } catch (err) {
              console.log(err.message);
            }
          }}
        >
          Logout
        </Button>
      </div>
      {showLoginModal && (
        <Login
          isVisible={showLoginModal}
          closeModal={() => {
            setLoginModal(false);
          }}
        />
      )}
    </div>
  );
};
