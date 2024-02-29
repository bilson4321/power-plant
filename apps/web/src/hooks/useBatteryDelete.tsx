import useSWRMutation from "swr/mutation";
import { useBatteryData } from "./useBatteryData";

async function deleteBatteryFetcher(url: string, { arg }: { arg: string }) {
  const res = await fetch(`${url}/${arg}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}

const useBatteryDelete = () => {
  const { mutate } = useBatteryData();
  const { trigger, isMutating } = useSWRMutation(
    `${import.meta.env.VITE_SERVER_URL}/battery`,
    deleteBatteryFetcher,
    {
      onSuccess: () => {
        mutate();
      },
    }
  );

  return { deleteBattery: trigger, isMutating };
};

export default useBatteryDelete;
