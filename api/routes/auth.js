const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);

const SALT_ROUNDS = 12;

// Log-In: POST api/sessions/
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username) return res.status(400).json({ error: "Missing username" });
    if (!password) return res.status(400).json({ error: "Missing password" });

    const user = await knex("users")
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
    res.status(500).json({ error: "Internal server error" });
  }
});

// Log-Out: DELETE api/sessions/
router.delete("/", (req, res) => {
  console.log(req.session);
  req.session = null;
  res.sendStatus(200);
});

function isAuthorized(req, res) {
  return req.session && req.session.id;
}

module.exports = { router, isAuthorized };
