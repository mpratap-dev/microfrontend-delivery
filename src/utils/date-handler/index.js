import moment from "moment";

export const formatDate = (date) => moment(date).format("YYYY-MM-DD");
export const formatDateTime = (date) =>
  moment(date).format("YYYY-MM-DD, hh:mm A");
