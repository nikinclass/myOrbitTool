import { Router } from "express";
const router = Router();

// POST api/scenario
router.post("/", async (req, res) => {
  //this will make a new scenario
  const id = 10;

  //return scenario id
  res.status(200).json({ id: id });
});

export = router;
