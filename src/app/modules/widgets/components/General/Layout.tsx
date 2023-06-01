import {useEffect} from 'react'
import {Link, Outlet, useLocation} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers/AssetHelpers'
import {useIntl} from 'react-intl'
import AuthBg from '../../../../assets/images/auth/auth-background.png'
export const Layout = () => {
  const {formatMessage} = useIntl()
  const {pathname} = useLocation()
  const pathArray = [
    '/terms-of-use',
    '/privacy-policy',
    '/onboarding/',
    '/onboarding/company-details',
    '/onboarding/initialize-round',
    '/onboarding/team-members',
  ]
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    // <div className={pathArray.includes(pathname) ? `founder-crate-background` : 'founder-crate-bg'}>
    //   <div className='align-items-md-center col-12 d-md-flex flex-md-column justify-content-md-between'>
    //     <div className='founder-create-logo d-flex justify-content-center mb-8 mt-10'>
    //       <img src={toAbsoluteUrl('/media/auth/founderCrateLogo.svg')} alt='Logo' />
    //     </div>
    //     <div
    //       className={`d-flex flex-center flex-column  radial-bg  ${
    //         pathArray.includes(pathname) ? 'col-md-10' : 'col-3-5'
    //       }`}
    //     >
    //       <div className='w-100 px-5 pt-11 px-md-20 pt-md-15 pb-md-12 card card-stretch mb-8 '>
    //         <Outlet />
    //       </div>
    //       <div className='d-md-flex flex-md-row fw-semibold text-gray-500 fs-base justify-content-md-between w-100 d-flex flex-column align-items-center'>
    //         <p
    //           className='text-gray-500 m-0'
    //           dangerouslySetInnerHTML={{__html: formatMessage({id: '2023 &copy; Foundercrate'})}}
    //         />
    //         <div className='d-flex'>
    //           <Link to='/terms-of-use' className='me-4 text-gray-500'>
    //             {formatMessage({id: 'Terms of use'})}
    //           </Link>
    //
    //           <Link to='/privacy-policy' className='text-gray-500'>
    //             {formatMessage({id: 'Privacy Policy'})}
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
      style={{
        backgroundImage: `url(${AuthBg})`,
      }}
      className={'bg-cover bg-center bg-no-repeat h-full'}
    >
      <Outlet />
    </div>
  )
}
