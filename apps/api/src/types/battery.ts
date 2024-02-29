import { Document } from "mongoose";

export interface IBattery extends Document {
  name: string;
  postcode: string;
  wattCapacity: number;
  voltage: number;
  current: number;
  energy: number;
  power: string;
  dischargeTime: string;
}

export interface GetBatteriesRequest {
  searchQuery?: string;
  lt?: string;
  st?: string;
  skip?: string;
  limit?: string;
}
