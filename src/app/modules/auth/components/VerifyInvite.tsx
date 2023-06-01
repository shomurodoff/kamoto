import {useEffect, useState} from 'react'

import {useLocation, useNavigate} from 'react-router-dom'
import {verifyInvite} from '../core/_requests'
import { useAuth } from '../core/Auth'
import { Toaster } from '../../widgets/components/General/Toaster'
import { toast } from 'react-toastify'
import { useIntl } from 'react-intl'

const VerifyInvite = () => {
  const navigate = useNavigate()
  const [errors, setError] = useState<any>(undefined)
  const {userToken,logout} = useAuth()
  const {pathname} = useLocation()
  const {formatMessage} = useIntl()
  const inviteToken = pathname.split('/')[3]

  useEffect(() => {
    if (userToken) {
      logout()
      document.location.reload()
    }
  }, [userToken]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getVerifyToken = async () => {
      try {
        const {
          data: {success, data, errors},
        } = await verifyInvite(inviteToken)

        if (success) {
          if (data.userExists) {
            navigate('/auth/login', {state: data})
            setTimeout(() => {
              toast.success(formatMessage({id: 'Invite accepted. Please log into the correct account.'}))
            }, 500);
          } else {
            navigate('/auth/registration', {state: {...data, inviteToken}})
            setTimeout(() => {
              toast.success(formatMessage({id: 'Please sign up below to accept the invite.'}));
            }, 500);
          }
        } else {
          setError(errors)
          console.log(errors)
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (!userToken) { // Call verify invite API only if user is not logged in
      getVerifyToken()
    }
  }, [inviteToken, userToken])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Toaster />
    <div className='founder-crate-bg founder-crate-bg added_height d-flex justify-content-center align-items-center'>
      {errors?.map((error: string) => (
        <div className='card m-2'>
          <div className='card-body text-dark font-size-13'>{error}</div>
        </div>
      ))}
    </div>
    </>
  )
}

export {VerifyInvite}
