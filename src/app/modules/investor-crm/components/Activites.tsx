import React, {Dispatch, SetStateAction} from 'react'

import {InvestorSidebarOptions} from '../../../core/_constants'
import {InnerSidebar} from '../../widgets/components/General/InnerSidebar'
// import CopyToClipboard from 'react-copy-to-clipboard'
import {ActivityCard} from './ActivityCard'
import {activityModel} from '../core/_models'

export const Activites = ({
  setSelectedSideBar,
  allActivities,
  getActivity,
  investorId,
}: {
  setSelectedSideBar: Dispatch<SetStateAction<number>>
  allActivities: [activityModel] | undefined
  getActivity: () => void
  investorId: number
}) => {
  const selectOptionFunction = (selected: number) => {
    setSelectedSideBar(selected)
  }
  const {investorSidebarOptions} = InvestorSidebarOptions()

  return (
    <div className='d-md-flex'>
      <InnerSidebar
        sidebarOptions={investorSidebarOptions}
        selectOptionFunction={selectOptionFunction}
      />
      <div className='w-100 d-flex flex-column align-items-center my-5 activity-container overflow-visible'>
        {allActivities?.map((activity: activityModel, index: number) => (
          <ActivityCard
            key={activity.activityId}
            activity={activity}
            index={index}
            length={allActivities?.length}
            getActivity={getActivity}
            investorId={investorId}
          />
        ))}
      </div>
    </div>
  )
}
