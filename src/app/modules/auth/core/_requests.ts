import axios from "axios";
import { AuthModel, UserModel } from "./_models";
import { ResponseType } from "../../../core/_models";

const API_URL = process.env.REACT_APP_BASE_API_URL;

export const LOGIN_URL = `${API_URL}/auth/signin`;
export const REGISTER_URL = `${API_URL}/auth/signup`;
export const RESET_PASSWORD_URL = `${API_URL}/auth/reset`;
export const FORGOT_PASSWORD = `${API_URL}/auth/forgot`;
export const SOCIAL_LOGIN_VARIFICATION = `${API_URL}/auth/social-signin`;
export const INVITE_USER = `${API_URL}/auth/invite`;
export const ACCEPT_INVITATION = `${API_URL}/auth/accept-invite`;
export const CREATE_COMPANY = `${API_URL}/company`;
export const CREATE_ROUND = `${API_URL}/round`;
export const CURRENCIES = `${API_URL}/currency`;
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/verify-token`;
export const VERIFY_TOKEN = `${API_URL}/auth/verify-token`;
export const VERIFY_INVITE = `${API_URL}/auth/verify-invite`;
export const ACCEPT_INVITE = `${API_URL}/auth/accept-invite`;

const VERIFY_RESET_LINK = `${API_URL}/auth/reset/verify`;
// export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
//signin
export function login(email: string, password: string) {
  return axios.post<ResponseType<AuthModel>>(
    LOGIN_URL,
    {
      email,
      password,
    },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
}

//signup
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  utm_source: string,
  utm_campaign: string,
  utm_medium: string,
  referral: string,
  plan: string
) {
  return axios.post(
    REGISTER_URL,
    {
      email,
      firstName: firstname,
      lastName: lastname,
      password,
      utm_source,
      utm_medium,
      utm_campaign,
      referral,
      plan,
    },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
}

//reset password
export function resetPassword(token: string, password: string) {
  return axios.patch(
    RESET_PASSWORD_URL,
    {
      token,
      password,
    },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
}

//forgot password
export function forgotPassword(email: string) {
  return axios.post(
    FORGOT_PASSWORD,
    { email },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
}

//social login varification
export function socialLoginVerification(type: string, token: string) {
  return axios.post(SOCIAL_LOGIN_VARIFICATION, { type, token });
}

// Server should return object => { result: boolean } (Is Email in DB)
// export function requestPassword(email: string) {
//   return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
//     email,
//   })
// }

export function getUserByToken(token: string) {
  return axios.post<ResponseType<UserModel>>(GET_USER_BY_ACCESSTOKEN_URL, {
    token,
  });
}

export function verifyToken(token: string) {
  localStorage.setItem("kt-auth-react-v", JSON.stringify({ token }));
  return axios.post(VERIFY_TOKEN, { token });
}

export function verifyInvite(inviteToken: string) {
  return axios.post(
    VERIFY_INVITE,
    { inviteToken },
    {
      validateStatus(status) {
        return true;
      },
    }
  );
}

export function acceptInvite(inviteToken: string, password: string) {
  return axios.post(ACCEPT_INVITE, { inviteToken, password });
}

export const getTokenStatus = (token: string) => {
  return axios.post(VERIFY_RESET_LINK, { token });
};
