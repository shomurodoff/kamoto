import React from 'react'
import {useIntl} from 'react-intl'
import {Link, useLocation, useParams} from 'react-router-dom'
import 'react-best-tabs/dist/index.css'

export const CreateInvestorTabs = () => {
  const location = useLocation()
  const {id} = useParams()
  const {formatMessage} = useIntl()
  return (
    <div className='bg-white w-100 m-auto tab-width tabs-investordb'>
      <div className='d-flex h-50px border-bottom pt-5'>
        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
          <li className='nav-item font-size-13 font-weight-400'>
            <Link
              className={
                `nav-link text-active-primary me-6 ` +
                ((location.pathname === `/investor-database/create-investor/${id}` && 'active') || (location.pathname === `/investor-database/create-investor` && 'active'))
              }
              to={id ? `/investor-database/create-investor/${id}` : ''}
            >
              {formatMessage({id: 'General'})}
            </Link>
          </li>
          <li className='nav-item font-size-13 font-weight-400'>
            <Link
              className={
                `nav-link text-active-primary me-6 ` +
                (location.pathname.includes('highlights') && 'active')
              }
              to={id ? `/investor-database/create-investor/highlights/${id}` : ''}
            >
              {formatMessage({id: 'Highlights'})}
            </Link>
          </li>
          <li className='nav-item font-size-13 font-weight-400'>
            <Link
              to={id ? `/investor-database/create-investor/people/${id}` : ''}
              className={
                `nav-link text-active-primary me-6 ` +
                (location.pathname.includes('people') && 'active')
              }
            >
              {formatMessage({id: 'People'})}
            </Link>
          </li>
          <li className='nav-item font-size-13 font-weight-400'>
            <Link
              to={id ? `/investor-database/create-investor/investments/${id}` : ''}
              className={
                `nav-link text-active-primary me-6 ` +
                (location.pathname.includes('investments') && 'active')
              }
            >
              {formatMessage({id: 'Investments'})}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
