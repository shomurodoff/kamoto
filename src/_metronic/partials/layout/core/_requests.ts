import axios from 'axios'

export const API_URL = process.env.REACT_APP_BASE_API_URL
const GET_NOTIFICATIONS = `${API_URL}/notifications`
const GET_LOCALE = `${API_URL}/user-meta`
export const getNotifications = (companyId: number | undefined) => {
  return axios.get(`${GET_NOTIFICATIONS}/${companyId}`, {
    validateStatus(status) {
      return true
    },
  })
}

export const getAllNotifications = (companyId: number | undefined) => {
  return axios.get(`${GET_NOTIFICATIONS}/${companyId}/?all=true`, {
    validateStatus(status) {
      return true
    },
  })
}

export const getLocaleData = () => {
  return axios.get(`${GET_LOCALE}`)
}
