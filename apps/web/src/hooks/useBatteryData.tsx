import { useState } from "react";
import { useDebounce } from "../utils/debouce";
import useSWR from "swr";
import { GetBatteryResponse } from "../types/responses";

export const useBatteryData = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [largerThan, setLargerThan] = useState("");
  const [smallerThan, setSmallerThan] = useState("");
  const debounceSearchQuery = useDebounce(searchQuery, 2000);
  const debounceLargerThan = useDebounce(largerThan, 2000);
  const debounceSmallerThan = useDebounce(smallerThan, 2000);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data: response, mutate } = useSWR<GetBatteryResponse>(
    `${import.meta.env.VITE_SERVER_URL}/battery?searchQuery=${debounceSearchQuery}&lt=${debounceLargerThan}&st=${debounceSmallerThan}&limit=${limit}&skip=${skip}`
  );

  return {
    response,
    searchQuery,
    setSearchQuery,
    largerThan,
    setLargerThan,
    smallerThan,
    setSmallerThan,
    debounceSearchQuery,
    debounceLargerThan,
    debounceSmallerThan,
    skip,
    setSkip,
    limit,
    setLimit,
    mutate,
  };
};
