// @ts-nocheck

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../main";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const { setUsername, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  function handleLogout() {
    alert("Logged out.");
    navigate("/");
  }

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
              }).then((res) => {
                if (res.ok) {
                  setAuthUser(null);
                }
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
}
