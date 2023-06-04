/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/sidebar/DashboardIcon.svg'
        activeIcon='/media/icons/sidebar/DashboardActiveIcon.svg'
        title={intl.formatMessage({id: 'Dashboard'})}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/my-ai'
        icon='/media/icons/sidebar/MyAiIcon.svg'
        activeIcon='/media/icons/sidebar/MyAiActiveIcon.svg'
        title={intl.formatMessage({id: 'My AI Personality'})}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/train-my-ai'
        icon='/media/icons/sidebar/TrainAi.svg'
        activeIcon='/media/icons/sidebar/TrainAiActive.svg'
        title={intl.formatMessage({id: 'Train Your AI Personality'})}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/investor-crm'
        icon='/media/icons/sidebar/InvestorCrmIcon.svg'
        activeIcon='/media/icons/sidebar/InvestorCrmActiveIcon.svg'
        title={intl.formatMessage({id: 'Investor CRM'})}
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/investor-database'
        icon='/media/icons/sidebar/InvestorDatabaseIcon.svg'
        activeIcon='/media/icons/sidebar/InvestorDatabaseActiveIcon.svg'
        title={intl.formatMessage({id: 'Investor Database'})}
        fontIcon='bi-layers'
      />
      <SidebarMenuItemWithSub
        to='/data-rooms'
        title='Data Rooms'
        icon='/media/icons/sidebar/DataRoomsIcon.svg'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/data-rooms/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/data-rooms/spaces' title='Data Rooms' hasBullet={true} />
        <SidebarMenuItem to='/data-rooms/files' title='Files' hasBullet={true} />
      </SidebarMenuItemWithSub>

      {/* <SidebarMenuItemWithSub
        to='/settings'
        title='Data Rooms'
        icon='/media/icons/sidebar/DataRoomsIcon.svg'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/settings/user' title='User' hasBullet={true} />
        <SidebarMenuItem to='/settings/company' title='Company' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/overview' title='Spaces' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Send Emails' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/overview' title='People' hasBullet={true} />
      </SidebarMenuItemWithSub> */}

      {/* <SidebarMenuItem
        to='/investor-updates'
        icon='/media/icons/sidebar/InvestorUpdateIcon.svg'
        title='Investor Updates'
        fontIcon='bi-layers'
      /> */}
      {/* <SidebarMenuItem
        to='/company-page/'
        icon='/media/icons/sidebar/CompanyPageIcon.svg'
        title='Company Page'
        fontIcon='bi-layers'
      /> */}
      <SidebarMenuItem
        to='/settings'
        icon='/media/icons/sidebar/SettingIcon.svg'
        activeIcon='/media/icons/sidebar/SettingActiveIcon.svg'
        title={intl.formatMessage({id: 'Settings'})}
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/support'
        icon='/media/icons/sidebar/Support.svg'
        activeIcon='/media/icons/sidebar/SupportActive.svg'
        title={intl.formatMessage({id: 'Support'})}
        fontIcon='bi-app-indicator'
      />
      {/* <SidebarMenuItem
        to='/training-hub'
        icon='/media/icons/sidebar/TrainingHubIcon.svg'
        title='Training Hub'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/founder-market'
        icon='/media/icons/sidebar/FounderMarketIcon.svg'
        title='Founder Market'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/support'
        icon='/media/icons/sidebar/SupportIcon.svg'
        title='Support'
        fontIcon='bi-layers'
      /> */}
    </>
  )
}

export {SidebarMenuMain}
