/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC, useEffect} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {AuthPage, useAuth, getAuth} from '../modules/auth'
import {App} from '../App'
import {LinkedInCallback} from 'react-linkedin-login-oauth2'

import {VerifyInvite} from '../modules/auth/components/VerifyInvite'
import {PrivacyPolicy} from '../pages/PrivacyPolicy'
import {TermsOfUse} from '../pages/TermsOfUse'
import {AuthLayout} from '../modules/auth/AuthLayout'
import { ResetPassword } from '../modules/auth/views/ResetPassword'
import { ErrorsPage } from '../modules/errors/ErrorsPage'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */

const AppRoutes: FC = () => {
  const {userToken, setUserToken} = useAuth()
  const token = getAuth()
  useEffect(() => {
    if (token) {
      setUserToken(token.token)
    }
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route element={<AuthLayout />}>
            <Route path="terms-of-use" element={<TermsOfUse />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="auth/reset-password/:token"
              element={<ResetPassword />}
            />
          </Route>
          {userToken ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route
                path="/auth/invite/:inviteToken"
                element={<VerifyInvite />}
              />
            </>
          ) : (
            <>
              <Route index element={<Navigate to="/auth/login" />} />
              <Route path="auth/linkedin" element={<LinkedInCallback />} />
              <Route
                path="/auth/invite/:inviteToken"
                element={<VerifyInvite />}
              />
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<ErrorsPage />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
