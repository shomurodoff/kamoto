import React from 'react'
import '../../assets/index.css'
import Breadcrumb from '../dashboard/components/breadcrumb'
import Tabs, {Tab} from 'react-best-tabs'
const AiPersonalityPage = () => {
  return (
    <div className='h-[100vh] overflow-scroll px-5 py-3'>
      <Breadcrumb />
      <Tabs
        activeTab={1}
        className='font-size-13'
        ulClassName='text-muted  dark-border setting-tabs'
        activityClassName='bg-primary !text-primary'
        // onClick={(event, tab) => setKey(tab)}
      >
        <Tab title='Chat' className='mr-3'>
          <div className='mt-3'>Tab 1 content</div>
        </Tab>
        <Tab title='Posts' className='mr-3'>
          <div className='mt-3'>Tab 1 content</div>
        </Tab>
      </Tabs>
    </div>
  )
}

export {AiPersonalityPage}
