import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAuth} from '../../../../../app/modules/auth'
import {getProfileCompletionAPI} from '../../../../../app/modules/profile/core/_requests'
import {CreateInvestorModal} from '../../../../../app/modules/investor-database/components/CreateInvestorModal'

const ToolbarClassic = () => {
  const {companyId} = useAuth()
  const location = useLocation()
  const {formatMessage} = useIntl()
  const navigate = useNavigate()
  const [status, setStatus] = useState(0)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getProfileCompletionData = async () => {
      try {
        if (companyId) {
          const {
            data: {data: values, success},
          } = await getProfileCompletionAPI(companyId)
          if (success) {
            setStatus(values)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
    getProfileCompletionData()
  }, [companyId])

  return (
    <>
      {location.pathname.includes('/settings') && (
        <div className='d-flex align-items-center gap-2 gap-lg-3'>
          <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
            <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
              <span className='font-size-13 text-gray-600'>
                {formatMessage({id: 'Profile Completion'})}
              </span>
              <span className='font-size-13 text-gray-600'>{status}%</span>
            </div>
            <div className='h-8px mx-3 w-100 mb-3 rounded' style={{backgroundColor: '#a1a5b7'}}>
              <div
                className='rounded h-8px'
                role='progressbar'
                style={{width: `${status}%`, backgroundColor: '#4776E6'}}
              ></div>
            </div>
          </div>
        </div>
      )}
      {(location.pathname.includes('/prospective-investor') ||
        location.pathname.includes('/existing-investor')) && (
        <div className='d-flex align-items-center gap-2 gap-lg-3'>
          <div className='d-flex ms-7 w-200px w-sm-300px flex-column mt-3 top-btn-main'>
            <div className='d-flex gap-6 ms-n6'>
              <button
                className='border border-primary btn text-primary font-size-13 font-weight-400 height-36 d-flex align-items-center'
                onClick={() => navigate('investor-database/import-investors')}
              >
                {formatMessage({id: 'Import Investor'})}
              </button>
              <button
                className='btn btn-bg-primary font-size-13 text-white font-weight-400 height-36 d-flex align-items-center'
                onClick={() => setShowModal(true)}
              >
                {formatMessage({id: 'Create Investor'})}
              </button>
            </div>
          </div>
        </div>
      )}

      {location.pathname.includes('create-investor') && (
        <div className='d-flex align-items-center gap-2 gap-lg-3'>
          <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3 top-btn-main'>
            <div className='d-flex gap-6 col-11'></div>
          </div>
        </div>
      )}
      <CreateInvestorModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export {ToolbarClassic}
