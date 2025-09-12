// @ts-nocheck
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Login } from "./Login";
import { Button } from "./ui/button";
import { AppContext } from "../main";

export const Header = () => {
  const [showLoginModal, setLoginModal] = useState(false);
  const { username, isLoggedIn, setUsername, setIsLoggedIn } =
    useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="h-fit">
      <div className="flex justify-between items-center p-2 pl-4 pr-4 border-b-2 border-foreground-light">
        {!isLoggedIn ? (
          <Button onClick={() => setLoginModal(true)}>Login</Button>
        ) : (
          <div className="flex items-center gap-3">
            {/* <span className="text-sm">
              Hello, <strong>{username}</strong>
            </span> */}
            <Button
              onClick={async () => {
                try {
                  const res = await fetch("/api/sessions", {
                    method: "DELETE",
                    credentials: "include",
                  });

                  if (res.ok) {
                    localStorage.removeItem("user");
                    setUsername("");
                    setIsLoggedIn(false);
                    navigate("/");
                  } else {
                    console.log("Logout failed.", res.status);
                  }
                } catch (err) {
                  console.log(`Logout onClick error: ${err}`);
                }
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>

      {showLoginModal && (
        <Login
          isVisible={showLoginModal}
          closeModal={() => setLoginModal(false)}
        />
      )}
    </div>
  );
};