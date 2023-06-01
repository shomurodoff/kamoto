import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useThemeMode } from '../../../../_metronic/partials'
import { BasicButton } from '../../widgets/components/UI/BasicButton'
import { useIntl } from 'react-intl'

const Error404: FC = () => {
  const { mode } = useThemeMode()
  const navigate = useNavigate()
  const { formatMessage } = useIntl()
  return (
    <>
      {mode === "dark" ? (<img src={toAbsoluteUrl('/media/illustrations/error/illustration404Dark.svg')}
        alt="" />) :
        (<img src={toAbsoluteUrl('/media/illustrations/error/illustration404.svg')}
          alt="" />)}
      <div className={`my-5 ${mode === "dark" ? "errorHeadingDark" : "errorHeading"}`}>
        404 Error - Page Not Found
      </div>
      <div className={`my-5   ${mode === "dark" ? "errorDetailsDark" : "errorDetails"}`}>
        The page you are looking for could not be found.
        Please check the URL or try searching for the page using the search bar.
        We apologize for any inconvenience this may have caused.
      </div>
      <div className='mb-4'>
        <BasicButton
          buttonText={formatMessage({ id: ' Go to Dashboard' })}
          height='52px'
          width='404px'
          border='none'
          color='#4776E6'
          textColor='#FFFFFF'
          padding='16px 142px'
          onClick={() => {
            navigate('/')

          }}
        />
      </div>
    </>
  )
}

export { Error404 }
