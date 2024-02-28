type BatteryFetcherProps = [string, string];
export const batteryFetcher = async ([url, query]: BatteryFetcherProps) => {
  const res = await fetch(`${url}?searchQuery=${query}`);
  const data = await res.json();
};
