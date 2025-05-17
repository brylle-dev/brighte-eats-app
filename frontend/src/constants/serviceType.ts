export const ServiceType = {
  DELIVERY: "DELIVERY",
  PICK_UP: "PICK_UP",
  PAYMENT: "PAYMENT",
} as const;

export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType];
