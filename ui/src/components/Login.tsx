// @ts-nocheck

import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
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
import { AppContext } from "../main";

const PROXIED_URL = "/api/user_table";
const LOCALHOST_URL = "http://localhost:8080/api/user_table";

export function Login({ isVisible, closeModal }) {
  const [accountStage, setAccountStage] = useState("login");
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { setUsername, setIsLoggedIn } = useContext(AppContext);

  const modalRef = useRef(null);

  function LoginForm({ swapView, ...props }: React.ComponentProps<"div">) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
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
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    return (
      <div className={cn("flex flex-col gap-6")} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your username and password below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
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
                <div className="mt-8 flex justify-evenly gap-8">
                  <Button type="submit" disabled={isLoading}>
                    Log-In
                  </Button>
                  <Button onClick={swapView}>Create Account</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  function CreateAccountForm({ swapView }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!username || !password) {
        let missing = [];

        if (!username) missing = [missing.concat(["username"]).join(", ")];

        if (!password) missing = [missing.concat(["password"]).join(", ")];

        alert(`Cannot log in. You are missing: ${missing}`);
      } else {
        // Try to login
        try {
          let payload = JSON.stringify({
            username: username,
            password: password,
          });

          console.log(payload);

          setIsLoading(true);
          setData(
            await fetch(`${LOCALHOST_URL}/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: payload,
              credentials: "include",
            }).then((res) => res.json())
          );
        } catch (err) {
          setError(err.message);
        } finally {
          navigate(`${PROXIED_URL}`);
          setIsLoading(false);
        }
      }
    };
    return (
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Fill in the form.</CardDescription>
          </CardHeader>
          {error && <p>Invalid Credentials!</p>}
          <form
            className="flex flex-col w-full justify-center items-center gap-4 "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  className="border border-[#dad9d9] rounded-lg p-1 pl-2 pr-2 focus:outline-[#acc9eb] focus:outline-4 focus:border-[#72A1D7] focus:border-2"
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
                  autoComplete="new-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
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
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-3 cursor-pointer">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
          <CardContent />
        </Card>
      </div>
    );
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-1 bg-black/50"
      onClick={closeModal}
    >
      <div
        ref={modalRef}
        className="bg-white min-w-[500px] h-fit rounded-3xl drop-shadow-[0_0_200px_rgba(0,0,0,1)] flex flex-col justify-center items-center p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="font-bold text-2xl gap-2 mb-6">
          {accountStage === "login" ? "Login" : "Create an Account"}
        </h1>
        {accountStage === "login" && (
          <LoginForm
            swapView={(e) => {
              e.preventDefault();
              setAccountStage("create");
            }}
          />
        )}
        {accountStage !== "login" && (
          <CreateAccountForm
            swapView={(e) => {
              e.preventDefault();
              setAccountStage("login");
            }}
          />
        )}
      </div>
    </div>
  );
}