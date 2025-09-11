// @ts-nocheck

import { useEffect, useContext, useState } from "react";
import bcrypt from "bcryptjs";
import { AppContext } from "../main.tsx";
import type { AppContextType } from "../main.tsx";
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

const PROXIED_URL = "/api/user_table";
const LOCALHOST_URL = "http://localhost:8080/api/user_table";

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { username, setUsername, isLoggedIn, setIsLoggedIn } = useContext(
    AppContext
  ) as AppContextType;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp() {
    navigate("/signup");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If missing details, fail
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

        setIsLoading(true);
        const res = await fetch("/api/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: payload,
        });

        if (!res.ok) {
          throw new Error("Server error");
        }

        const userDat = await fetch("/api/users/me", {
          method: "GET",
          credentials: "include",
        });

        if (!userDat.ok) throw new Error(userDat.error);

        const json = await userDat.json();
        setAuthUser(json);
        navigate("/dashboard");
        closeModal();
      } catch (err) {
        setError(err.message);
        setAuthUser(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign up an account</CardTitle>
          <CardDescription>
            Enter your username and password below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={() => handleSignUp()}>Sign Up</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
