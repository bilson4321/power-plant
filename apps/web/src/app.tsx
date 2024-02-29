import {
  Table,
  TextInput as FlowbiteInput,
  Label,
  Pagination,
} from "flowbite-react";
import { useState } from "react";
import Button from "./components/button";
import CreateBatteryModal from "./components/createBatteryModal";
import TextInput from "./components/textInput";
import { useBatteryData } from "./hooks/useBatteryData";
import { HiEye, HiPlus, HiTrash } from "react-icons/hi";
import DetailModal from "./components/detailModal";
import { Battery } from "./types/responses";
import DeleteModal from "./components/deleteModal";

function App() {
  const [showCreateBatteryModal, setShowCreateBatteryModal] = useState(false);
  const [showDetail, setShowDetail] = useState<Battery>();
  const [showDelete, setShowDelete] = useState<Battery>();

  const {
    response,
    setSearchQuery,
    setLargerThan,
    setSmallerThan,
    skip,
    setSkip,
    limit,
  } = useBatteryData();

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <header>
        <nav className="bg-[#2c3e50] text-white p-4">
          <div className="container mx-auto flex flex-row justify-between">
            <p className="text-2xl font-bold">Battery Management</p>
          </div>
        </nav>
      </header>
      <div className="flex flex-1 bg-[#eeeeee]">
        <div className="container mx-auto">
          <div className="flex flex-row m-2 p-2">
            <div className="bg-white rounded-2xl p-6 mr-10">
              <p className="font-sans text-lg font-semibold">Filters</p>
              <div className="my-4">
                <TextInput
                  label="Search Batteries"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Label color="gray" value={"Postcode Range"} />
              <div className="flex flex-row mt-2">
                <FlowbiteInput
                  type="number"
                  placeholder="Min"
                  className="w-20"
                  onChange={(e) => setLargerThan(e.target.value)}
                />
                <span className="mx-2 my-2">-</span>
                <FlowbiteInput
                  type="number"
                  placeholder="Max"
                  className="w-20"
                  onChange={(e) => setSmallerThan(e.target.value)}
                />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 flex flex-1 flex-col">
              <div className="my-4 flex flex-row w-full justify-between">
                <div>
                  <p className="font-sans text-2xl font-bold">Batteries</p>
                  <p className="font-sans text-sm font-thin text-slate-500">
                    Total Batteries: {response?.meta.total || 0}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowCreateBatteryModal(true)}
                >
                  <HiPlus className="mr-2" />
                  Add Battery
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
                        <div className="flex flex-row">
                          <div
                            className="p-1.5 rounded-full cursor-pointer hover:bg-gray-200 mr-2"
                            onClick={() => setShowDetail(battery)}
                          >
                            <HiEye />
                          </div>
                          <div
                            className="p-1.5 rounded-full cursor-pointer hover:bg-gray-200"
                            onClick={() => setShowDelete(battery)}
                          >
                            <HiTrash />
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <div className="flex justify-end mt-4">
                <Pagination
                  currentPage={skip / limit + 1}
                  totalPages={
                    response?.meta?.total
                      ? Math.ceil(response.meta.total / limit)
                      : 0
                  }
                  onPageChange={(page) => {
                    setSkip((page - 1) * limit);
                  }}
                  showIcons
                />
              </div>
            </div>
          </div>
          <CreateBatteryModal
            show={showCreateBatteryModal}
            onClose={() => setShowCreateBatteryModal(false)}
          />
          <DetailModal
            data={showDetail}
            onClose={() => setShowDetail(undefined)}
          />
          <DeleteModal
            data={showDelete}
            onClose={() => setShowDelete(undefined)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
