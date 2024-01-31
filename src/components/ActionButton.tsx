import { ReactElement } from "react";

const ActionButton = ({
  children,
  onClick,
}: {
  children: ReactElement;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      className="border font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ActionButton;
