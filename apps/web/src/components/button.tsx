import { Button as FlowbiteButton } from "flowbite-react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}
const Button = (props: ButtonProps) => {
  const { children, onClick } = props;

  return <FlowbiteButton onClick={onClick}>{children}</FlowbiteButton>;
};

export default Button;
