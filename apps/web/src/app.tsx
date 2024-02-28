import { Table, TextInput } from "flowbite-react";
import { useState } from "react";
import Button from "./components/button";
import CreateBatteryModal, { Battery } from "./components/createBatteryModal";
import useSWR from "swr";
import { useDebounce } from "./utils/debouce";

function App() {
  const [showCreateBatteryModal, setShowCreateBatteryModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [largerThan, setLargerThan] = useState("");
  const [smallerThan, setSmallerThan] = useState("");
  const debounceSearchQuery = useDebounce(searchQuery, 2000);
  const debounceLargerThan = useDebounce(largerThan, 2000);
  const debounceSmallerThan = useDebounce(smallerThan, 2000);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data: response } = useSWR<{
    data: Battery[];
    meta: { total: number; skip: number };
  }>(
    `http://localhost:8000/api/battery?searchQuery=${debounceSearchQuery}&lt=${debounceLargerThan}&st=${debounceSmallerThan}&limit=${limit}&skip=${skip}`
  );

  return (
    <div className="flex-1 bg-[#eeeeee] h-full">
      <header className="bg-green-700 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-thin">Battery Management System</h1>
        </div>
      </header>
      <div className="container mx-auto">
        <div className="bg-white m-6 p-6 rounded-2xl">
          <div>
            <p className="font-sans text-2xl font-bold">Batteries</p>
            <p className="font-sans text-sm font-thin text-slate-500">
              Total Batteries: {response?.meta.total || 0}
            </p>
          </div>
          <div className="mt-4 flex flex-row w-full justify-between">
            <TextInput
              type="text"
              placeholder="Search Batteries"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <TextInput
              type="text"
              placeholder="Postcode larger than"
              onChange={(e) => setLargerThan(e.target.value)}
            />
            <TextInput
              type="text"
              placeholder="Postcode smaller than"
              onChange={(e) => setSmallerThan(e.target.value)}
            />
            <Button onClick={() => setShowCreateBatteryModal(true)}>
              Create Battery
            </Button>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Postcode</Table.HeadCell>
              <Table.HeadCell>Watt Capacity</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {response?.data?.map((battery) => (
                <Table.Row key={battery._id}>
                  <Table.Cell>{battery.name}</Table.Cell>
                  <Table.Cell>{battery.postcode}</Table.Cell>
                  <Table.Cell>{battery.wattCapacity}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => {}}>Delete</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <div className="flex justify-between mt-4">
            <Button
              disabled={skip === 0}
              onClick={() => {
                setSkip((prev) => Math.max(0, prev - limit));
              }}
            >
              Previous
            </Button>
            <Button
              disabled={
                response?.meta.total
                  ? response?.meta.total <= skip + limit
                  : true
              }
              onClick={() => {
                setSkip((prev) => prev + limit);
              }}
            >
              Next
            </Button>
          </div>
        </div>
        <CreateBatteryModal
          show={showCreateBatteryModal}
          onClose={() => setShowCreateBatteryModal(false)}
        />
      </div>
    </div>
  );
}

export default App;
