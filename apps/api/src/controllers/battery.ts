import { Request, Response, Router } from "express";
import BatteryModel from "../models/battery";
import { GetBatteriesRequest } from "../types/battery";

const router = Router();

// Create a new battery
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, postcode, wattCapacity, voltage } = req.body;

    if (!name || !postcode || !wattCapacity || !voltage) {
      return res.status(400).json({ error: "Missing required fields" });
    }
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
    const { id } = req.params;
    const battery = await BatteryModel.findById(id);

    if (!battery) {
      return res.status(404).json({ error: "Battery not found" });
    }
    res.json(battery);
  } catch (error) {
    res.status(500).json({ error: "Failed to get battery" });
  }
});

// Get all batteries
router.get("/", async (req: Request<GetBatteriesRequest>, res: Response) => {
  try {
    const { searchQuery, lt, st, skip, limit } = req.query;

    const parsedSkip = parseInt(skip as string) || 0;
    const parsedLimit = parseInt(limit as string) || 10;

    const dynamicQuery = {
      ...(searchQuery && { name: { $regex: searchQuery, $options: "i" } }),
      ...((lt || st) && {
        postcode: {
          ...(lt && { $gte: lt }),
          ...(st && { $lte: st }),
        },
      }),
    };
    const batteries = await BatteryModel.find(dynamicQuery)
      .sort({
        name: 1,
      })
      .skip(parsedSkip)
      .limit(parsedLimit)
      .populate("current energy power dischargeTime")
      .exec();

    res.json({
      data: batteries,
      meta: {
        total: await BatteryModel.countDocuments(dynamicQuery).exec(),
        skip: parsedSkip,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get batteries" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const battery = await BatteryModel.findByIdAndDelete(id);

    if (!battery) {
      return res.status(404).json({ error: "Battery not found" });
    }
    res.json(battery);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete battery" });
  }
});

export default router;
