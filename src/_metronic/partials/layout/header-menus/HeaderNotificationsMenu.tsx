/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import '../style/header.scss'
import {useIntl} from 'react-intl'
import {getAllNotifications, getNotifications} from '../core/_requests'
import {useAuth} from '../../../../app/modules/auth'
import {toast} from 'react-toastify'
import {Toaster} from '../../../../app/modules/widgets/components/General/Toaster'
import {DateTime} from 'luxon'
const HeaderNotificationsMenu = ({blinker, setBlinker}: {blinker: boolean; setBlinker: any}) => {
  const {formatMessage} = useIntl()
  const {companyId} = useAuth()
  const [alerts, setAlert] = useState<any>()
  const [logs, setLog] = useState<any>()
  const [updates, setUpdate] = useState<any>()
  const [length, setLength] = useState<number>()

  const notifications = async () => {
    let notificationId = localStorage.getItem('notificationId') || ''
    try {
      const {
        data: {data, success, errors},
      } = await getNotifications(companyId)
      if (success) {
        if (data.length > 0) {
          if (!notificationId) {
            localStorage.setItem('notificationId', data[0].notificationId)
            notificationId = data[0].notificationId
            setBlinker(true)
          } else if (data[0].notificationId > parseInt(notificationId)) {
            setBlinker(true)
            localStorage.setItem('notificationId', data[0].notificationId)
          }
        }
        setLength(data.length)

        setAlert(
          data.filter((e: any) => {
            return e.type === 'alerts'
          })
        )
        setLog(
          data.filter((e: any) => {
            return e.type === 'logs'
          })
        )
        setUpdate(
          data.filter((e: any) => {
            return e.type === 'updates'
          })
        )
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const allNotifications = async () => {
    try {
      const {
        data: {data, success, errors},
      } = await getAllNotifications(companyId)
      if (success) {
        setLength(data.length)
        setAlert(
          data.filter((e: any) => {
            return e.type === 'alerts'
          })
        )
        setLog(
          data.filter((e: any) => {
            return e.type === 'logs'
          })
        )
        setUpdate(
          data.filter((e: any) => {
            return e.type === 'updates'
          })
        )
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (companyId) {
      notifications()
    }
  }, [companyId]) // eslint-disable-line react-hooks/exhaustive-deps

  const showDate = (date: any) => {
    const days =
      date && DateTime.utc().diff(DateTime.fromISO(date), ['days', 'hours']).toObject().days
    const hours = Math.abs(
      Math.floor(
        date && DateTime.utc().diff(DateTime.fromISO(date), ['days', 'hours']).toObject().hours
      )
    )
    if (days === 0) {
      return `${hours} hrs`
    } else if (days === 7) {
      return '1 week'
    } else if (days < 7) {
      return `${days} days`
    } else {
      return DateTime.fromISO(date).toFormat('MMM dd')
    }
  }
  return (
    <>
      <Toaster />
      <div
        className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px'
        data-kt-menu='true'
      >
        <div className='d-flex flex-column bgi-no-repeat rounded-top notification-header'>
          <h3 className='text-white fw-bold px-9 mt-6 mb-6 fs-2'>
            {formatMessage({id: 'Notifications'})}
            <span className='font-size-12 font-weight-400 opacity-75 ps-3'>
              {length} {formatMessage({id: 'reports'})}
            </span>
          </h3>
          <ul className='nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9 mt-n4'>
            <li className='nav-item'>
              <a
                className='nav-link text-white opacity-75 opacity-state-100  font-size-13 font-weight-500'
                data-bs-toggle='tab'
                href='#kt_topbar_notifications_1'
              >
                {formatMessage({id: 'Alerts'})}
              </a>
            </li>

            <li className='nav-item'>
              <a
                className='nav-link text-white opacity-75 opacity-state-100 active font-size-13 font-weight-500'
                data-bs-toggle='tab'
                href='#kt_topbar_notifications_2'
              >
                {formatMessage({id: 'Updates'})}
              </a>
            </li>

            <li className='nav-item'>
              <a
                className='nav-link text-white opacity-75 opacity-state-100 font-size-13 font-weight-500'
                data-bs-toggle='tab'
                href='#kt_topbar_notifications_3'
              >
                {formatMessage({id: 'Logs'})}
              </a>
            </li>
          </ul>
        </div>
        <div className='tab-content'>
          <div className='tab-pane fade show active' id='kt_topbar_notifications_2' role='tabpanel'>
            {updates?.length > 0 ? (
              <div className='scroll-y mh-325px my-5 px-8'>
                {updates &&
                  updates?.map((update: any, index: any) => (
                    <div key={`update${index}`} className='d-flex flex-stack py-4'>
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-35px me-4'>
                          <span className={clsx('symbol-label', `bg-light-success`)}>
                            <KTSVG
                              path={`/media/icons/duotune/technology/teh008.svg`}
                              className={`svg-icon-2 svg-icon-${update.state}`}
                            />
                          </span>
                        </div>

                        <div className='mb-0 me-2'>
                          <a
                            href='#'
                            className='fs-6 text-gray-800 text-hover-primary font-weight-600 dark_text_color'
                          >
                            {update.title}
                          </a>
                          <div className='text-clr5E font-weight-400 font-size-13'>
                            {update.content}
                          </div>
                        </div>
                      </div>

                      <span className='badge badge-light font-size-12 text-clr38 font-weight-500'>
                        {showDate(update?.createdAt)}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <div className='mx-6 mt-12 text-center'>
                <h4 className='font-size-14 font-weight-700'>
                  {formatMessage({id: 'No Notification found'})}
                </h4>
                <p className='font-size-13 font-weight-400'>
                  {formatMessage({
                    id: 'There are currently no notifications to display. Please check back later',
                  })}
                </p>
                <img
                  src={toAbsoluteUrl('/media/icons/header/notification_img.svg')}
                  alt='notification'
                  width={300}
                  height={200}
                  className='mt-17 mb-12'
                />
              </div>
            )}
            {updates?.length > 0 && (
              <div className='py-3 text-center border-top'>
                <Link
                  to='/crafted/pages/profile'
                  className='btn btn-color-gray-600 btn-active-color-primary'
                  onClick={allNotifications}
                >
                  {formatMessage({id: 'View All'})}
                  <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-5' />
                </Link>
              </div>
            )}
          </div>

          {/* <div className='tab-pane fade show active' id='kt_topbar_notifications_2' role='tabpanel'>
            <div className='d-flex flex-column px-9'>
              <div className='pt-10 pb-0'>
                <h3 className='text-clr38 text-center fw-bolder font-size-14'>Get Pro Access</h3>

                <div className='text-center  pt-1 font-size-13 font-weight-400 text-clr5E'>
                  Outlines keep you honest. They stoping you from amazing poorly about drive
                </div>

                <div className='text-center mt-5 mb-9'>
                  <a
                    href='#'
                    className='btn btn-sm btn-primary px-6'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_upgrade_plan'
                  >
                    Upgrade
                  </a>
                </div>
              </div>

              <div className='text-center px-4'>
                <img
                  className='mw-100 mh-250px mt-0'
                  alt='metronic'
                  src={toAbsoluteUrl('/media/icons/header/project-launch.svg')}
                />
              </div>
            </div>
          </div> */}
          <div className='tab-pane fade' id='kt_topbar_notifications_1' role='tabpanel'>
            {alerts?.length > 0 ? (
              <div className='scroll-y mh-325px my-5 px-8'>
                {alerts &&
                  alerts?.map((alert: any, index: any) => (
                    <div key={`alert${index}`} className='d-flex flex-stack py-4'>
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-35px me-4'>
                          <span className={clsx('symbol-label', `bg-light-success`)}>
                            <KTSVG
                              path={`/media/icons/duotune/technology/teh008.svg`}
                              className={`svg-icon-2 svg-icon-${alert.state}`}
                            />
                          </span>
                        </div>

                        <div className='mb-0 me-2'>
                          <a
                            href='#'
                            className='fs-6 text-gray-800 text-hover-primary font-weight-600 dark_text_color'
                          >
                            {alert?.title}
                          </a>
                          <div className='text-clr5E font-weight-400 font-size-13'>
                            {alert?.content}
                          </div>
                        </div>
                      </div>

                      <span className='badge badge-light font-size-12 text-clr38 font-weight-500'>
                        {showDate(alert?.createdAt)}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <div className='mx-6 mt-12 text-center'>
                <h4 className='font-size-14 font-weight-700'>
                  {formatMessage({id: 'No Notification found'})}
                </h4>
                <p className='font-size-13 font-weight-400'>
                  {formatMessage({
                    id: 'There are currently no notifications to display. Please check back later',
                  })}
                </p>
                <img
                  src={toAbsoluteUrl('/media/icons/header/notification_img.svg')}
                  alt='notification'
                  width={300}
                  height={200}
                  className='mt-17 mb-12'
                />
              </div>
            )}
            {alerts?.length > 0 && (
              <div className='py-3 text-center border-top'>
                <Link
                  to='/crafted/pages/profile'
                  className='btn btn-color-gray-600 btn-active-color-primary'
                  onClick={allNotifications}
                >
                  {formatMessage({id: 'View All'})}
                  <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-5' />
                </Link>
              </div>
            )}
          </div>

          <div className='tab-pane fade' id='kt_topbar_notifications_3' role='tabpanel'>
            {logs?.length > 0 ? (
              <div className='scroll-y mh-325px my-5 px-8'>
                {logs?.map((log: any, index: any) => (
                  <div key={`log${index}`} className='d-flex flex-stack py-4'>
                    <span
                      className={clsx(
                        'w-70px badge',
                        log.status.split(' ')[0][0] === '2'
                          ? `badge-light-success`
                          : `badge-light-danger`,
                        'me-4',
                        'font-size-12',
                        'justify-content-center px-3 py-2'
                      )}
                    >
                      {log.status}
                    </span>
                    <a
                      href='#'
                      className=' text-hover-primary fw-bold font-size-13 text-clr38 dark_text_color'
                    >
                      {log.title}
                    </a>
                    <span className='badge badge-light font-size-12 text-clr5E font-weight-500'>
                      {showDate(log?.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className='mx-6 mt-12 text-center'>
                <h4 className='font-size-14 font-weight-700'>
                  {formatMessage({id: 'No Notification found'})}
                </h4>
                <p className='font-size-13 font-weight-400'>
                  {formatMessage({
                    id: 'There are currently no notifications to display. Please check back later',
                  })}
                </p>
                <img
                  src={toAbsoluteUrl('/media/icons/header/notification_img.svg')}
                  alt='notification'
                  width={300}
                  height={200}
                  className='mt-17 mb-12'
                />
              </div>
            )}
            {logs?.length > 0 && (
              <div className='py-3 text-center border-top'>
                <Link
                  to='/crafted/pages/profile'
                  className='btn btn-color-gray-600 btn-active-color-primary font-size-14 text-clr5E '
                  onClick={allNotifications}
                >
                  {formatMessage({id: 'View All'})}
                  <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-5' />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export {HeaderNotificationsMenu}
