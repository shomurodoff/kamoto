import {Form, Formik} from 'formik'
import React, {useState} from 'react'
import {useIntl} from 'react-intl'
import * as Yup from 'yup'
import {SelectInput} from '../../widgets/components/Input/SelectInput'
import {
  dateFormatOptions,
  localeInitialValues,
  localeOptions,
  timeFormatOptions,
  timeZoneOptions,
} from '../core/_constants'
import {CustomButton} from '../../widgets/components/UI/CustomButton'
import {createLocale, getLocale} from '../core/_requests'
import {useAuth} from '../../auth'
import {toast} from 'react-toastify'
import {Spinner} from '../../widgets/components/General/Spinner'
import {getCompanyMetaIdType} from '../core/_models'
import {getLocaleData} from '../../../../_metronic/partials/layout/core/_requests'

const localSchema = Yup.object().shape({
  locale: Yup.string(),
  timezone: Yup.string(),
  dateFormat: Yup.string(),
  timeFormat: Yup.string(),
  timestampFormat: Yup.string(),
})

export const Locale = ({key, getLocaleApiLoading}: any) => {
  const I18N_CONFIG_KEY = process.env.REACT_APP_I18N_CONFIG_KEY || 'i18nConfig'
  const {currentUser} = useAuth()
  const {formatMessage} = useIntl()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(true)
  const onSubmit = async (values: {
    locale: string
    timezone: string
    dateFormat: string
    timeFormat: string
    timestampFormat: string
  }) => {
    try {
      setLoading(true)
      const allpromises: any[] = [
        createLocale('dateFormat', values.dateFormat, currentUser?.company[0].companyId),
        createLocale('locale', values.locale, currentUser?.company[0].companyId),
        createLocale('timeFormat', values.timeFormat, currentUser?.company[0].companyId),
        createLocale('timezone', values.timezone, currentUser?.company[0].companyId),
      ]

      const data = await Promise.all(allpromises)

      if (data) {
        const {
          data: {success, data},
        } = await getLocale()
        if (success) {
          data.map(({key, value}: getCompanyMetaIdType) => {
            return (localeInitialValues[key] = value)
          })
          setLoading(false)
          toast.success(formatMessage({id: 'Locale updated successfully'}))
          Locale()
        }
      }
    } catch (err) {
      toast.error(formatMessage({id: 'Locale updated Failed'}))
    }
  }

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
  return (
    <>
      {getLocaleApiLoading ? <Spinner /> : null}
      <div className='mx-1 ps-md-8 ps-4 pt-8 locale-container mt-0'>
        <div className='fs-6 fw-semibold pb-4'>{formatMessage({id: 'Locale Settings'})}</div>
        <div className='mt-md-8  w-100'>
          <Formik
            initialValues={localeInitialValues}
            validationSchema={localSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <div className='d-md-flex col-md-12 flex-wrap w-100'>
                    <SelectInput
                      label={formatMessage({id: 'Locale'})}
                      fieldName={'locale'}
                      placeholder={formatMessage({id: 'Select the Locale'})}
                      formik={formik}
                      isStarRequired={true}
                      options={localeOptions}
                      toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.LOCALE.LOCALE'})}
                      margin='me-6'
                      width={5}
                    />
                    <SelectInput
                      label={formatMessage({id: 'Time Zone'})}
                      fieldName={'timezone'}
                      placeholder={formatMessage({id: 'Select the Time Zone'})}
                      formik={formik}
                      isStarRequired={true}
                      options={timeZoneOptions}
                      toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.LOCALE.TIME_ZONE'})}
                      margin='me-6'
                      width={5}
                    />
                    <SelectInput
                      label={formatMessage({id: 'Date Format'})}
                      fieldName={'dateFormat'}
                      placeholder={formatMessage({id: 'Select the Date Format'})}
                      formik={formik}
                      isStarRequired={true}
                      options={dateFormatOptions}
                      toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.LOCALE.DATE_FORMAT'})}
                      margin='me-6'
                      width={5}
                    />
                    <SelectInput
                      label={formatMessage({id: 'Time Format'})}
                      fieldName={'timeFormat'}
                      placeholder={formatMessage({id: 'Select the Time Format'})}
                      formik={formik}
                      isStarRequired={true}
                      toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.LOCALE.TIME_FORMAT'})}
                      options={timeFormatOptions}
                      margin='me-6'
                      width={5}
                    />
                  </div>
                  <div className='d-flex justify-content-end button-margin me-10'>
                    <CustomButton
                      isSubmitting={formik.isSubmitting}
                      isValid={formik.isValid}
                      buttonText={formatMessage({id: 'Save Changes'})}
                      loading={loading}
                      width={2}
                      widthLoading={2}
                      margin={'me-3'}
                      height={44}
                    />
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </>
  )
}
