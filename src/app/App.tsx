import {Suspense, useEffect, useState} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit, useAuth} from './modules/auth'
import {GoogleOAuthProvider} from '@react-oauth/google'
import {InvestorDatabaseProvider} from './modules/investor-database/core/InvestorContext'
import {getLocaleData} from '../_metronic/partials/layout/core/_requests'
import axios from 'axios'
import useAxiosResponse from './modules/widgets/components/General/useAxiosResponse'
import {BillingModal} from './modules/onboarding/views/BillingModal'
import {plans} from './modules/onboarding/core/_constants'
import useGetBillingData from './hooks/useGetBillingData'

const App = () => {
  const {showBillingModal, setShowBillingModal, companyId, currentState, selected, currencyBill} =
    useAuth()
  const [status, setStatus] = useState(true)
  const {getBillingDetailsAPI} = useGetBillingData(companyId!)

  const I18N_CONFIG_KEY = process.env.REACT_APP_I18N_CONFIG_KEY || 'i18nConfig'
  const Locale = async () => {
    try {
      const {
        data: {data, success},
      } = await getLocaleData()
      if (success) {
        data.forEach((e: any) => {
          if (e.key === 'locale') {
            if (e.value === 'fr_FR') {
              if (status) {
                setStatus(false)
                localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: 'fr'}))
              }
            } else if (e.value === 'de_GN') {
              if (status) {
                setStatus(false)
                localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: 'de'}))
              }
            } else if (e.value === 'en_US') {
              if (status) {
                setStatus(false)
                localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: 'en'}))
              }
            } else if (e.value === 'es_ES') {
              if (status) {
                setStatus(false)
                localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: 'es'}))
              }
            } else if (e.value === 'zh_CN') {
              if (status) {
                setStatus(false)
                localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: 'zh'}))
              }
            } else if (e.value === 'hi_HI') {
              if (status) {
                setStatus(false)
                localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: 'hi'}))
              }
            } else if (e.value === 'bn_BN') {
              if (status) {
                setStatus(false)
                localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: 'bn'}))
              }
            } else if (e.value === 'it_IT') {
              if (status) {
                setStatus(false)
                localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: 'it'}))
              }
            } else if (e.value === 'ko_KO') {
              if (status) {
                setStatus(false)
                localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: 'ko'}))
              }
            } else if (e.value === 'pt_PT') {
              if (status) {
                setStatus(false)
                localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: 'pt'}))
              }
            } else if (e.value === 'ru_RU') {
              if (status) {
                setStatus(false)
                localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: 'ru'}))
              }
            } else {
              if (status) {
                setStatus(false)
                localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: 'ja'}))
              }
            }
          } else if (e.key === 'dateFormat') {
            localStorage.setItem('dateFormat', e.value)
          } else if (e.key === 'timeFormat') {
            localStorage.setItem('timeFormat', e.value)
          } else if (e.key === 'timezone') {
            localStorage.setItem('timeZone', e.value)
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  useAxiosResponse(axios)

  useEffect(() => {
    Locale()
  }, [companyId]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              <InvestorDatabaseProvider>
                <Outlet />
                <MasterInit />
                <BillingModal
                  setModalShow={setShowBillingModal}
                  modalShow={showBillingModal}
                  currencyBill={currencyBill}
                  selected={selected}
                  currentState={currentState}
                  plans={plans}
                  upgrade={true}
                  companyId={companyId}
                  getBillingDetails={getBillingDetailsAPI}
                />
              </InvestorDatabaseProvider>
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </GoogleOAuthProvider>
    </Suspense>
  )
}

export {App}
