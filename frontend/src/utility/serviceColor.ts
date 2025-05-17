import { ServiceType } from "@/constants/serviceType";

export function getServiceColor(service: string): string {
  switch (service) {
    case ServiceType.DELIVERY:
      return "bg-blue-50 text-blue-700 ring-blue-700/10";
    case ServiceType.PICK_UP:
      return "bg-indigo-50 text-indigo-700 ring-indigo-700/10";
    case ServiceType.PAYMENT:
      return "bg-green-50 text-green-700 ring-green-700/10";
    default:
      return "bg-gray-50 text-gray-700 ring-gray-700/10"; // fallback color
  }
}
