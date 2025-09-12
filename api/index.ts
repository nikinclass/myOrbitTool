// @ts-nocheck
import express from "express";
import exampleRoute from "./routes/example";
import scenarioRoute from "./routes/scenario";
import cookieSession from "cookie-session";
import cors from "cors";
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

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.set("trust proxy", 1);
app.use(express.json());

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

app.delete("/api/sessions", (req, res) => {
  req.session = null;
  return res.sendStatus(200);
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

// const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

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

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
