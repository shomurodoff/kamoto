import React, {FC, useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {getAllActivities} from '../../../../app/modules/investor-crm/core/_requests'
import {useAuth} from '../../../../app/modules/auth'
import {activityModel} from '../../../../app/modules/investor-crm/core/_models'
import {ActivityCard} from '../../../../app/modules/investor-crm/components/ActivityCard'
import {useIntl} from 'react-intl'

export const ActivityDrawer: FC = () => {
  const {formatMessage} = useIntl()
  const {companyId} = useAuth()
  const [allActivities, setAllActivities] = useState<[activityModel]>()

  const getActivity = async () => {
    let type: string = 'all'
    if (companyId) {
      const {
        data: {data: values, success},
      } = await getAllActivities(companyId, -1, type, '', '', 'startActivityTime', 'ASC', 30)
      if (success) {
        setAllActivities(values)
      }
    }
  }

  useEffect(() => {
    getActivity() // eslint-disable-next-line
  }, [companyId])

  return (
    <div
      id='kt_activities'
      className='bg-body'
      data-kt-drawer='true'
      data-kt-drawer-name='activities'
      data-kt-drawer-activate='true'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'350px', 'lg': '786px'}"
      data-kt-drawer-direction='end'
      data-kt-drawer-toggle='#kt_activities_toggle'
      data-kt-drawer-close='#kt_activities_close'
    >
      <div className='card shadow-none rounded-0 w-100'>
        <div className='card-header' id='kt_activities_header'>
          <h3 className='card-title fw-bolder text-dark'>{formatMessage({id: 'Activity Logs'})}</h3>

          <div className='card-toolbar'>
            <button
              type='button'
              className='btn btn-sm btn-icon btn-active-light-primary me-n5'
              id='kt_activities_close'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </button>
          </div>
        </div>
        <div className='card-body position-relative' id='kt_activities_body'>
          <div
            id='kt_activities_scroll'
            className='w-100 d-flex flex-column align-items-center my-5 activity-container-n overflow-visible'
            data-kt-scroll='true'
            data-kt-scroll-height='auto'
            data-kt-scroll-wrappers='#kt_activities_body'
            data-kt-scroll-dependencies='#kt_activities_header, #kt_activities_footer'
            data-kt-scroll-offset='5px'
          >
            {allActivities?.length! > 0 ? (
              allActivities?.map((activity: activityModel, index: number) => (
                <ActivityCard
                  key={activity.activityId}
                  activity={activity}
                  index={index}
                  length={allActivities?.length}
                  getActivity={getActivity}
                  investorId={-1}
                />
              ))
            ) : (
              <div className='text-center'>
                <h3 className='fw-bolder font-size-14 '>{formatMessage({id: 'No Activity'})}</h3>
                <p
                  className='text-muted font-size-13 mt-3'
                  dangerouslySetInnerHTML={{
                    __html: formatMessage({
                      id: 'There are currently no activity to display. Please <br> check back later',
                    }),
                  }}
                ></p>

                <img
                  className='mt-10'
                  src={toAbsoluteUrl('/media/svg/illustrations/noActivity.svg')}
                  alt='No Activity'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
