import { Router } from "express";
const router = Router();
const knex = require("knex")(
  require("../knexfile.ts")[process.env.NODE_ENV || "development"]
);
import satCzmlConverter from "../satCzmlConverter";
import siteCzmlConverter from "../siteCzmlConverter";

// RETURNS THE CZML FOR A LATLONGALT POSITION

router.post("/siteczml", (req, res) => {
  var site = req.body;
  var czml = siteCzmlConverter(site);
  console.log(czml);
  res.status(200).json(czml);
});

// RETURNS THE CZML FOR A OMM SATELLITE

router.post("/satczml", (req, res) => {
  console.log(req.body);
  var sat = req.body;
  var czml = satCzmlConverter(sat);
  // console.log(czml)
  res.status(200).json(czml);
});

// GET api/satellites
router.get("/", async (req, res) => {
  const filter = req.query.filter;

  const payload = await knex("space_track")
    .select("id", "NORAD_CAT_ID", "OBJECT_NAME")
    .whereNull("DECAY_DATE")

    // @ts-ignore
    .andWhere((qB) =>
      qB
        .whereILike("NORAD_CAT_ID", `${filter}%`)
        .orWhereILike("OBJECT_NAME", `%${filter}%`)
    )
    .limit(10)
    .orderBy("NORAD_CAT_ID");
  res.json(payload);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const payload = await knex("space_track")
    .select("*")
    .where({ id: id })
    .limit(1);
  res.json(payload[0]);
});

export = router;
