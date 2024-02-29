import { Modal } from "flowbite-react";
import { Battery } from "../types/responses";
import Button from "./button";
import useBatteryDelete from "../hooks/useBatteryDelete";

interface DeleteModalProps {
  data?: Battery;
  onClose: () => void;
}
const DeleteModal = (props: DeleteModalProps) => {
  const { data, onClose } = props;

  const { deleteBattery } = useBatteryDelete();

  return (
    <Modal show={!!data} onClose={onClose}>
      <Modal.Header>
        <p className="text-lg font-semibold">Delete Battery</p>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col">
          <p className="font-semibold">
            {`Are you sure you want to delete ${data?.name}?`}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex flex-row justify-end w-full">
          <Button
            className="mr-2"
            onClick={async () => {
              if (data?._id) {
                await deleteBattery(data._id);
                onClose();
              }
            }}
          >
            Delete
          </Button>
          <Button outline onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
