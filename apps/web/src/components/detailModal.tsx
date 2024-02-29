import { Modal } from "flowbite-react";
import { Battery } from "../types/responses";

interface DetailModalProps {
  data?: Battery;
  onClose: () => void;
}
const DetailModal = (props: DetailModalProps) => {
  const { data, onClose } = props;

  return (
    <Modal show={!!data} onClose={onClose}>
      <Modal.Header>
        <p className="text-lg font-semibold">Battery Detail</p>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <p className="font-semibold">Name: </p>
            <p className="ml-2">{data?.name}</p>
          </div>
          <div className="flex flex-row">
            <p className="font-semibold">Postcode: </p>
            <p className="ml-2">{data?.postcode}</p>
          </div>
          <div className="flex flex-row">
            <p className="font-semibold">Capacity: </p>
            <p className="ml-2">{data?.wattCapacity}</p>
          </div>
          <div className="flex flex-row">
            <p className="font-semibold">Voltage: </p>
            <p className="ml-2">{data?.voltage}</p>
          </div>
          <div className="flex flex-row">
            <p className="font-semibold">Current: </p>
            <p className="ml-2">{data?.current}</p>
          </div>
          <div className="flex flex-row">
            <p className="font-semibold">Discharge Time: </p>
            <p className="ml-2">{data?.dischargeTime}</p>
          </div>
          <div className="flex flex-row">
            <p className="font-semibold">Energy: </p>
            <p className="ml-2">{data?.energy}</p>
          </div>
          <div className="flex flex-row">
            <p className="font-semibold">Power: </p>
            <p className="ml-2">{data?.power}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DetailModal;
