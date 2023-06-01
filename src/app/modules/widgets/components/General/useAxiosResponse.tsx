import {useEffect} from 'react'
import {useAuth} from '../../../auth'

const useAxiosResponse = (axios: any) => {
  const {showBillingModal, setShowBillingModal, logout} = useAuth()

  useEffect(() => {
    axios.interceptors.response.use(
      (response: any) => {
        if (response.data.errors) {
          if (
            response.data.errors.includes(
              'Your current plan exceeded, kindly upgrade your billing plan to invite new team member'
            )
          ) {
            setShowBillingModal(!showBillingModal)
          }

          if (response.data.errors.includes("jwt expired")
            || response.data.errors.includes("jwt malformed")
            || response.data.errors.includes("Forbidden")
            || response.data.errors.includes("Unauthorized")) {
            window.location.href = ('/')
            logout()
          }
        }
        return response
      },
      (err: any) => Promise.reject(err.message)
    )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
export default useAxiosResponse
