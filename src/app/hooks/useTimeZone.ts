import {DateTime} from 'luxon'

export const useTimeZone = () => {
  const getTimeZoneValue = (date: any) => {
    const time_zone = localStorage.getItem('timeZone')
    const time_format = localStorage.getItem('timeFormat')
    if (time_zone) {
      const dateTime = DateTime.fromISO(date)
        .setZone(time_zone)
        .toISO({includeOffset: false, suppressMilliseconds: true})
      if (time_format) {
        const converted_time = DateTime.fromISO(dateTime).toFormat(time_format)
        return converted_time
      } else {
        const converted_time = DateTime.fromISO(dateTime).toLocaleString(DateTime.TIME_SIMPLE)
        return converted_time
      }
    } else {
      if (time_format) {
        return DateTime.fromISO(date).toFormat(time_format)
      } else {
        return DateTime.fromISO(date).toLocaleString(DateTime.TIME_SIMPLE)
      }
    }
  }

  return {getTimeZoneValue}
}
