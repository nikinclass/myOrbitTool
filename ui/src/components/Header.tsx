// @ts-nocheck
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Login } from "./Login";
import { Button } from "./ui/button";
import { AppContext } from "../main";

import { ModeToggle } from "../components/mode-toggle"

export const Header = () => {
  const [showLoginModal, setLoginModal] = useState(false);
  const { username, isLoggedIn, setUsername, setIsLoggedIn } =
    useContext(AppContext);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between">
          <ModeToggle />
          {!isLoggedIn ? (
            <Button onClick={() => setLoginModal(true)}>Login</Button>
          ) : (
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
          )}
        {showLoginModal && (
          <Login
            isVisible={showLoginModal}
            closeModal={() => setLoginModal(false)}
          />
        )}
      </div>
    </>
  );
};