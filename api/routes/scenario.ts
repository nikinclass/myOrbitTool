import { Request, response, Response, Router } from "express";
import { body, checkSchema, validationResult } from "express-validator";
const knex = require("knex")(
  require("../knexfile.ts")[process.env.NODE_ENV || "development"]
);
// import { body } from "express-validator";
const router = Router();

// POST api/scenario
router.post("/", async (req: Request, res: Response) => {
  //this will make a new scenario
  try {
    const payload = await knex("scenarios").insert({}).returning("id");
    if (!payload && payload.length === 0) {
      throw new Error("No record found");
    }
    return res.status(200).json({ id: payload[0].id });
  } catch (err) {
    return res.status(500);
  }
  //   .catch((e: unknown) => {
  //     return e;
  //   });
  // if (!payload.hasOwnProperty("id")) {
  //   return res.status(500).json({ error: { ...payload } });
  // }
  //return scenario id
});
const createSatelliteChain = () => {
  return body(["tle_line0", "tle_line1", "tle_line2"])
    .notEmpty()
    .withMessage("TLE line cannot be empty!");
};

router.post(
  "/satellite",
  createSatelliteChain(),
  async (req: Request, res: Response) => {
    //this will make a new satellite
    const result = validationResult(req);
    if (result.isEmpty()) {
      const entity_id = await createEntityScenarioRecord(req.body.scenario_id);
      const { scenario_id, ...payload } = req.body;
      const response = await knex("satellites")
        .insert({ ...payload, id: entity_id })
        .returning("*");
      return res.status(200).json(response);
    }
    res.status(400).json({ errors: result.array() });
  }
);

const createStationChain = () => {
  return [
    body(["name"])
      .notEmpty()
      .withMessage("Ground station name cannot be empty!"),
    body("latitude")
      .isFloat()
      .withMessage("Latitude must be a floating point number"),
    body("longitude")
      .isFloat()
      .withMessage("Longitude must be a floating point number"),
    body("altitude")
      .isFloat()
      .withMessage("Altitude must be a floating point number"),
  ];
};

const createEntityScenarioRecord = async (scenario_id: number) => {
  try {
    const entity = (
      await knex("scenario_entities")
        .insert({ scenario_id: scenario_id })
        .returning("id")
    )[0];
    return entity.id ?? null;
  } catch (err) {
    return null;
  }
};

router.post(
  "/station",
  createStationChain(),
  async (req: Request, res: Response) => {
    //this will make a new station
    const result = validationResult(req);
    if (result.isEmpty()) {
      const entity_id = await createEntityScenarioRecord(req.body.scenario_id);
      const { scenario_id, ...payload } = req.body;
      const response = await knex("station")
        .insert({ ...payload, id: entity_id })
        .returning("*");
      return res.status(200).json(response);
    }
    res.status(400).json({ errors: result.array() });
  }
);

export = router;
