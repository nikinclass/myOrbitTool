// @ts-nocheck
import express from "express";
import exampleRoute from "./routes/example";
import scenarioRoute from "./routes/scenario";
import cookieSession from "cookie-session";
import cors from "cors";
import czmlConverter from "./czmlConverter.ts";
import userRoutes from "./routes/users";

require("dotenv").config();
var myUsername = process.env.SPACETRACK_USERNAME || "USERNAME NOT LOADING";
var myPassword = process.env.SPACETRACK_PASSWORD || "PASSWORD NOT LOADING";
const knex = require("knex")(
  require("./knexfile.ts")[process.env.NODE_ENV || "development"]
);
var testData = [
  "1 25544U 98067A   25252.19474949  .00008866  00000-0  16199-3 0  9990",
  "2 25544  51.6325 250.6930 0004281 318.3144  41.7518 15.50201228528195",
];

const app = express();
const port = 8080;
app.set("trust proxy", 1);

app.use(cors());

async function refreshSpaceTrack(username: string, password: string) {
  await fetch("https://www.space-track.org/ajaxauth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      identity: username,
      password: password,
    }),
  })
    .then((response) => {
      return response.headers.getSetCookie();
    })
    .then((cookies) => {
      console.log(cookies[0].split(";")[0]);
      fetch(
        `https://www.space-track.org/basicspacedata/query/class/gp/MEAN_MOTION/-100--100/format/json`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: cookies[0].split(";")[0],
          },
        }
      ).then((response) => {
        toJSON(response.body)
          .then((data) => {
            let length = data.length;
            for (var item in data) {
              console.log(`Adding ${item} of ${length} to database`);
              knex("space_track")
                .insert(data[item])
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .then(() => {
            console.log("Database Updated!");
          });
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(400);
    });
}

async function toJSON(body: ReadableStream) {
  const reader = body.getReader(); // `ReadableStreamDefaultReader`
  const decoder = new TextDecoder();
  const chunks: string[] = [];
  async function read() {
    const { done, value } = await reader.read();
    // all chunks have been read?
    if (done) {
      return JSON.parse(chunks.join(""));
    }
    const chunk = decoder.decode(value, { stream: true });
    chunks.push(chunk);
    return read(); // read the next chunk
  }
  return read();
}

var testReturn = czmlConverter("ISS (Zarya)", testData);

// FORCES A REFRESH OF THE SPACE-TRACK DB

app.get("/api/refresh", (req, res) => {
  refreshSpaceTrack(myUsername, myPassword);
  res.status(200);
});

// RETURNS THE CZML FOR A TLE

app.get("/api/czml/:SATNO", (req, res) => {
  var SATNO = req.params.SATNO;
  if (SATNO == "???") {
    // USE TLE OR STUFF FROM BODY
  } else {
    knex("space_track")
      .select("OBJECT_NAME", "TLE_LINE1", "TLE_LINE2")
      .where("NORAD_CAT_ID", "=", SATNO)
      .then((sat) => {
        console.log(sat);
        var czml = czmlConverter(sat[0]["OBJECT_NAME"], [
          sat[0]["TLE_LINE1"],
          sat[0]["TLE_LINE2"],
        ]);
        res.status(200).json(czml);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }
});

// refreshSpaceTrack(myUsername, myPassword);

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
app.use("/api/scenario", scenarioRoute);

app.use("/api/user_table", userRoutes);

app.get("/api/user_table/:username", async (req, res) => {
  const queriedUsername = req.params.username;

  if (queriedUsername) {
    const crap = await knex("user_table")
      .select("*")
      .where("username", "=", `${queriedUsername}`);

    res.status(200).json(crap);
  } else {
    res.status(400).send("Need a username.");
  }
});

// app.post("/api/user_table", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const existingUser = await knex("user_table")
//       .where("username", username)
//       .first();
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const inserted = await knex("user_table").insert({
//       username,
//       password,
//     });

//     return res.status(201).json({
//       message: "User created successfully",
//       userId: inserted[0],
//     });
//   } catch (err) {
//     console.error("Database insert error:", err);
//     return res.status(500).json({ message: "Database error", error: err });
//   }
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
