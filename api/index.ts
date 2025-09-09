import express from "express";
import exampleRoute from "./routes/example";
import userTableRoute from "./routes/userTable";
import cookieSession from "cookie-session";
import cors from "cors";

const app = express();
const port = 8080;
app.set("trust proxy", 1);

app.use(cors());

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

app.use("/api/user_table", userTableRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
