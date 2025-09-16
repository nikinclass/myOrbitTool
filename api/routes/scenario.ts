import { Request, response, Response, Router } from "express";
import { body, checkSchema, validationResult } from "express-validator";
import satCzmlConverter from "../satCzmlConverter";
import siteCzmlConverter from "../siteCzmlConverter";
import { Satellite } from "../types";
const knex = require("knex")(
  require("../knexfile.ts")[process.env.NODE_ENV || "development"]
);

var myUsername = process.env.SPACETRACK_USERNAME || "USERNAME NOT LOADING";
var myPassword = process.env.SPACETRACK_PASSWORD || "PASSWORD NOT LOADING";

const router = Router();

// POST api/scenario
router.post("/", async (req: Request, res: Response) => {
  //this will make a new scenario
  try {
    const payload = await knex("scenarios").insert(req.body).returning("id");
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

router.get("/:id", async (req: Request, res: Response) => {
  try {
    // Get all scenario info
    const scenario_data = await knex("scenarios")
      .select("*")
      .where({ id: req.params.id })
      .first();

    if (!scenario_data) return res.send(400);

    // Get all satellites
    const satellites = await knex("satellites")
      .select("*")
      .join("scenario_entities", { "scenario_entities.id": "satellites.id" })
      .where({ scenario_id: req.params.id });

    // Get all sites
    const sites = await knex("stations")
      .select("*")
      .join("scenario_entities", {
        "scenario_entities.id": "stations.id",
      })
      .where({ scenario_id: req.params.id });

    res.json({
      scenario: scenario_data,
      scenarioSats: satellites,
      scenarioSites: sites,
    });
  } catch (error: unknown) {
    console.error(error);
    res.send(500);
  }
});

router.patch("/:id/title", async (req: Request, res: Response) => {
  try {
    const { owner_id, ...payload } = req.body;

    // Get owner of scenario
    const scenario = await knex("scenarios")
      .select("*")
      .where({ id: req.params.id })
      .first();

    if (!owner_id || scenario.owner_id !== owner_id) {
      return res.send(401);
    }

    await knex("scenarios")
      .update({ ...payload })
      .where({ id: req.params.id });

    res.send(200);
  } catch (e: any) {
    res.send(500);
  }
});

router.patch("/:id/description", async (req: Request, res: Response) => {
  try {
    const { owner_id, ...payload } = req.body;

    // Get owner of scenario
    const scenario = await knex("scenarios")
      .select("*")
      .where({ id: req.params.id })
      .first();

    if (!owner_id || scenario.owner_id !== owner_id) {
      return res.send(401);
    }

    await knex("scenarios")
      .update({ ...payload })
      .where({ id: req.params.id });

    res.send(200);
  } catch (e: any) {
    res.send(500);
  }
});

async function refreshSpaceTrack(username: string, password: string) {
  await fetch("https://www.space-track.org/ajaxauth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      identity: username,
      password: password,
    }),
  })
    .then((response) => {
      // console.log(response);
      // console.log(response.status);
      return response.headers.getSetCookie();
    })
    .then(async (cookies) => {
      await knex("space_track").del();
      console.log("Updating Space-Track Database!");
      fetch(
        `https://www.space-track.org/basicspacedata/query/class/gp/MEAN_MOTION/-100--100/format/json`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: cookies[0].split(";")[0],
          },
        }
      ).then((response) => {
        return toJSON(response.body)
          .then((data) => {
            let length = data.length;
            return knex
              .batchInsert("space_track", data, 100)
              .catch((err: unknown) => {
                console.log(err);
              });
            // for (var item in data) {
            //   console.log(`Adding ${item} of ${length} to database`);
            //   await knex("space_track")
            //     .insert(data[item])
            //     .catch((err: unknown) => {
            //       console.log(err);
            //     });
            // }
          })
          .then(() => {
            console.log("Database Updated!");
          });
      });
    });
}

async function toJSON(body: ReadableStream | null) {
  if (body == null) {
    return null;
  }
  const reader = body.getReader(); // `ReadableStreamDefaultReader`
  const decoder = new TextDecoder();
  const chunks: string[] = [];
  async function read() {
    const { done, value } = await reader.read();
    // all chunks have been read?
    if (done) {
      return JSON.parse(chunks.join(""));
    }
    const chunk = decoder.decode(value, { stream: true });
    chunks.push(chunk);
    return await read(); // read the next chunk
  }
  return await read();
}

refreshSpaceTrack(myUsername, myPassword);

// FORCES A REFRESH OF THE SPACE-TRACK DB

router.get("/refresh", (req, res) => {
  refreshSpaceTrack(myUsername, myPassword);
  res.status(200);
});

router.post("/siteczml", (req, res) => {
  var czml = siteCzmlConverter(req.body);
  res.status(200).json(czml);
});

// RETURNS THE CZML FOR A TLE

router.post("/satczml", (req, res) => {
  var sat = req.body;
  // console.log(sat);
  var czml = satCzmlConverter(sat);
  res.status(200).json(czml);
});

const createSatelliteChain = () => {
  return body(["OBJECT_NAME", "TLE_LINE1", "TLE_LINE2"])
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
      const {
        scenario_id,
        CCSDS_OMM_VERS,
        COMMENT,
        CREATION_DATE,
        ORIGINATOR,
        CENTER_NAME,
        REF_FRAME,
        TIME_SYSTEM,
        MEAN_ELEMENT_THEORY,
        SEMIMAJOR_AXIS,
        PERIOD,
        APOAPSIS,
        PERIAPSIS,
        OBJECT_TYPE,
        RCS_SIZE,
        COUNTRY_CODE,
        LAUNCH_DATE,
        SITE,
        DECAY_DATE,
        FILE,
        GP_ID,
        TLE_LINE0,
        TLE_LINE1,
        TLE_LINE2,
        created_at,
        updated_at,
        VISIBLE,
        ...payload
      } = req.body;

      await knex("satellites")
        .insert({ ...payload, id: entity_id } as Satellite)
        .returning("*");
      return res.sendStatus(200);
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

// SCENARIO TITLE EDIT
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const scenario = await knex("scenarios").where({ id }).first();
    if (!scenario) return res.status(404).json({ error: "Scenario not found" });
    return res.json(scenario);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error on scenario title edit" });
  }
});

export = router;
