import {
  Label,
  TextInput as FlowbiteTextInput,
  TextInputProps,
} from "flowbite-react";

interface InputProps extends TextInputProps {
  id?: string;
  label: string;
}
const TextInput = (props: InputProps) => {
  const { id, label, ...rest } = props;

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={id} color="gray" value={label} />
      </div>
      <FlowbiteTextInput id={id} {...rest} />
    </div>
  );
};

export default TextInput;
