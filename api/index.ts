// @ts-nocheck
import express from "express";
import exampleRoute from "./routes/example";
import cookieSession from "cookie-session";
require('dotenv').config()
var myUsername = process.env.SPACETRACK_USERNAME || "username"
var myPassword = process.env.SPACETRACK_PASSWORD || "password"

console.log(myUsername)
console.log(myPassword)

const app = express();
const port = 8080;
app.set("trust proxy", 1);

// const cors = require("cors");
// app.use(
//   cors({
//     origin: "http://127.0.0.1:5173",
//     credentials: true,
//   })
// );

function refreshSpaceTrack(username: string, password: string) {
  fetch('https://www.space-track.org/ajaxauth/login', {
    method: "POST",
    credentials: "include",
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json',
    },

    body: JSON.stringify({
      identity: username,
      password: password
    })
  })
    .then((response) => {
      console.log(response.status)
      return response.headers.getSetCookie()
    })
    .then((cookies) => {
      console.log(cookies[0].split(';')[0])
      fetch(`https://www.space-track.org/basicspacedata/query/class/gp/NORAD_CAT_ID/0--1000/format/json`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json',
          "Cookie": cookies[0].split(';')[0]
        },
      })
        .then((response) => {
          toJSON(response.body)
            .then((data) => {
              console.log(data)
            })
        })
    })
}

async function toJSON(body: ReadableStream) {
  const reader = body.getReader(); // `ReadableStreamDefaultReader`
  const decoder = new TextDecoder();
  const chunks: string[] = [];
  async function read() {
    const { done, value } = await reader.read();
    // all chunks have been read?
    if (done) {
      return JSON.parse(chunks.join(''));
    }
    const chunk = decoder.decode(value, { stream: true });
    chunks.push(chunk);
    return read(); // read the next chunk
  }
  return read();
}


refreshSpaceTrack(myUsername, myPassword)

// async function fetchWithHeaders(url: string): Promise<Response> {
//   const headers = new Headers();
//   headers.set('Content-Type', 'application/json');
//   const requestOptions = {
//     method: 'GET',
//     headers: headers
//   };

//   const response = await fetch(url, requestOptions);
//   if (!response.ok) {
//     throw new Error('The server resoundingly rebuked our headers: ' + response.statusText);
//   }
//   return response;
// }

app.use(express.json());

// const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY ?? ""],
    secure: false, // true for prod
    httpOnly: true,
    // path: "foo/bar",
    // expires: expiryDate,
    sameSite: "lax",
  })
);

app.use("/api/example", exampleRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
