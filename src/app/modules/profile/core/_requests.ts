import axios from 'axios'
import {ProfileType} from '../core/_models'

export const API_URL = process.env.REACT_APP_BASE_API_URL
const GET_PROFILE_DATA = `${API_URL}/user`
const UPDATE_PROFILE_DATA = `${API_URL}/user`
const CREATE_EMAIL_PREFERENCES = `${API_URL}/email-preferences`
const CREATE_LOCALE = `${API_URL}/user-meta`
export const GET_FILE_URL = `${API_URL}/file`
const GET_COMPANY_DATA = `${API_URL}/company`
const UPDATE_COMPANY_DATA = `${API_URL}/company`
const GET_REFERRAL_DATA = `${API_URL}/referral/code`
const UPDATE_PAYPAL_EMAIL = `${API_URL}/referral/paypal`
const TOTAL_REFERRAL_EARNING = `${API_URL}/referral/earnings`
const SENDER_PROFILE_INFO = `${API_URL}/mailer`
const PROFILE_COMPLETION = `${API_URL}/profile/status`
const BCC_TRACKING_DATA = `${API_URL}/bcc`
const USERS_DATA = `${API_URL}/company`
const TRANSFER_OWNERSHIP = `${API_URL}/company/users/transfer-ownership`
const AUTH_INVITE = `${API_URL}/auth/invite`
const BILLING_DATA = `${API_URL}/billing`
const BILLING_PORTAL = `${API_URL}/billing/access`
const PENDING_USERS = `${API_URL}/team/pending-invite`

export const profileData = (companyId: any) => {
  return axios.get(`${GET_PROFILE_DATA}?companyId=${companyId}`, {
    validateStatus(status) {
      return true
    },
  })
}

export const createEmailPreferences = (preference: string, companyId: number) => {
  return axios.post(
    CREATE_EMAIL_PREFERENCES,
    {
      preference,
      companyId,
    },
    {
      validateStatus(status) {
        return true
      },
    }
  )
}

export const getEmailPreferences = (companyId: number) => {
  return axios.get(`${API_URL}/email-preferences/${companyId}`, {
    validateStatus(status) {
      return true
    },
  })
}

export const createLocale = (key: string, value: string, companyId: number) => {
  return axios.post(
    CREATE_LOCALE,
    {
      key,
      value,
      companyId,
    },
    {
      validateStatus(status) {
        return true
      },
    }
  )
}

export const getLocale = () => {
  return axios.get(`${API_URL}/user-meta`, {
    validateStatus(status) {
      return true
    },
  })
}

export const companyData = (companyId: number) => {
  return axios.get(`${GET_COMPANY_DATA}/${companyId}`, {
    validateStatus(status) {
      return true
    },
  })
}

export const updateProfileInfo = (profileData: ProfileType) => {
  return axios.put(UPDATE_PROFILE_DATA, profileData, {
    validateStatus(status) {
      return true
    },
  })
}

export const updateCompanyProfile = (data: any) => {
  return axios.put(UPDATE_COMPANY_DATA, data, {
    validateStatus(status) {
      return true
    },
  })
}

export const getReferralData = () => {
  return axios.get(GET_REFERRAL_DATA, {
    validateStatus(status) {
      return true
    },
  })
}

export const putPaypalReferralEmail = (data: {paypalEmail: string | undefined}) => {
  return axios.put(
    UPDATE_PAYPAL_EMAIL,
    {paypalEmail: data.paypalEmail},
    {
      validateStatus(status) {
        return true
      },
    }
  )
}

export const getTotalReferralEarning = () => {
  return axios.get(TOTAL_REFERRAL_EARNING, {
    validateStatus(status) {
      return true
    },
  })
}

export const createSenderProfileInfo = (data: any) => {
  return axios.post(SENDER_PROFILE_INFO, data, {
    validateStatus(status) {
      return true
    },
  })
}

