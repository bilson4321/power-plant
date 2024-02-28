import express from "express";

import BatteryRoutes from "./controllers/battery";
const router = express.Router();

router.use("/battery", BatteryRoutes);

export default router;
