import mongoose, { Schema } from "mongoose";
import { IBattery } from "../types/battery";

const BatterySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    postcode: { type: String, required: true },
    wattCapacity: { type: Number, required: true },
    voltage: { type: Number, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

BatterySchema.virtual("current", {
  localField: "wattCapacity",
  foreignField: "wattCapacity",
}).get(function (this: IBattery) {
  return this.wattCapacity / this.voltage;
});

BatterySchema.virtual("energy", {
  localField: "wattCapacity",
  foreignField: "wattCapacity",
}).get(function (this: IBattery) {
  return this.wattCapacity * this.voltage;
});

BatterySchema.virtual("power", {
  localField: "wattCapacity",
  foreignField: "wattCapacity",
}).get(function (this: IBattery) {
  return `${this.voltage}V * ${this.current}A = ${this.voltage * this.current}W`;
});

BatterySchema.virtual("dischargeTime", {
  localField: "wattCapacity",
  foreignField: "wattCapacity",
}).get(function (this: IBattery) {
  return `${this.energy}Wh / ${this.power}W = ${this.energy / parseInt(this.power)}h`;
});

const BatteryModel = mongoose.model<IBattery>("Battery", BatterySchema);

export default BatteryModel;
