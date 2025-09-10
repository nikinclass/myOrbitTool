// // @ts-nocheck

// // import { useEffect, useContext, useState } from "react";
// // import bcrypt from "bcryptjs";
// // import { AppContext } from "../main.tsx";
// // import type { AppContextType } from "../main.tsx";
// // import { useNavigate } from "react-router-dom";
// import { LoginForm } from "../components/login-form"; 
// export default function Login(){
//   return <LoginForm />
// }
// export default function Login() {
//   const { username, setUsername, isLoggedIn, setIsLoggedIn } = useContext(
//     AppContext
//   ) as AppContextType;
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState("");
//   // const [hashedPassword, setHashedPassword] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log(`user: ${user}`);
//   }, [user]);

//   function handleSignUp() {
//     navigate("/signup");
//   }

//   async function handleSubmit() {
//     if (!username || !password) {
//       alert("Please enter username and password");
//     }
//     try {
//       const fetchData = await fetch(
//         `http://localhost:8080/api/user_table/${username}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           bcrypt.compare(password, data[0].password, function (err, result) {
//             if (err) {
//               console.log("Error comparing passwords:", err);
//             } else {
//               console.log("Password match: ", result);
//               if (!result) {
//                 alert("incorect password");
//               } else {
//                 setIsLoggedIn(true);
//                 //localStorage.setItem("user", JSON.stringify(data[0]));
//                 document.cookie = `username=${username};path=/;max-age=3600;SameSite=Strict`;
//                 navigate("/");
//               }
//             }
//           });
//         });
//     } catch (err) {
//       console.log(`Username not found.`, err);
//     }

//     return;
//   }

//   function handleAllItems() {
//     navigate("/");
//   }
//   return (
//     <>
//       <div>
//         <h1>Inventory Manager</h1>
//       </div>
//       <div>
//         <h3>Login:</h3>
//         <input
//           className="bg-gray-200 mr-10 mb-2"
//           type="text"
//           name="username"
//           placeholder=" Enter Username "
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         ></input>
//         <input
//           className="bg-gray-200"
//           type="password"
//           name="password"
//           value={password}
//           placeholder=" Enter Password "
//           onChange={(e) => setPassword(e.target.value)}
//         ></input>
//         <div>
//           <button
//             className="bg-white rounded-[4px] w-[80px] mr-5"
//             onClick={() => handleSubmit()}
//           >
//             Sign in
//           </button>

//           <button
//             className="bg-white rounded-[4px] w-[80px] mr-5"
//             onClick={() => handleSignUp()}
//           >
//             Sign up
//           </button>
          
//           <button
//             className="bg-white rounded-[4px] w-[150px] mr-5"
//             onClick={() => handleAllItems()}
//           >
//             Browse all Items
//           </button>
//         </div>
//       </div>
//       <LoginForm />

//     </>
// }

