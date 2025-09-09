import { Router } from "express";
const router = Router();
const knex = require("knex")(
  require("../knexfile.ts")[process.env.NODE_ENV || "development"]
);

router.get("/", async (req, res) => {
  try {
    const stuff = await knex("user_table").select("*");
    res.json(stuff);
  } catch (err) {
    console.error("YOU FUCKED UP");
  }
});

export = router;
