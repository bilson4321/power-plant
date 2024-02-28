import mongoose, { Schema, Document } from "mongoose";

interface IBattery extends Document {
  name: string;
  postcode: string;
  wattCapacity: number;
}

const BatterySchema: Schema = new Schema({
  name: { type: String, required: true },
  postcode: { type: String, required: true },
  wattCapacity: { type: Number, required: true },
});

const BatteryModel = mongoose.model<IBattery>("Battery", BatterySchema);

export default BatteryModel;
