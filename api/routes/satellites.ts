import { Router } from "express";
const router = Router();
const knex = require("knex")(
  require("../knexfile.ts")[process.env.NODE_ENV || "development"]
);

// GET api/satellites
router.get("/", async (req, res) => {
  const filter = req.query.filter;

  console.log("Triggered with", filter);

  const payload = await knex("space_track")
    .select("id", "NORAD_CAT_ID", "OBJECT_NAME")
    .whereILike("NORAD_CAT_ID", `${filter}%`)
    .orWhereILike("OBJECT_NAME", `%${filter}%`)
    .limit(10)
    .orderBy("NORAD_CAT_ID");
  res.json(payload);
});

export = router;
