// @ts-nocheck
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../main";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const { username, isLoggedIn, setUsername, setIsLoggedIn } =
    useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="h-fit">
      <div className="flex justify-between items-center p-2 pl-4 pr-4 border-b-2 border-foreground-light">
        {!isLoggedIn ? (
          <span className="text-sm italic">Not logged in</span>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm">
              <strong>{username}</strong>
            </span>
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
                    console.log("Logout failed", res.status);
                  }
                } catch (err) {
                  console.log(err.message);
                }
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}