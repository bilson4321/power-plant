import { Modal, TextInput } from "flowbite-react";
import Button from "./button";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

interface CreateBatteryModalProps {
  show: boolean;
  onClose: () => void;
}

export interface Battery {
  _id: string;
  name: string;
  postcode: string;
  wattCapacity: number;
}

async function createBattery(url: string, { arg }: { arg: Partial<Battery> }) {
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

const CreateBatteryModal = (props: CreateBatteryModalProps) => {
  const { show, onClose } = props;
  const [battery, setBattery] = useState<null | Partial<Battery>>(null);
  const { trigger, isMutating } = useSWRMutation(
    "http://localhost:8000/api/battery",
    createBattery
  );

  return (
    <Modal show={show} onClose={onClose} title="Create Battery">
      <div className="p-2">
        <div className="flex flex-col j">
          <div className="title">Create Battery</div>
          <div className="p-2">
            <TextInput
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setBattery((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="p-2">
            <TextInput
              type="text"
              placeholder="Postcode"
              onChange={(e) =>
                setBattery((prev) => ({ ...prev, postcode: e.target.value }))
              }
            />
          </div>
          <div className="p-2">
            <TextInput
              type="number"
              placeholder="Watt Capacity"
              onChange={(e) =>
                setBattery((prev) => ({
                  ...prev,
                  wattCapacity: +e.target.value,
                }))
              }
            />
          </div>
          <Button
            onClick={async () => {
              if (!battery) return;
              await trigger(battery);
              onClose();
            }}
          >
            Create Battery
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateBatteryModal;
