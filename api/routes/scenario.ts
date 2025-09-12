import { Request, response, Response, Router } from "express";
import { body, checkSchema, validationResult } from "express-validator";
import satCzmlConverter from "../satCzmlConverter";
import siteCzmlConverter from "../siteCzmlConverter";
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
    .then((cookies) => {
      console.log(cookies[0].split(";")[0]);
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
        toJSON(response.body)
          .then((data) => {
            let length = data.length;
            for (var item in data) {
              console.log(`Adding ${item} of ${length} to database`);
              knex("space_track")
                .insert(data[item])
                .catch((err: unknown) => {
                  console.log(err);
                });
            }
          })
          .then(() => {
            console.log("Database Updated!");
          });
      });
    })
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
    return read(); // read the next chunk
  }
  return read();
}

// FORCES A REFRESH OF THE SPACE-TRACK DB

router.get("/refresh", (req, res) => {
  refreshSpaceTrack(myUsername, myPassword);
  res.status(200);
});

router.post("/site", (req, res) => {
  var site = req.body
  var czml = siteCzmlConverter(
    site["OBJECT_NAME"], [
    site["LAT"],
    site["LONG"],
    site["ALT"],
  ]
  )
  res.status(200).json(czml)
})

// RETURNS THE CZML FOR A TLE

router.post("/czml", (req, res) => {
  var sat = req.body
  var czml = satCzmlConverter(
    sat["OBJECT_NAME"], [
    sat["TLE_LINE1"],
    sat["TLE_LINE2"],
  ]);
  res.status(200).json(czml)
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
