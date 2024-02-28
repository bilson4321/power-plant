import { SWRConfiguration } from "swr";

const SWROption: SWRConfiguration = {
  revalidateOnMount: true,
  fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
};

export default SWROption;
