
import {getBillingData} from '../modules/profile/core/_requests'
import {toast} from 'react-toastify'

const useGetBillingData = (companyId: any) => {
  const getBillingDetailsAPI = async () => {
    try {
      if (companyId) {
        const {
          data: {data: values, success, errors},
        } = await getBillingData(companyId)
        if (success) {
          return values;
        } else {
          errors?.forEach((error: string) => {
            toast.error(error)
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  return {getBillingDetailsAPI}
}
export default useGetBillingData
