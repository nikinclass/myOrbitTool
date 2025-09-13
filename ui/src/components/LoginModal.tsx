import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { AppContext, type AppState } from "../main";

const PROXIED_URL = "/api/user_table";
const LOCALHOST_URL = "http://localhost:8080/api/user_table";

export function LoginModal({ closeModal }: { closeModal: () => void }) {
  const [accountStage, setAccountStage] = useState<"login" | "create">("login");
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setIsLoggedIn } = useContext<AppState>(AppContext);

  const modalRef = useRef(null);

  function LoginForm({ swapView }: { swapView: () => void }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginSubmit = async (e: any) => {
      e.preventDefault();
      // If missing details, fail
      if (!username || !password) {
        if (!username) alert("You must include username.");
        if (!password) alert("You must include password.");
      } else {
        // Try to login
        try {
          let payload = JSON.stringify({
            username: username,
            password: password,
          });

          setIsLoading(true);
          const res = await fetch(`${PROXIED_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: payload,
            credentials: "include",
          });

          if (!res.ok) {
            console.log(`res error`);
            throw new Error("Server error");
          }

          localStorage.setItem("user", JSON.stringify({ username }));
          setUsername(username);
          setIsLoggedIn(true);

          closeModal();
        } catch (err: any) {
          setError(err?.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    return (
      <form onSubmit={handleLoginSubmit}>
        <div className="flex flex-col gap-6 w-full">
          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
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
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div
            className="w-fit self-end cursor-pointer"
            onClick={() => swapView()}
          >
            <span>Don't have an account?</span>{" "}
            <span className="italic hover:text-primary/75">Create Account</span>
          </div>
          <Button type="submit" disabled={isLoading}>
            Log-In
          </Button>
        </div>
      </form>
    );
  }

  function CreateAccountForm({ swapView }: { swapView: () => void }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      if (!username || !password) {
        let missing: string[] = [];

        if (!username) missing = [missing.concat(["username"]).join(", ")];

        if (!password) missing = [missing.concat(["password"]).join(", ")];

        setError(`Cannot create account. You are missing: ${missing}`);
      } else {
        // Try to login
        try {
          let payload = JSON.stringify({
            username: username,
            password: password,
          });
          setIsLoading(true);

          const res = await fetch(`${LOCALHOST_URL}/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: payload,
          });

          if (!res.ok) throw new Error("Failed to create account");
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    return (
      <>
        {error && <p className="text-destructive text-center pb-3">{error}</p>}
        <form
          className="flex flex-col w-full justify-center items-center gap-4 "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                className="border border-[#dad9d9] rounded-lg p-1 pl-2 pr-2 focus:outline-[#acc9eb] focus:outline-4 focus:border-[#72A1D7] focus:border-2"
                name="username"
                id="username"
                autoFocus
                autoComplete="username"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setError("");
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                name="confirm-password"
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                value={confirmPassword}
                onChange={(e) => {
                  setError("");
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>

            <div
              className="w-fit self-end cursor-pointer"
              onClick={() => swapView()}
            >
              <span>Already have an account?</span>{" "}
              <span className="italic hover:text-primary/75">Login</span>
            </div>

            <div className="flex flex-col gap-3 cursor-pointer">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </>
    );
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-1 bg-black/50"
      onClick={() => closeModal()}
    >
      <Card
        className="min-w-[500px] h-fit rounded-3xl drop-shadow-[0_0_200px_rgba(0,0,0,1)]"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader>
          <CardTitle>
            {accountStage === "login"
              ? "Login to your account"
              : "Create an Account"}
          </CardTitle>
          <CardDescription>
            {accountStage === "login"
              ? "Enter your username and password below to login to your account"
              : "Enter a username and password to start using myOrbitTool"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {accountStage === "login" && (
            <LoginForm
              swapView={() => {
                setAccountStage("create");
              }}
            />
          )}
          {accountStage !== "login" && (
            <CreateAccountForm
              swapView={() => {
                setAccountStage("login");
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
