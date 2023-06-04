/* eslint-disable react/jsx-no-target-blank */
import {Link} from 'react-router-dom'

const SidebarFooter = () => {
  return (
    <div
      className='app-sidebar-footer d-flex flex-column justify-content-end px-8 mb-10 '
      id='kt_app_sidebar_footer'
    >
      <Link to='/' target='_blank' data-bs-dismiss-='click' title='Metronic Docs & Components'>
        <div className='app-sidebar-logo-default logo-container-big h-20px' />
        <div className='logo-container-small h-20px app-sidebar-logo-minimize w-100 mt-1' />
      </Link>
    </div>
  )
}

export {SidebarFooter}
