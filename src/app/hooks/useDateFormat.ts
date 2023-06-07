import { DateTime } from "luxon";

export const useDateFormat = () => {
  const getDateValue = (date: any) => {
    const date_value = localStorage.getItem("dateFormat");
    if (date_value) {
      if (date_value === "MMMM DD, YYYY") {
        return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL);
      } else if (date_value === "DD MMM, YYYY") {
        return DateTime.fromISO(date).toFormat("dd MMM, yyyy");
      } else if (date_value === "MMM DD, YYYY") {
        return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
      } else if (date_value === "MM/DD/YYYY") {
        return DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT);
      } else if (date_value === "DD/MM/YY") {
        return DateTime.fromISO(date).toFormat("dd/MM/yy");
      } else if (date_value === "DD/MM/YYYY") {
        return DateTime.fromISO(date).toFormat("dd/MM/yyyy");
      } else if (date_value === "DD-MM-YYYY") {
        return DateTime.fromISO(date).toFormat("dd-MM-yyyy");
      } else if (date_value === "YYYY/MM/DD") {
        return DateTime.fromISO(date).toFormat("yyyy/MM/dd");
      } else if (date_value === "YYYY-MM-DD") {
        return DateTime.fromISO(date).toFormat("yyyy-MM-dd");
      }
    } else {
      return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL);
    }
  };

  return { getDateValue };
};
