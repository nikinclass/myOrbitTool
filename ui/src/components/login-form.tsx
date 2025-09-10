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

// export default function Login() {
//     const { username, setUsername, isLoggedIn, setIsLoggedIn } = useContext(
//         AppContext
//     ) as AppContextType;
//     const [password, setPassword] = useState("");
//     const [user, setUser] = useState("");
//     // const [hashedPassword, setHashedPassword] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log(`user: ${user}`);
//     }, [user]);

//     function handleSignUp() {
//         navigate("/signup");
//     }

//     async function handleSubmit() {
//         if (!username || !password) {
//             alert("Please enter username and password");
//         }
//         try {
//             const fetchData = await fetch(
//                 `http://localhost:8080/api/user_table/${username}`
//             )
//                 .then((res) => res.json())
//                 .then((data) => {
//                     bcrypt.compare(password, data[0].password, function (err, result) {
//                         if (err) {
//                             console.log("Error comparing passwords:", err);
//                         } else {
//                             console.log("Password match: ", result);
//                             if (!result) {
//                                 alert("incorect password");
//                             } else {
//                                 setIsLoggedIn(true);
//                                 //localStorage.setItem("user", JSON.stringify(data[0]));
//                                 document.cookie = `username=${username};path=/;max-age=3600;SameSite=Strict`;
//                                 navigate("/");
//                             }
//                         }
//                     });
//                 });
//         } catch (err) {
//             console.log(`Username not found.`, err);
//         }
//     }

const PROXIED_URL = "/api/user_table";
const LOCALHOST_URL = "http://localhost:8080/api/user_table";

export default function LoginForm({
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

  // useEffect(() => {
  //     console.log(`user: ${user}`);
  // }, [user]);

  function handleSignUp() {
    navigate("/signup");
  }

  async function handleSubmit() {
    if (!username || !password) {
      alert("Please enter username and password");
    }
    try {
      const fetchData = await fetch(`${LOCALHOST_URL}/${username}`)
        .then((res) => res.json())
        .then((data) => {
          bcrypt.compare(password, data[0].password, function (err, result) {
            if (err) {
              console.log("Error comparing passwords:", err);
            } else {
              console.log("Password match: ", result);
              if (!result) {
                alert("incorect password");
              } else {
                console.log("help");
                setIsLoggedIn(true);
                //localStorage.setItem("user", JSON.stringify(data[0]));
                document.cookie = `username=${username};path=/;max-age=3600;SameSite=Strict`;
                navigate("/");
              }
            }
          });
        });
    } catch (err) {
      console.log(`Username not found.`, err);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username and password below to login to your account
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
                <Button type="submit">Login</Button>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?
                </div>
                <Button onClick={() => handleSignUp()}>Sign Up</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
