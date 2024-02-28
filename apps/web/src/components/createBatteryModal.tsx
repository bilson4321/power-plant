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
      <Modal.Header>
        <div className="title">Create Battery</div>
      </Modal.Header>
      <Modal.Body>
        <div className="p-2">
          <div className="flex flex-col">
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
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex flex-row justify-between w-full">
          <Button
            isLoading={isMutating}
            onClick={async () => {
              if (!battery) return;
              await trigger(battery);
              onClose();
            }}
          >
            Create Battery
          </Button>
          <Button outline onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBatteryModal;
