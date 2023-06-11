import axios from "axios";

export const API_URL = process.env.REACT_APP_BASE_API_URL;
const GET_NOTIFICATIONS = `${API_URL}/notifications`;
const GET_LOCALE = `${API_URL}/user-meta`;
export const getNotifications = (personalityId: string | undefined) => {
  return axios.get(`${GET_NOTIFICATIONS}/${personalityId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getAllNotifications = (personalityId: string | undefined) => {
  return axios.get(`${GET_NOTIFICATIONS}/${personalityId}/?all=true`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getLocaleData = () => {
  return axios.get(`${GET_LOCALE}`);
};
