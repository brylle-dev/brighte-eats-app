import { getServiceColor } from "@/utility/serviceColor";

interface BadgeProps {
  text: string;
}

const ServiceBadge = ({ text }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1  ring-inset ${getServiceColor(
        text
      )}`}
    >
      {text}
    </span>
  );
};

export default ServiceBadge;
