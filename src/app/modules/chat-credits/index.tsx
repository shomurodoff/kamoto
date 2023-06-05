import React, {Fragment} from 'react'
import Card from './components/card'
import Tabs, {Tab} from 'react-best-tabs'
import Breadcrumb from './components/breadcrumb'

const Index = () => {
  return (
    <Fragment>
      <Breadcrumb />
      <div className={'bg-[#171825] shadow rounded p-[32px]'}></div>
      <Tabs
        activeTab={0}
        className='font-size-13 mt-4 p-[20px] shadow  bg-[#171825] rounded'
        ulClassName='text-muted  dark-border !justify-start'
        activityClassName='bg-primary !text-primary'
        children={[
          <Tab title='Usage History'>
            <div className={'min-h-[60vh]'}></div>
          </Tab>,
          <Tab title='Recharge History'>
            <div className={'min-h-[60vh]'}></div>
          </Tab>,
        ]}
      />
    </Fragment>
  )
}

export default Index
