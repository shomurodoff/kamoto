import { DateTime } from "luxon";

export const useTimeFormat = () => {
  const getTimeValue = (time: any) => {
    const time_value = localStorage.getItem("timeFormat");
    if (time_value) {
      if (time_value === "H:m:s") {
        return DateTime.fromISO(time).toFormat("H:m:s");
      } else if (time_value === "HH:mm:ss") {
        return DateTime.fromISO(time).toFormat("HH:mm:ss");
      } else if (time_value === "h:m:s a") {
        return DateTime.fromISO(time).toFormat("h:m:s a");
      } else if (time_value === "h:mm:ss a") {
        return DateTime.fromISO(time).toFormat("h:mm:ss a");
      } else if (time_value === "h:mm:ss A") {
        return DateTime.fromISO(time).toFormat("h:mm:ss A");
      } else if (time_value === "hh:mm:ss a") {
        return DateTime.fromISO(time).toFormat("hh:mm:ss a");
      }
    } else {
      return DateTime.fromISO(time).toFormat("H:m:s");
    }
  };

  return { getTimeValue };
};
