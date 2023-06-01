/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {BasicButton} from '../UI/BasicButton'
import {ToolTipUI} from '../UI/ToolTipUI'

import {
  activityTypeConst,
  sortActivityConst,
  activityStatusConst,
  sortInvestorCrmConst,
} from '../../../investor-crm/core/_constants'

import {sortInvestorDbConst} from '../../../investor-database/core/_constants'
import {useInvestorDatabase} from '../../../investor-database/core/InvestorContext'
import {useThemeMode} from '../../../../../_metronic/partials'

export const Filter = ({
  isActivityFilter,
  set_sort_by_activity,
  set_sort_order_activty,
  setFilterActivity,
  setIsActivityFilter,
  investorCrmFilter,
  setInvestorCrmFilter,
  set_sort_by_investor,
  set_sort_order_investor,
}: {
  isActivityFilter?: boolean
  set_sort_by_activity?: Dispatch<SetStateAction<string | undefined>>
  set_sort_order_activty?: Dispatch<SetStateAction<string | undefined>>
  setFilterActivity?: Dispatch<SetStateAction<string | undefined>>
  setIsActivityFilter?: Dispatch<SetStateAction<boolean>>
  investorCrmFilter?: boolean
  setInvestorCrmFilter?: Dispatch<SetStateAction<boolean>>
  set_sort_by_investor?: Dispatch<SetStateAction<string | undefined>>
  set_sort_order_investor?: Dispatch<SetStateAction<string | undefined>>
}) => {
  const {formatMessage} = useIntl()
  const {investorDbFilter, setInvestorDbFilter, set_sort_by_investorDb, set_sort_order_investorDb} =
    useInvestorDatabase()
  const [filterLoading, setFilterLoading] = useState(false)
  //Activity
  const [activitytype, setActivityType] = useState<string>('')
  const [activityStatus, setActivityStatus] = useState<string>('')
  const [sortActivity, setSortActivity] = useState<string>('')
  //Investor
  const [sortInvestorCrm, setSortInvestorCrm] = useState<string>('')

  //Investor DB
  const [sortInvestorDb, setSortInvestorDb] = useState<string>('')
  const {mode} = useThemeMode()
  useEffect(() => {
    if (investorCrmFilter || isActivityFilter) {
      setInvestorDbFilter(false)
    }
  }, [investorCrmFilter, isActivityFilter])
  const clearFilterData = () => {
    if (isActivityFilter) {
      setActivityType('')
      setActivityStatus('')
      setSortActivity('')
      setFilterActivity!(undefined)
      set_sort_by_activity!(undefined)
      set_sort_order_activty!(undefined)
      setIsActivityFilter!(false)
    }
    if (investorCrmFilter) {
      setSortInvestorCrm('')
      set_sort_by_investor!(undefined)
      set_sort_order_investor!(undefined)
      setInvestorCrmFilter!(false)
    }
    if (investorDbFilter) {
      setSortInvestorDb('')
      set_sort_by_investorDb(undefined)
      set_sort_order_investorDb(undefined)
      setInvestorDbFilter(false)
    }
  }

  const onApplyFilter = () => {
    try {
      setFilterLoading(true)
      if (isActivityFilter) {
        if (activitytype.length > 0 && activityStatus.length > 0) {
          setFilterActivity!(`activityType=${activitytype}&status=${activityStatus}`)
        } else if (activitytype.length > 0) {
          setFilterActivity!(`activityType=${activitytype}`)
        } else if (activityStatus.length > 0) {
          setFilterActivity!(`status=${activityStatus}`)
        }

        if (sortActivity.length > 0) {
          const sortData = sortActivity.split('-')
          set_sort_by_activity!(sortData[0])
          set_sort_order_activty!(sortData[1])
        }
        setFilterLoading(false)
        setIsActivityFilter!(false)
      }
      if (investorCrmFilter) {
        if (sortInvestorCrm.length > 0) {
          const sortData = sortInvestorCrm.split('-')
          set_sort_by_investor!(sortData[0])
          set_sort_order_investor!(sortData[1])
        }
        setFilterLoading(false)
        setInvestorCrmFilter!(false)
      }
      if (investorDbFilter) {
        if (sortInvestorDb.length > 0) {
          const sortData = sortInvestorDb.split('-')
          set_sort_by_investorDb!(sortData[0])
          set_sort_order_investorDb!(sortData[1])
        }

        setFilterLoading(false)
        setInvestorDbFilter(false)
      }
    } catch (err) {
      setFilterLoading(false)
      console.log(err)
    }
  }
  return (
    <div
      id='fc-filter'
      className='bg-body'
      data-kt-drawer='true'
      data-kt-drawer-name='filter'
      data-kt-drawer-activate='true'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'300px', 'md': '400px'}"
      data-kt-drawer-direction='end'
      data-kt-drawer-toggle='#fc-toogle'
      data-kt-drawer-close='#fc-close'
    >
      {/* begin::Card */}
      <div className='card shadow-none rounded-0 w-100'>
        {/* begin::Header */}
        <div className='card-header' id='fc_header'>
          <h5 className='card-title fw-bold'>{formatMessage({id: 'Sort or Filter'})}</h5>

          <div className='card-toolbar'>
            <button
              type='button'
              className='btn btn-sm btn-icon explore-btn-dismiss me-n5'
              id='fc-close'
            >
              {/* <img src={toAbsoluteUrl('/media/logos/default.svg')} alt='cross' /> */}
            </button>
          </div>

          {/* end::Header */}
        </div>
        {/* begin::Body */}
        <div className='card-body'>
          <div className='mb-5'>
            <BasicButton
              id='fc-close'
              height='36px'
              border='none'
              color={mode === 'dark' ? '#323248' : '#F5F8FA'}
              textColor={mode === 'dark' ? '#FFFFFF' : '#585960'}
              padding='8px 16px'
              buttonText='Clear All filters'
              minWidth={125}
              onClick={() => clearFilterData()}
            />
          </div>
          {isActivityFilter ? (
            <>
              <div className='mb-5'>
                <label className='form-label font-size-13 text-dark text-capitalize ms-3 ms-md-0'>
                  {formatMessage({id: 'Filter by Activty Type'})}{' '}
                  <ToolTipUI
                    tooltipText={formatMessage({
                      id: 'GLOBAL.TOOLTIP.FILTER.ACTIVITY_TYPE',
                    })}
                  />
                </label>
                <select
                  className='form-select form-select-lg h-40px font-size-13'
                  value={activitytype}
                  onChange={(e: any) => setActivityType(e.target.value)}
                >
                  {activityTypeConst.map((type) => (
                    <option key={type.id} value={type.value} disabled={type.disabled}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-5'>
                <label className='form-label font-size-13 text-dark text-capitalize ms-3 ms-md-0'>
                  {formatMessage({id: 'Filter by Activty Status'})}{' '}
                  <ToolTipUI
                    tooltipText={formatMessage({
                      id: 'GLOBAL.TOOLTIP.FILTER.ACTIVITY_STATUS',
                    })}
                  />
                </label>
                <select
                  className='form-select form-select-lg h-40px font-size-13'
                  value={activityStatus}
                  onChange={(e: any) => setActivityStatus(e.target.value)}
                >
                  {activityStatusConst.map((type) => (
                    <option key={type.id} value={type.value} disabled={type.disabled}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='form-label font-size-13 text-dark text-capitalize ms-3 ms-md-0'>
                  {formatMessage({id: 'Sort Activity By'})}{' '}
                  <ToolTipUI
                    tooltipText={formatMessage({
                      id: 'GLOBAL.TOOLTIP.SORT.ACTIVITY',
                    })}
                  />
                </label>
                <select
                  className='form-select form-select-lg h-40px font-size-13'
                  value={sortActivity}
                  onChange={(e: any) => setSortActivity(e.target.value)}
                >
                  {sortActivityConst.map((sort) => (
                    <option key={sort.id} value={sort.value} disabled={sort.disabled}>
                      {sort.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            ''
          )}

          {investorCrmFilter ? (
            <>
              <div>
                <label className='form-label font-size-13 text-dark text-capitalize ms-3 ms-md-0'>
                  {formatMessage({id: 'Sort Investor By'})}{' '}
                  <ToolTipUI
                    tooltipText={formatMessage({
                      id: 'GLOBAL.TOOLTIP.SORT.INVESTOR',
                    })}
                  />
                </label>
                <select
                  className='form-select form-select-lg h-40px font-size-13'
                  value={sortInvestorCrm}
                  onChange={(e: any) => setSortInvestorCrm(e.target.value)}
                >
                  {sortInvestorCrmConst.map((sort) => (
                    <option key={sort.id} value={sort.value} disabled={sort.disabled}>
                      {sort.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            ''
          )}

          {investorDbFilter ? (
            <>
              <div>
                <label className='form-label font-size-13 text-dark text-capitalize ms-3 ms-md-0'>
                  {formatMessage({id: 'Sort InvestorDb By'})}{' '}
                  <ToolTipUI
                    tooltipText={formatMessage({
                      id: 'GLOBAL.TOOLTIP.SORT.INVESTORDB',
                    })}
                  />
                </label>
                <select
                  className='form-select form-select-lg h-40px font-size-13'
                  value={sortInvestorDb}
                  onChange={(e: any) => setSortInvestorDb(e.target.value)}
                >
                  {sortInvestorDbConst.map((sort) => (
                    <option key={sort.id} value={sort.value} disabled={sort.disabled}>
                      {sort.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
        {/* end::Body */}
        {/* begin::Footer */}
        <div className=' d-flex justify-content-center mb-5' id='fc_footer'>
          <BasicButton
            id='fc-close'
            height='52px'
            border='#4776E6'
            color='#4776E6'
            textColor='#FFFFFF'
            padding='16px 138px'
            buttonText='Apply filters'
            minWidth={352}
            loading={filterLoading}
            disabled={filterLoading}
            onClick={() => onApplyFilter()}
          />
        </div>
        {/* end::Footer */}
      </div>
      {/* end::Card */}
    </div>
  )
}
