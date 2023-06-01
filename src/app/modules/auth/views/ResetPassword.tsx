/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import * as Yup from 'yup'

import {Form, Formik} from 'formik'
import {getTokenStatus, resetPassword} from '../core/_requests'
import {useAuth} from '../core/Auth'

import TextInput from '../../widgets/components/Input/TextInput'
import {useIntl} from 'react-intl'
import {CustomButton} from '../../widgets/components/UI/CustomButton'
import {CustomToast} from '../../widgets/components/UI/CustomToast'
import {FormikProps} from '../core/_models'
import {useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

const initialValues = {
  password: '',
  repeatPassword: '',
}

export function ResetPassword() {
  const {formatMessage} = useIntl()
  const [loading, setLoading] = useState(false)
  const [errorsArray, setErrorsArray] = useState<string[]>()
  const {saveAuth} = useAuth()
  const [resetPasswordError, setResetPasswordError] = useState(false)
  const navigate = useNavigate()
  let {pathname} = useLocation()
  const token = pathname.split('/')[3]

  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, formatMessage({id: 'Minimum 6 characters'}))
      .max(50, formatMessage({id: 'Maximum 50 characters'}))
      .required(formatMessage({id: 'Password is required'})),
    repeatPassword: Yup.string()
      .required(formatMessage({id: 'Repeat New Password is required'}))
      .when('password', {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          formatMessage({id: "New Password and Repeat New Password didn't match"})
        ),
      }),
  })
  const onSubmit = async (values: any, {setStatus, setSubmitting}: FormikProps) => {
    setLoading(true)
    try {
      const {
        data: {data: saveAuthData, success, errors},
      } = await resetPassword(token, values.password)
      if (success) {
        toast.success(formatMessage({id: 'Password changed successfully'}))
        await saveAuth(saveAuthData)
        setLoading(false)
        navigate('/auth/login')
      } else if (errors) {
        setErrorsArray(errors)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      await saveAuth(undefined)
      setStatus('something went wrong')
      setSubmitting(false)
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    try {
      const {
        data: {
          data: {valid},
        },
      } = await getTokenStatus(token)
      setResetPasswordError(!valid)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleResetPassword()
  }, [token, resetPasswordError]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {!resetPasswordError ? (
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <Form className='form w-100 px-3' id='kt_login_signin_form'>
              <div className='text-center mb-11'>
                <h1 className='text-dark fw-bolder mb-3'>
                  {formatMessage({id: 'Reset Password'})}
                </h1>
                <div className='text-gray-500 text-center fw-bold fs-4'>
                  {formatMessage({id: 'Enter new password'})}
                </div>
              </div>

              {errorsArray?.map((error: string, index) => (
                <CustomToast key={index} status={error} />
              ))}
              {formik.status && <CustomToast status={formik.status} />}

              <TextInput
                fieldName={'password'}
                formik={formik}
                fieldType={'password'}
                placeholder={''}
                label={formatMessage({id: 'Enter new password'})}
                toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.RESET_PASSWORD.NEW_PASSWORD'})}
                isStarRequired={true}
              />

              <TextInput
                fieldName={'repeatPassword'}
                formik={formik}
                fieldType={'password'}
                placeholder={''}
                label={formatMessage({id: 'Repeat new password'})}
                toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.RESET_PASSWORD.RETYPE_PASSWORD'})}
                isStarRequired={true}
              />

              <CustomButton
                isSubmitting={formik.isSubmitting}
                isValid={formik.isValid}
                buttonText={formatMessage({id: 'Update Password Now'})}
                loading={loading}
              />
            </Form>
          )}
        </Formik>
      ) : (
        <div>
          {formatMessage({
            id: 'Sorry, this password reset link has expired. Please submit a new request to reset your password.',
          })}
        </div>
      )}
    </>
  )
}
