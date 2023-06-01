import axios from 'axios'
import {UserModel} from './_models'
const API_URL = process.env.REACT_APP_BASE_API_URL
const IPSTACK_URL = `${process.env.REACT_APP_IPSTACK_LINK}?access_key=${process.env.REACT_APP_IPSTACK_ACCESS_KEY}&format=1`
const COUNTRY_URL = `${API_URL}/country`

export const INVITE_USER = `${API_URL}/auth/invite`
export const ACCEPT_INVITATION = `${API_URL}/auth/accept-invite`
export const CREATE_COMPANY = `${API_URL}/company`
export const CREATE_ROUND = `${API_URL}/round`
export const CURRENCIES = `${API_URL}/currency`
export const STATE = ``
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/verify-token`
export const GET_FILE_URL = `${API_URL}/file`
export const GET_USER_TOKEN = `${API_URL}/user/token`
export const UPDATE_ROUND = `${API_URL}/round`

// export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

//invite user
type InviteUser = {
  firstName: string
  lastName: string
  email: string
  designation: string
}

export function inviteUser(companyId: string, Users: InviteUser[]) {
  return axios.post(
    INVITE_USER,
    {companyId, Users},
    {
      validateStatus(status) {
        return true
      },
    }
  )
}

//accept invitation
export function acceptInvitation(inviteToken: string, password: string) {
  return axios.post(ACCEPT_INVITATION, {inviteToken, password})
}

//create company
export function createCompany(
  companyName: string,
  industry: string,
  country: string,
  state: string,
  logoId: number,
  chargebeePlanId: string
) {
  return axios.post(
    CREATE_COMPANY,
    {
      name: companyName,
      industry: industry,
      countryId: Number(country),
      stateId: Number(state),
      logoId,
      chargebeePlanId,
    },
    {
      validateStatus(status) {
        return true
      },
    }
  )
}

//create round
export function createRound(
  roundName: string,
  roundType: string,
  amountTargeted: number,
  amountAchieved: number,
  currency: string,
  companyId: number
) {
  const currencyId = parseInt(currency)

  return axios.post(
    CREATE_ROUND,
    {
      roundName,
      roundType,
      amountTargeted,
      amountAchieved,
      currencyId,
      companyId,
    },
    {
      validateStatus(status) {
        return true
      },
    }
  )
}

//currencies
export function currencies() {
  return axios.get(CURRENCIES)
}

export function state(countryId: string) {
  return axios.get(`${API_URL}/state/${countryId}`)
}
export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    token: token,
  })
}
//getLocation
export const getLocation = () => {
  return axios.get(IPSTACK_URL)
}
// getCountry
export const getCountry = () => {
  return axios.get(COUNTRY_URL)
}

//getUserToken
export const getUserToken = () => {
  return axios.get(GET_USER_TOKEN)
}
//updateround
export const updateRound = (
  roundName: string,
  roundType: string,
  amountTargeted: number,
  amountAchieved: number,
  currency: string,
  companyId: number,
  roundId: number
) => {
  const currencyId = parseInt(currency)

  return axios.put(
    UPDATE_ROUND + `/${roundId}`,
    {
      roundName,
      roundType,
      amountTargeted,
      amountAchieved,
      currencyId,
      companyId,
    },
    {
      validateStatus(status) {
        return true
      },
    }
  )
}
