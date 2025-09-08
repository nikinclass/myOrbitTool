import { Router } from "express";
const router = Router();

// GET api/example
router.get("/", async (req, res) => {
  res.status(200).json({ hello: "stuff" });
});


export = router;
