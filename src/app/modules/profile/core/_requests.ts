import axios from "axios";
import { ProfileType } from "../core/_models";

export const API_URL = process.env.REACT_APP_BASE_API_URL;
const GET_PROFILE_DATA = `${API_URL}/user`;
const UPDATE_PROFILE_DATA = `${API_URL}/user`;
const CREATE_EMAIL_PREFERENCES = `${API_URL}/email-preferences`;
const CREATE_LOCALE = `${API_URL}/user-meta`;
export const GET_FILE_URL = `${API_URL}/file`;
const GET_PERSONALITY_DATA = `${API_URL}/personality`;
const UPDATE_PERSONALITY_DATA = `${API_URL}/personality`;
const GET_REFERRAL_DATA = `${API_URL}/referral/code`;
const UPDATE_PAYPAL_EMAIL = `${API_URL}/referral/paypal`;
const TOTAL_REFERRAL_EARNING = `${API_URL}/referral/earnings`;
const SENDER_PROFILE_INFO = `${API_URL}/mailer`;
const PROFILE_COMPLETION = `${API_URL}/profile/status`;
const BCC_TRACKING_DATA = `${API_URL}/bcc`;
const USERS_DATA = `${API_URL}/company`;
const TRANSFER_OWNERSHIP = `${API_URL}/company/users/transfer-ownership`;
const AUTH_INVITE = `${API_URL}/auth/invite`;
const BILLING_DATA = `${API_URL}/billing`;
const BILLING_PORTAL = `${API_URL}/billing/access`;
const PENDING_USERS = `${API_URL}/team/pending-invite`;

export const profileData = (personalityId: any) => {
  return axios.get(`${GET_PROFILE_DATA}?personalityId=${personalityId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const createEmailPreferences = (
  notificationSettings: string,
) => {
  return axios.post(
    CREATE_LOCALE,
    {
      key:"notificationSettings",
      value:notificationSettings
    },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const getEmailPreferences = () => {
  return axios.get(`${API_URL}/user-meta/notificationSettings`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const createLocale = (key: string, value: string, personalityId: string) => {
  return axios.post(
    CREATE_LOCALE,
    {
      key,
      value,
      personalityId,
    },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const getLocale = () => {
  return axios.get(`${API_URL}/user-meta`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getPersonalityInfo = (personalityId: string) => {
  return axios.get(`${GET_PERSONALITY_DATA}/${personalityId}`);
};

export const updateProfileInfo = (profileData: ProfileType) => {
  return axios.put(UPDATE_PROFILE_DATA, profileData, {
    validateStatus(status) {
      return true;
    },
  });
};

export const updatePersonalityInfo = (data: any) => {
  return axios.put(UPDATE_PERSONALITY_DATA, data, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getReferralData = () => {
  return axios.get(GET_REFERRAL_DATA, {
    validateStatus(status) {
      return true;
    },
  });
};

export const putPaypalReferralEmail = (data: {
  paypalEmail: string | undefined;
}) => {
  return axios.put(
    UPDATE_PAYPAL_EMAIL,
    { paypalEmail: data.paypalEmail },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const getTotalReferralEarning = () => {
  return axios.get(TOTAL_REFERRAL_EARNING, {
    validateStatus(status) {
      return true;
    },
  });
};

export const createSenderProfileInfo = (data: any) => {
  return axios.post(SENDER_PROFILE_INFO, data, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getMailInfo = (personalityId: string | undefined) => {
  return axios.get(`${SENDER_PROFILE_INFO}/${personalityId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const createSendgridMail = (
  personalityId: string | undefined,
  data: any
) => {
  return axios.post(
    SENDER_PROFILE_INFO,
    { personalityId, sendgrid: data },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const createCustomSmtpMail = (
  personalityId: string | undefined,
  data: any
) => {
  return axios.post(
    SENDER_PROFILE_INFO,
    { personalityId, smtp: data },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const createPostmarkMail = (
  personalityId: string | undefined,
  data: any
) => {
  const payload = {
    personalityId,
    postmark: data,
  };
  return axios.post(SENDER_PROFILE_INFO, payload, {
    validateStatus(status) {
      return true;
    },
  });
};

export const updateIsActive = (personalityId: string | undefined, data: any) => {
  return axios.put(`${SENDER_PROFILE_INFO}/${personalityId}`, data, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getProfileCompletionAPI = (personalityId: string) => {
  return axios.get(`${PROFILE_COMPLETION}/${personalityId}`);
};

export const getBccTrackingData = (personalityId: string | undefined) => {
  return axios.get(`${BCC_TRACKING_DATA}/${personalityId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getUserList = (personalityId: string | undefined) => {
  return axios.get(`${USERS_DATA}/${personalityId}/users`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const updateTransferOwnership = (
  personalityId: string | undefined,
  userId: number | undefined
) => {
  return axios.post(
    TRANSFER_OWNERSHIP,
    { personalityId, userId },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const addUser = (data: any) => {
  return axios.post(AUTH_INVITE, data, {
    validateStatus(status) {
      return true;
    },
  });
};

export const deleteUser = (personalityId: string | undefined, userId: number) => {
  return axios.delete(`${USERS_DATA}/${personalityId}/users/${userId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const getUser = (personalityId: string | undefined, userId: number) => {
  return axios.get(`${USERS_DATA}/${personalityId}/users/${userId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const editUser = (userId: number | undefined, data: any) => {
  return axios.put(`${USERS_DATA}/users/${userId}`, data, {
    validateStatus(status) {
      return true;
    },
  });
};

export const sendTestMail = (
  personalityId: string | undefined,
  mailType: string
) => {
  return axios.post(
    `${SENDER_PROFILE_INFO}/test/${personalityId}`,
    { mailType },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};

export const getBillingData = (personalityId: string | undefined) => {
  return axios.get(`${BILLING_DATA}/${personalityId}`, {
    validateStatus(status) {
      return true;
    },
  });
};
export const getBillingAccess = (personalityId: string | undefined) => {
  return axios.get(`${BILLING_PORTAL}/${personalityId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const updateBillingAccess = (
  personalityId: string | undefined,
  chargebeePlanId: string
) => {
  return axios.put(
    `${BILLING_DATA}/${personalityId}`,
    { chargebeePlanId },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
};
export const getPendingUsers = (personalityId: string) => {
  return axios.get(`${PENDING_USERS}/${personalityId}`, {
    validateStatus(status) {
      return true;
    },
  });
};

export const deletePendingInvite = (inviteId: number) => {
  return axios.delete(`${PENDING_USERS}/delete/${inviteId}`, {
    validateStatus(status) {
      return true;
    },
  });
};
