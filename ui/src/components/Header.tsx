// @ts-nocheck

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Login } from "./Login";
import LogoutButton from "../components/Logout";
import { Button } from "./ui/button";

type HeaderProps = {
  className?: string;
};

const PROXIED_URL = "/api/user_table";
const LOCALHOST_URL = "http://localhost:8080/api/user_table";

export const Header = ({ className }: HeaderProps) => {
  const [showLoginModal, setLoginModal] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="h-fit flex absolute z-2 w-full bg-white justify-evenly border p-2 ${className ?? ""}">
      <div className="flex justify-between items-center p-2 pl-4 pr-4 border-b-2 border-foreground-light">
        <img src="/space.png" className="p-0 h-15"/>
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
              const res = await fetch("/api/sessions", {
                method: "DELETE",
                credentials: "include",
              });

              if (!res.ok) {
                console.log("Logout failed.", res.status);
                return;
              }

              setUsername(null);
              setIsLoggedIn(false);
              navigate("/");
            } catch (err) {
              console.log(`Logout onClick error: ${err}`);
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
