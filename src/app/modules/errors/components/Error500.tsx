import {FC} from 'react'
import { useNavigate} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import "../styles/error.scss"
import { useThemeMode } from '../../../../_metronic/partials'
import { BasicButton } from '../../widgets/components/UI/BasicButton'
import { useIntl } from 'react-intl'



const Error500: FC = () => {
const {mode} = useThemeMode()
const navigate = useNavigate()
const {formatMessage} = useIntl()
  return (
    <>
        {mode==="dark"?(<img src={toAbsoluteUrl('/media/illustrations/error/illustration500Dark.svg')}
         alt="" />):
         (<img src={toAbsoluteUrl('/media/illustrations/error/illustration500.svg')}
         alt="" />)}
         <div className={`my-5 ${mode === "dark"?"errorHeadingDark":"errorHeading"}`}>
         500 Internal Server Error
         </div>
         <div className={`my-5   ${mode === "dark"?"errorDetailsDark":"errorDetails"}`}>
         500 Internal Server Error is a generic error message that indicates an issue with the server hosting the website or application you are trying to access.
         </div>
         <div className='mb-4'>
        <BasicButton
                  buttonText={formatMessage({id: ' Go to Dashboard'})}
                  height='52px'
                  width='404px'
                  border='none'
                  color='#4776E6'
                  textColor='#FFFFFF'
                  padding='16px 142px'
                  onClick={() => {navigate('/dashboard')
                    
                  }}
                />
      </div>
    </>
  )
}

export {Error500}
