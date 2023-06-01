import clsx from 'clsx'
import {KTSVG} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu} from '../../../partials'
import {useLayout} from '../../core'
import {useAuth} from '../../../../app/modules/auth'
import {DisplayImage} from '../../../../app/modules/widgets/components/General/DisplayImage'
import {useState} from 'react'

const itemClass = 'ms-1 ms-lg-3'
const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px'
const userAvatarClass = 'symbol-35px symbol-md-40px'
const btnIconClass = 'svg-icon-1'

const Navbar = () => {
  const {config} = useLayout()
  const {currentUser} = useAuth()
  const [blinker, setBlinker] = useState(false)
  const onBellIcon = () => {
    setBlinker(false)
  }
  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item align-items-stretch', itemClass)}>
        {/* <Search /> */}
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div id='kt_activities_toggle' className={btnClass}>
          <KTSVG path='/media/icons/duotune/general/gen032.svg' className={btnIconClass} />
        </div>
      </div>
      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          className={btnClass}
        >
          <div className={clsx('position-relative', btnClass)} onClick={onBellIcon}>
            <KTSVG path='/media/icons/header/NotificationIcon.svg' className={btnIconClass} />
            <span
              className={` ${
                blinker
                  ? ' animation-blink bg-success bullet bullet-dot h-6px w-6px position-absolute translate-middle top-0 start-50'
                  : 'bullet bullet-dot h-6px w-6px position-absolute translate-middle top-0 start-50'
              }`}
            />
          </div>{' '}
        </div>
        <HeaderNotificationsMenu blinker={blinker} setBlinker={setBlinker} />
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <DisplayImage
            imgName={currentUser?.profileImg}
            width='100%'
            alt='profile'
            fit='contain'
          />
        </div>
        <HeaderUserMenu />
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <p className='m-1 fw-bold'>
          <span className='text-muted font-size-13'>Hi, </span>

          <span className='font-size-13'>{currentUser?.firstName}</span>
        </p>
      </div>
      {config.app?.header?.default?.menu?.display && (
        <div className='app-navbar-item d-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-35px h-35px'
            id='kt_app_header_menu_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className={btnIconClass} />
          </div>
        </div>
      )}
    </div>
  )
}

export {Navbar}
