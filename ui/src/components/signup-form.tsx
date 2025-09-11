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
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleSignUp() {
    alert("Logged in successfully!");
    navigate("/");
  }

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
          await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: payload,
          }).then((res) => res.json())
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Fill in the form.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p>Invalid Credentials!</p>}
          <form onSubmit={handleSubmit}>
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

                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-3 cursor-pointer">
                <Button onClick={() => handleSignUp()}>Submit</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
