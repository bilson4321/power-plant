export interface GetBatteryResponse {
  data: Battery[];
  meta: { total: number; skip: number };
}

export interface Battery {
  _id: string;
  name: string;
  postcode: string;
  wattCapacity: number;
  voltage: number;
  current: number;
  dischargeTime: string;
  energy: number;
  power: string;
}
