import { Request, Response, Router } from "express";
import BatteryModel from "../models/battery";

const router = Router();

// Create a new battery
router.post("/", async (req: Request, res: Response) => {
  try {
    const battery = new BatteryModel(req.body);
    await battery.save();
    res.status(201).json(battery);
  } catch (error) {
    res.status(500).json({ error: "Failed to create battery" });
  }
});

// Get a battery by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const battery = await BatteryModel.findById(req.params.id);
    if (!battery) {
      return res.status(404).json({ error: "Battery not found" });
    }
    res.json(battery);
  } catch (error) {
    res.status(500).json({ error: "Failed to get battery" });
  }
});

// Get all batteries
router.get("/", async (req: Request, res: Response) => {
  try {
    const batteries = await BatteryModel.find();
    res.json(batteries);
  } catch (error) {
    res.status(500).json({ error: "Failed to get batteries" });
  }
});

export default router;
