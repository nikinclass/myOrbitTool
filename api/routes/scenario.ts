import { Request, Response, Router } from "express";
import { body, checkSchema, validationResult } from "express-validator";
// import { body } from "express-validator";
const router = Router();

// POST api/scenario
router.post("/", async (req: Request, res: Response) => {
  //this will make a new scenario
  const id = 10;

  //return scenario id
  res.status(200).json({ id: id });
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
      return res.send(200);
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

router.post(
  "/station",
  createStationChain(),
  async (req: Request, res: Response) => {
    //this will make a new station
    const result = validationResult(req);
    if (result.isEmpty()) {
      return res.send(200);
    }
    res.status(400).json({ errors: result.array() });
  }
);

export = router;
