import { ReservationStatusType } from "../../../../types/reservation";

export const STATUS = {
  APPROVED: "APPROVED",
  PENDING: "PENDING",
  CANCELLED: "CANCELLED",
};

const STATUS_DICT = {
  APPROVED: "Aprovado",
  PENDING: "Pendente",
  CANCELLED: "Cancelado",
};

export const getStatusDescription = (status: ReservationStatusType): string =>
  STATUS_DICT[status] || "Erro ao buscar status";

export default STATUS_DICT;
