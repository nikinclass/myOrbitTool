// @ts-nocheck

import bcrypt from "bcryptjs";
import { appendFile } from "fs";
const express = require("express");
const router = express.Router();

const knex = require("knex")(
  require("../knexfile")[process.env.NODE_ENV || "development"]
);

const SALT_ROUNDS = 12;

// router.get("/me", async (req, res) => {
//   console.log(req.session);
//   if (!req.session || !req.session.id) {
//     return res.status(401).json({ error: "Unauthorized request" });
//   }

//   const payload = await knex("user_table")
//     .select("*")
//     .where("id", "=", req.session.id)
//     .first();

//   res.status(200).json(payload);
// });

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username) return res.status(400).json({ error: "Missing username" });
    if (!password) return res.status(400).json({ error: "Missing password" });

    const user = await knex("user_table")
      .select("id", "password")
      .where("username", "=", username)
      .first();

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const successful = await bcrypt.compare(password, user.password);
    if (!successful)
      return res.status(401).json({ error: "Invalid credentials" });

    req.session.id = user.id;
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username) return res.status(400).json({ error: "Missing username" });
    if (!password) return res.status(400).json({ error: "Missing password" });

    const id = await knex("user_table")
      .insert({ username, password: await bcrypt.hash(password, 12) })
      .returning("id");

    req.session.id = id[0].id;
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to save user to database" });
  }
});

// Logout
// router.use("/logout", (req, res) => {
//   req.session = null;
// });

// const PROXIED_URL = "/api/scenario";
// const LOCALHOST_URL = "http://localhost:8080/api/scenario";

module.exports = router;
