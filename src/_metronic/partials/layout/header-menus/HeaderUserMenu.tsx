/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import clsx from 'clsx'
import {ThemeModeSwitcher} from '../theme-mode/ThemeModeSwitcher'
import {DisplayImage} from '../../../../app/modules/widgets/components/General/DisplayImage'
import {useIntl} from 'react-intl'

const HeaderUserMenu: FC = () => {
  const navigate = useNavigate()
  const {currentUser, logout} = useAuth()
  const {formatMessage} = useIntl()
  const handleLogout = async () => {
    navigate('/auth/login');
    logout();
  }
  const itemClass = 'ms-1 ms-lg-3'
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-325px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <DisplayImage
              imgName={currentUser?.profileImg}
              width='100%'
              alt='profile'
              fit='contain'
            />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.first_name} {currentUser?.first_name}
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span>
            </div>
            <div className='fw-bold text-muted text-hover-primary fs-7 wrap'>
              {currentUser?.email}
            </div>
          </div>
        </div>
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
      </div>

      <Languages />

      <div className='menu-item px-5 my-1'>
        <Link to='/settings' className='menu-link px-5'>
          {formatMessage({id: 'Account Settings'})}
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a onClick={handleLogout} className='menu-link px-5'>
          {formatMessage({id: 'Sign Out'})}
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
