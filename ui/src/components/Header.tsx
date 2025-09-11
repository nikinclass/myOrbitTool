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
              await fetch(`${PROXIED_URL}/logout`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              });
            } catch (err) {
              console.log(err.message);
            }
            alert("Successful logout.");
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