export const getMailInfo = (companyId: number | undefined) => {
  return axios.get(`${SENDER_PROFILE_INFO}/${companyId}`, {
    validateStatus(status) {
      return true
    },
  })
}

export const createSendgridMail = (companyId: number | undefined, data: any) => {
  return axios.post(
    SENDER_PROFILE_INFO,
    {companyId, sendgrid: data},
    {
      validateStatus(status) {
        return true
      },
    }
  )
}

export const createCustomSmtpMail = (companyId: number | undefined, data: any) => {
  return axios.post(
    SENDER_PROFILE_INFO,
    {companyId, smtp: data},
    {
      validateStatus(status) {
        return true
      },
    }
  )
}

export const createPostmarkMail = (companyId: number | undefined, data: any) => {
  const payload = {
    companyId,
    postmark: data,
  }
  return axios.post(SENDER_PROFILE_INFO, payload, {
    validateStatus(status) {
      return true
    },
  })
}

export const updateIsActive = (companyId: number | undefined, data: any) => {
  return axios.put(`${SENDER_PROFILE_INFO}/${companyId}`, data, {
    validateStatus(status) {
      return true
    },
  })
}

export const getProfileCompletionAPI = (companyId: number) => {
  return axios.get(`${PROFILE_COMPLETION}/${companyId}`)
}

export const getBccTrackingData = (companyId: number | undefined) => {
  return axios.get(`${BCC_TRACKING_DATA}/${companyId}`, {
    validateStatus(status) {
      return true
    },
  })
}

export const getUserList = (companyId: number | undefined) => {
  return axios.get(`${USERS_DATA}/${companyId}/users`, {
    validateStatus(status) {
      return true
    },
  })
}

export const updateTransferOwnership = (
  companyId: number | undefined,
  userId: number | undefined
) => {
  return axios.post(
    TRANSFER_OWNERSHIP,
    {companyId, userId},
    {
      validateStatus(status) {
        return true
      },
    }
  )
}

export const addUser = (data: any) => {
  return axios.post(AUTH_INVITE, data, {
    validateStatus(status) {
      return true
    },
  })
}

export const deleteUser = (companyId: number | undefined, userId: number) => {
  return axios.delete(`${USERS_DATA}/${companyId}/users/${userId}`, {
    validateStatus(status) {
      return true
    },
  })
}

export const getUser = (companyId: number | undefined, userId: number) => {
  return axios.get(`${USERS_DATA}/${companyId}/users/${userId}`, {
    validateStatus(status) {
      return true
    },
  })
}

export const editUser = (userId: number | undefined, data: any) => {
  return axios.put(`${USERS_DATA}/users/${userId}`, data, {
    validateStatus(status) {
      return true
    },
  })
}

export const sendTestMail = (companyId: number | undefined, mailType: string) => {
  return axios.post(
    `${SENDER_PROFILE_INFO}/test/${companyId}`,
    {mailType},
    {
      validateStatus(status) {
        return true
      },
    }
  )
}

export const getBillingData = (companyId: number | undefined) => {
  return axios.get(`${BILLING_DATA}/${companyId}`, {
    validateStatus(status) {
      return true
    },
  })
}
export const getBillingAccess = (companyId: number | undefined) => {
  return axios.get(`${BILLING_PORTAL}/${companyId}`, {
    validateStatus(status) {
      return true
    },
  })
}

export const updateBillingAccess = (companyId: number | undefined, chargebeePlanId: string) => {
  return axios.put(
    `${BILLING_DATA}/${companyId}`,
    {chargebeePlanId},
    {
      validateStatus(status) {
        return true
      },
    }
  )
}
export const getPendingUsers = (companyId: number) => {
  return axios.get(`${PENDING_USERS}/${companyId}`, {
    validateStatus(status) {
      return true
    },
  })
}

export const deletePendingInvite = (inviteId: number) => {
  return axios.delete(`${PENDING_USERS}/delete/${inviteId}`, {
    validateStatus(status) {
      return true
    },
  })
}
