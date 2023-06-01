import clsx from 'clsx'
import {TextFieldProps} from '../../core/_models'
import {Link} from 'react-router-dom'
import {ToolTipUI} from '../UI/ToolTipUI'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers/AssetHelpers'
import '../styles/index.scss'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {ErrorMessage, Field, getIn} from 'formik'

const TextInput = ({
  fieldName,
  isForgetPassword,
  label,
  toolTipText,
  placeholder,
  margin,
  formik,
  fieldType,
  isPassword,
  isCheckbox,
  linkText1,
  linkText2,
  slug1,
  slug2,
  customText,
  isFieldArray,
  isTooltipNotRequired,
  isBeside,
  width,
  dateValue,
  isDisabled,
  isWidthNotRequired,
  isSocialMedia,
  isStarRequired,
  isRadio,
  value,
  labelWidth,
}: TextFieldProps) => {
  const [hidePassword, setHidePassword] = useState(true)
  const {formatMessage} = useIntl()

  const FieldArrayErrorMessage = ({name}: any) => (
    <Field
      name={name}
      render={({form}: any) => {
        const error = getIn(form.errors, name)
        const touch = getIn(form.touched, name)

        return touch && error ? error : null
      }}
    />
  )
  return (
    <div
      className={`fv-row  ${!isWidthNotRequired && 'col-12'} ${isBeside ? 'd-flex' : 'mb-8'} ${
        margin ? margin : 'me-4'
      } ${width ? `col-md-${width}` : ''}`}
    >
      <div
        className={`d-flex justify-content-between ${isBeside && 'w-md-90px'} ${
          isBeside && labelWidth
        }  `}
      >
        {!isCheckbox && (
          <label
            className={`${
              isCheckbox ? 'form-check form-check-inline' : 'form-label'
            }   font-size-13  text-dark text-capitalize ms-3 ms-md-0 ${
              isBeside && isTooltipNotRequired
                ? 'd-md-flex align-items-md-center  fw-normal mb-0 col-md-12'
                : 'd-md-flex flex-md-row align-items-md-center '
            }`}
            htmlFor='kt_login_toc_agree'
          >
            {isStarRequired ? (
              !isTooltipNotRequired ? (
                <>
                  {label}* <ToolTipUI tooltipText={toolTipText} />
                </>
              ) : (
                <>{label}*</>
              )
            ) : !isTooltipNotRequired ? (
              <>
                {label} <ToolTipUI tooltipText={toolTipText} />
              </>
            ) : (
              <>{label}</>
            )}
          </label>
        )}

        {isForgetPassword && (
          <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-bold '>
            {/* begin::Link */}
            <Link to='/auth/forgot-password' className='text-clr477'>
              {formatMessage({id: 'Forgot Password'})} ?
            </Link>
            {/* end::Link */}
          </div>
        )}
      </div>
      <div className='d-md-flex flex-md-column w-100'>
        <div className={`position-relative d-md-flex  ${isBeside && 'w-md-50'}`}>
          {isRadio ? (
            <Field
              // id='t_login_toc_agree'
              className={`${
                isCheckbox ? 'form-check-input ' : clsx('form-control h-40px font-size-12')
              }`}
              type={fieldType}
              name={fieldName}
              value={isRadio && value}
            />
          ) : (
            <Field
              // id='t_login_toc_agree'
              className={`${
                isCheckbox
                  ? 'form-check-input '
                  : clsx(
                      'form-control h-40px font-size-12',
                      {
                        'is-invalid-local':
                          !isSocialMedia && formik.touched[fieldName] && formik.errors[fieldName],
                      },
                      {
                        'is-valid-local':
                          !isSocialMedia && formik.touched[fieldName] && !formik.errors[fieldName],
                      },
                      {
                        'is-invalid-local':
                          isSocialMedia &&
                          formik.touched &&
                          formik.touched[`socialMedia`] &&
                          formik.touched[`socialMedia`][fieldName.split('.')[1]] &&
                          formik.errors &&
                          formik.errors[`socialMedia`] &&
                          formik.errors[`socialMedia`][fieldName.split('.')[1]],
                      },
                      {
                        'is-valid-local':
                          isSocialMedia &&
                          formik.touched &&
                          formik.touched[`socialMedia`] &&
                          formik.touched[`socialMedia`][fieldName.split('.')[1]] &&
                          formik.errors &&
                          formik.errors[`socialMedia`] &&
                          !formik.errors[`socialMedia`][fieldName.split('.')[1]],
                      }
                    )
              }`}
              aria-describedby='basic-addon2'
              type={hidePassword && isPassword ? 'password' : fieldType}
              disabled={isDisabled}
              name={fieldName}
              defaultValue={dateValue && new Date(dateValue).toISOString().substr(0, 10)}
              placeholder={placeholder}
              autoComplete='off'
            />
          )}
          {isCheckbox && (
            <span className='ms-3 fw-semibold'>
              {customText}{' '}
              {linkText1 && linkText2 && (
                <>
                  <Link to={`${slug1}`} className='ms-1 link-primary'>
                    {linkText1}
                  </Link>{' '}
                  &{' '}
                  <Link to={`${slug2}`} className='ms-1 link-primary'>
                    {linkText2}
                  </Link>
                </>
              )}
            </span>
          )}

          {isPassword && (
            <div
              className='password'
              id='button-addon2'
              role='button'
              onClick={() => setHidePassword(!hidePassword)}
            >
              <img
                src={toAbsoluteUrl(
                  hidePassword
                    ? '/media/icons/duotune/general/eyeHide.svg'
                    : '/media/icons/duotune/general/eye.png'
                )}
                width='24px'
                height='24px'
                alt='eye'
              />
            </div>
          )}
        </div>

        <div className='text-danger mt-2'>
          {isFieldArray ? (
            <FieldArrayErrorMessage name={fieldName} />
          ) : (
            <ErrorMessage name={fieldName} />
          )}
        </div>
      </div>
    </div>
  )
}

export default TextInput
