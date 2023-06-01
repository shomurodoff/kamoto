import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {getSingleInvestor} from '../../investor-database/core/_requests'
import {InvestorDetails} from './InvestorDetails'
import {InvestorNavBar} from './InvestorNavBar'
import {Toaster} from '../../widgets/components/General/Toaster'

export const InvestorPageLayout = () => {
  const navigate = useNavigate()
  const [investor, setInvestor] = useState<any>()
  const {investorId} = useParams()
  const {state} = useLocation() as any

  const getInvestor = async () => {
    try {
      if (investorId) {
        const {
          data: {success, data},
        } = await getSingleInvestor(+investorId)
        if (success) {
          setInvestor(data)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getInvestor()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {state ? (
        <>
          <Toaster />
          <InvestorDetails getInvestor={getInvestor} investorId={investorId} investor={investor} />
          <InvestorNavBar investor={investor} getInvestor={getInvestor} />
        </>
      ) : (
        navigate('/investor-crm')
      )}
    </>
  )
}
