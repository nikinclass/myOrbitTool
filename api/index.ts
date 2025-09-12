// @ts-nocheck
import express from "express";
import exampleRoute from "./routes/example";
import scenarioRoute from "./routes/scenario";
import cookieSession from "cookie-session";
import cors from "cors";
import userTableRoute from "./routes/userTable";
import cookieSession from "cookie-session";
import czmlConverter from "./satCzmlConverter";
import cors from "cors";

require("dotenv").config();

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
// app.use(
//   cors({
//     origin: "http://127.0.0.1:5173",
//     credentials: true,
//   })
// );
//remove if using proxied server

// app.use(cors());



var testReturn = czmlConverter("ISS (Zarya)", testData);

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
app.use("/api/user_table", userTableRoute);

app.get("/api/user_table/:username", async (req, res) => {
  const queriedUsername = req.params.username;

  if (queriedUsername) {
    const crap = await knex("user_table")
      .select("*")
      .where("username", "=", `${queriedUsername}`);

    res.status(200).json(crap);
  } else {
    res.status(400).send("Need a username dumbass.");
  }
});

app.post("/api/user_table", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existingUser = await knex("user_table")
      .where("username", username)
      .first();
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const inserted = await knex("user_table").insert({
      username,
      password,
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: inserted[0],
    });
  } catch (err) {
    console.error("Database insert error:", err);
    return res.status(500).json({ message: "Database error", error: err });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
