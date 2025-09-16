import { useState } from "react";
import { Button } from "./ui/button";
import { LoginModal } from "./LoginModal";
import { useNavigate } from "react-router-dom";
import { useAppSession } from "./AppSessionProvider";

export function LoginButton() {
  const [showLoginModal, setLoginModal] = useState(false);
  const { isLoggedIn, setUser, user } = useAppSession();

  const navigate = useNavigate();
  if (!isLoggedIn) {
    return (
      <>
        <Button
          onClick={() => {
            setLoginModal(true);
          }}
        >
          Login
        </Button>
        {showLoginModal && (
          <LoginModal closeModal={() => setLoginModal(false)} />
        )}
      </>
    );
  }

  return (
    <>
      {
        <Button
          className=""
          onClick={async () => {
            try {
              const res = await fetch("/api/sessions", {
                method: "DELETE",
                credentials: "include",
              });

              if (res.ok) {
                localStorage.removeItem("user");
                setUser(undefined);
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
      }
      {showLoginModal && <LoginModal closeModal={() => setLoginModal(false)} />}
    </>
  );
}
