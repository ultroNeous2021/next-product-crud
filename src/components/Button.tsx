const btnVariant: Record<string, string> = {
  default: "text-blue-700 border-blue-700 hover:bg-blue-800",
  warning: "text-red-700 border-red-700 hover:bg-red-800",
};

const Button = ({
  text,
  onClick,
  variant = "default",
}: {
  text: string;
  onClick: any;
  variant?: string;
}) => {
  return (
    <button
      type="button"
      className={`${btnVariant[variant]} hover:text-white border focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
