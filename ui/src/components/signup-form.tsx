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
  // const [user, setUser] = useState("");
  // const [hashedPassword, setHashedPassword] = useState('');
  const navigate = useNavigate();

  function handleSignUp() {
    navigate("/signup");
  }

  async function handleSubmit() {
    if (!username || !password) {
      alert("Please fill out all fields");
      return;
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const userToAdd = {
        username: username,
        password: hashedPassword,
      };

      const res = await fetch(`${LOCALHOST_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToAdd),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      alert("User registered successfull");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.message || "Error signing up");
    }
  }
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
