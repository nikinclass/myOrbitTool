// @ts-nocheck

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!firstName || !lastName || !username || !password) {
      alert("Please fill out all fields");
      return;
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const userToAdd = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: hashedPassword,
      };

      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToAdd),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      alert("User registered successfull");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message || "Error signing up");
    }
  }

  return (
    <div className="signup-page bg-white dark:bg-gray-800 rounded-lg px-6 py-8 shadow-xl ring ring-gray-900/5 mt-50">
      <h1 className="text-xl mb-4">Sign Up</h1>
      <input
        className="border rounded-sm mb-2 w-full px-2 py-1"
        type="text"
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        className="border rounded-sm mb-2 w-full px-2 py-1"
        type="text"
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        className="border rounded-sm mb-2 w-full px-2 py-1"
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border rounded-sm mb-4 w-full px-2 py-1"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all"
        onClick={handleSubmit}
      >
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
