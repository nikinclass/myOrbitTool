// @ts-nocheck
import express from "express";
import exampleRoute from "./routes/example";
import cookieSession from "cookie-session";
import czmlConverter from './czmlConverter.ts';

require('dotenv').config()
var myUsername = process.env.SPACETRACK_USERNAME || "USERNAME NOT LOADING"
var myPassword = process.env.SPACETRACK_PASSWORD || "PASSWORD NOT LOADING"
const knex = require("knex")(
  require("./knexfile.ts")[process.env.NODE_ENV || "development"]
);
var testData = ["1 25544U 98067A   25252.19474949  .00008866  00000-0  16199-3 0  9990", "2 25544  51.6325 250.6930 0004281 318.3144  41.7518 15.50201228528195"]


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
      console.log(response)
      console.log(response.status)
      return response.headers.getSetCookie()
    })
    .then((cookies) => {
      console.log(cookies[0].split(';')[0])
      fetch(`https://www.space-track.org/basicspacedata/query/class/gp/MEAN_MOTION/-100--100/format/json`, {
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
              let length = data.length;
              for (var item in data) {
                console.log(`Adding ${item} of ${length} to database`);
                knex('space_track')
                  .insert(data[item])
                  .catch((err) => {
                    console.log(err)
                  })
              }
            })
            .then(() => {
              console.log("Database Updated!")
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

var testReturn = czmlConverter("ISS (Zarya)", testData);

// FORCES A REFRESH OF THE SPACE-TRACK DB

app.get('/api/refresh', (req, res) => {
  refreshSpaceTrack(myUsername, myPassword)
  res.status(200)
});

// RETURNS THE CZML FOR A TLE

app.get('/api/czml/:SATNO', (req, res) => {
  var SATNO = req.params.SATNO;
  if (SATNO == "???") {
    // USE TLE OR STUFF FROM BODY
  } else {
    knex('space_track')
      .select("OBJECT_NAME", "TLE_LINE1", "TLE_LINE2")
      .where("NORAD_CAT_ID", "=", SATNO)
      .then((sat) => {
        console.log(sat);
        var czml = czmlConverter(sat[0]["OBJECT_NAME"], [sat[0]["TLE_LINE1"], sat[0]["TLE_LINE2"]])
        res.status(200).json(czml);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      })
  }
})

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
