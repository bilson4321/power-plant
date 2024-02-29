import useSWRMutation from "swr/mutation";
import { Battery } from "../types/responses";
import { useBatteryData } from "./useBatteryData";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BatterySchema } from "../schema/batterySchema";

async function createBatteryFetcher(
  url: string,
  { arg }: { arg: Partial<Battery> }
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const data = await res.json();
  return data;
}
interface UseCreateBatteryProps {
  onClose: () => void;
}
const useCreateBattery = (props: UseCreateBatteryProps) => {
  const { onClose } = props;
  const { mutate } = useBatteryData();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BatterySchema),
  });

  const { trigger, isMutating } = useSWRMutation(
    `${import.meta.env.VITE_SERVER_URL}/battery`,
    createBatteryFetcher,
    {
      onSuccess: () => {
        mutate();
        onClose();
      },
    }
  );

  const onSubmit: SubmitHandler<Partial<Battery>> = (data) => {
    trigger(data);
  };

  return {
    createBattery: onSubmit,
    handleSubmit,
    isMutating,
    errors,
    register,
    setValue,
  };
};

export default useCreateBattery;
