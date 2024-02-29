import { Label, Modal, Radio } from "flowbite-react";
import Button from "./button";
import useCreateBattery from "../hooks/useCreateBattery";
import TextInput from "./textInput";

interface CreateBatteryModalProps {
  show: boolean;
  onClose: () => void;
}
const CreateBatteryModal = (props: CreateBatteryModalProps) => {
  const { show, onClose } = props;
  const {
    createBattery,
    isMutating,
    handleSubmit,
    register,
    errors,
    setValue,
  } = useCreateBattery({ onClose });

  return (
    <Modal show={show} onClose={onClose} title="Create Battery">
      <form onSubmit={handleSubmit(createBattery)}>
        <Modal.Header>
          <div className="title">Create Battery</div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col">
            <div className="p-2">
              <TextInput
                label="Name"
                type="text"
                placeholder="Name"
                {...register("name")}
                onChange={(e) => setValue("name", e.target.value)}
              />
              <span className="text-sm text-red-500">
                {errors?.name?.message}
              </span>
            </div>
            <div className="p-2">
              <TextInput
                label="Postcode"
                type="text"
                placeholder="Postcode"
                {...register("postcode")}
                onChange={(e) => setValue("postcode", e.target.value)}
              />
              <span className="text-sm text-red-500">
                {errors?.postcode?.message}
              </span>
            </div>
            <div className="p-2">
              <TextInput
                label="Watt Capacity"
                type="number"
                placeholder="Watt Capacity"
                {...register("wattCapacity")}
                onChange={(e) => setValue("wattCapacity", +e.target.value)}
              />
              <span className="text-sm text-red-500">
                {errors?.wattCapacity?.message}
              </span>
            </div>
            <div className="p-2">
              <Label htmlFor="voltage">Voltage</Label>
              <div className="flex flex-row">
                <div className="mr-2">
                  <Radio
                    value="132"
                    className="mr-2"
                    {...register("voltage")}
                  />
                  <Label htmlFor="voltage">132kV</Label>
                </div>
                <div className="mr-2">
                  <Radio
                    value="220"
                    className="mr-2"
                    {...register("voltage")}
                  />
                  <Label htmlFor="voltage">220kV</Label>
                </div>
              </div>
              <span className="text-sm text-red-500">
                {errors?.voltage?.message}
              </span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row justify-end w-full">
            <Button
              type="submit"
              className="mr-2"
              isLoading={isMutating}
              onClick={() => {}}
            >
              Create Battery
            </Button>
            <Button type="reset" outline onClick={onClose}>
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateBatteryModal;
