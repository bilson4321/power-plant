import * as yup from "yup";

export const BatterySchema = yup.object({
  name: yup.string().required("Name is required"),
  postcode: yup
    .string()
    .matches(
      /^[0-9]{5}(?:-[0-9]{4})?$/,
      "Invalid postcode. It should be in the format XXXXX or XXXXX-XXXX."
    )
    .required("Postcode is required"),
  wattCapacity: yup.number().required("Watt Capacity is required"),
  voltage: yup.number().required("Voltage is required"),
});
