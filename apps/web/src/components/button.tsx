import {
  Button as FlowbiteButton,
  ButtonProps as FlowbiteButtonProps,
  Spinner,
} from "flowbite-react";

interface ButtonProps extends FlowbiteButtonProps {
  isLoading?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}
const Button = (props: ButtonProps) => {
  const { children, isLoading, onClick, ...rest } = props;

  return (
    <FlowbiteButton
      {...rest}
      onClick={onClick}
      disabled={isLoading || rest.disabled}
    >
      {isLoading ? <Spinner size="sm" className="mr-2" /> : null}
      {children}
    </FlowbiteButton>
  );
};

export default Button;
