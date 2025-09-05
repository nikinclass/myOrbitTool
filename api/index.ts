import express from "express";
import exampleRoute from "./routes/example";
import cookieSession from "cookie-session";

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
