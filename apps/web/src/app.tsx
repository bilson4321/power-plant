import { Table } from "flowbite-react";
import { useState } from "react";
import Button from "./components/button";
import CreateBatteryModal, { Battery } from "./components/createBatteryModal";
import useSWR from "swr";

function App() {
  const [showCreateBatteryModal, setShowCreateBatteryModal] = useState(false);
  const { data: batteries } = useSWR<Battery[]>(
    "http://localhost:8000/api/battery"
  );

  return (
    <>
      <header className="bg-green-700 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-thin">Battery Management System</h1>
        </div>
      </header>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold my-4">Batteries</h1>
        <Button onClick={() => setShowCreateBatteryModal(true)}>
          Create Battery
        </Button>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Postcode</Table.HeadCell>
            <Table.HeadCell>Watt Capacity</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {batteries?.map((battery) => (
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
        <CreateBatteryModal
          show={showCreateBatteryModal}
          onClose={() => setShowCreateBatteryModal(false)}
        />
      </div>
    </>
  );
}

export default App;
