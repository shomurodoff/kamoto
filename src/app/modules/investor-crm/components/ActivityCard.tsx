import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {activityModel} from '../core/_models'
import {DateTime} from 'luxon'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {downloadFileSigned, editActivity, exportAcivity} from '../core/_requests'
import {toast} from 'react-toastify'
import {useDateFormat} from '../../../hooks/useDateFormat'
import {useTimeZone} from '../../../hooks/useTimeZone'
import {EditActivityModal} from '../views/EditActivityModal'
import {DisplayImage} from '../../widgets/components/General/DisplayImage'
import {useThemeMode} from '../../../../_metronic/partials'

export const ActivityCard = ({
  activity,
  index,
  length,
  getActivity,
  investorId,
}: {
  activity: activityModel
  index: number
  length: number
  getActivity: () => void
  investorId: number
}) => {
  const {mode} = useThemeMode()
  const {formatMessage} = useIntl()
  const [showKebabMenu, setShowKebabMenu] = useState(false)
  const [editActivityModal, setEditActivityModal] = useState(false)
  const [activityData, setActivityData] = useState<activityModel>()
  const {getDateValue} = useDateFormat()
  const {getTimeZoneValue} = useTimeZone()
  const onSubmitActivity = async (activityId: number) => {
    try {
      if (activityId) {
        const {
          data: {success, errors},
        } = await editActivity({activityId, status: 'done'})
        if (success) {
          getActivity()
          toast.success(formatMessage({id: 'Acitivity successfully mark as done'}))
          setShowKebabMenu(!showKebabMenu)
        } else {
          setShowKebabMenu(!showKebabMenu)
          errors.forEach((error: string) => {
            toast.error(formatMessage({id: error}))
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  const onExportActivity = async (activityId: number) => {
    try {
      if (activityId) {
        const {
          data: {data: values, success, errors},
        } = await exportAcivity({activityId})
        if (success) {
          toast.success(formatMessage({id: 'downloading activity...'}))
          setShowKebabMenu(!showKebabMenu)
          const url = window.URL.createObjectURL(new Blob([values]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'activity.csv')
          document.body.appendChild(link)
          link.click()
          link.remove()
        } else {
          setShowKebabMenu(!showKebabMenu)
          errors.forEach((error: string) => {
            toast.error(formatMessage({id: error}))
          })
        }
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  const onDownloadActivity = async (activityName: string) => {
    const {
      data: {data: signedUrl, success},
    } = await downloadFileSigned(activityName)
    if (success) {
      const a = document.createElement('a')
      a.href = signedUrl
      a.download = 'download'
      document.body.appendChild(a)
      a.click()
      a.remove()
      document.body.removeChild(a)
    }
  }
  return (
    <>
      {(() => {
        switch (activity?.activityType) {
          case 'call':
            return (
              <div className=' w-100 d-md-flex justify-content-md-center d-flex justify-content-start '>
                <div className='d-flex align-items-center me-2 position-relative'>
                  <img
                    src={
                      mode === 'dark'
                        ? toAbsoluteUrl('/media/icons/investor/ic_dark_call.svg')
                        : toAbsoluteUrl('/media/icons/investor/ic_call.svg')
                    }
                    alt='call icon'
                    className='w-25px h-25px w-md-40px h-md-40px z-index-1'
                  />
                  <div
                    className={`timeline-line ${
                      length - 1 === index && length !== 1 ? 'timeline-update-last' : ' '
                    } ${0 === index && length !== 1 ? 'timeline-update-first' : ' '} ${
                      length === 1 && 'timeline-update-only-one'
                    }`}
                  ></div>
                </div>

                <div className='card  py-md-4 mb-4' onMouseLeave={() => setShowKebabMenu(false)}>
                  <div className='card-body p-0'>
                    <div className='d-flex justify-content-between border-bottom border-gray-300 px-5 pt-3 pt-md-0'>
                      <div className='overflow-auto d-flex flex-column gap-2'>
                        <p className='fs-6 fw-semibold m-0'>{activity?.title}</p>
                        <p className='fs-6'>{activity?.meetingNotes}</p>
                      </div>
                      <div>
                        <div
                          className={`kebab-pin-container d-flex justify-content-center align-items-center cursor-pointer ${
                            investorId < 0 ? 'd-none' : ''
                          }`}
                          onClick={() => setShowKebabMenu(!showKebabMenu)}
                        >
                          <i className='bi-three-dots-vertical '></i>
                        </div>
                        {showKebabMenu && (
                          <div className='card w-200px h-125px shadow rounded kebab-menu-dropdown-container cursor-pointer z-index-1'>
                            <div className='border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items'>
                              <button
                                type='button'
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                onClick={() => {
                                  onSubmitActivity(activity.activityId)
                                }}
                                disabled={activity.status === 'done' ? true : false}
                              >
                                {formatMessage({id: 'Mark as Done'})}
                              </button>
                            </div>
                            <div className='border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items'>
                              <button
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                disabled={activity.status === 'done' ? true : false}
                                onClick={() => {
                                  setEditActivityModal(true)
                                  setActivityData(activity)
                                }}
                              >
                                {formatMessage({id: 'Edit Activity'})}
                              </button>
                            </div>
                            <div className='px-4 py-3 dropdown-items'>
                              <button
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                onClick={() => {
                                  onExportActivity(activity.activityId)
                                }}
                              >
                                {formatMessage({id: 'Export to CSV'})}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='px-5 mt-md-4 mt-1 mb-2 mb-md-0 d-flex justify-content-between align-items-center'>
                      <p className='fs-7 m-0'>
                        <span>
                          {getDateValue(activity.startActivityTime?.toString())
                            ? getDateValue(activity.startActivityTime?.toString())
                            : DateTime.fromISO(
                                activity.startActivityTime?.toString()
                              ).toLocaleString(DateTime.DATE_HUGE)}{' '}
                          {getTimeZoneValue(activity.startActivityTime?.toString())}
                        </span>
                      </p>

                      <DisplayImage
                        imgName={activity?.activityImg?.name}
                        height='30px'
                        width='30px'
                        alt='profile'
                        fit='contain'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          case 'meeting':
            return (
              <div className=' w-100 d-md-flex justify-content-md-center d-flex justify-content-start '>
                <div className='d-flex align-items-center me-2 position-relative'>
                  <img
                    src={
                      mode === 'dark'
                        ? toAbsoluteUrl('/media/icons/investor/ic_dark_meeting.svg')
                        : toAbsoluteUrl('/media/icons/investor/ic_meeting.svg')
                    }
                    alt='meeting icon'
                    className='w-25px h-25px w-md-40px h-md-40px z-index-1'
                  />
                  <div
                    className={`timeline-line ${
                      length - 1 === index && length !== 1 ? 'timeline-update-last' : ' '
                    } ${0 === index && length !== 1 ? 'timeline-update-first' : ' '} ${
                      length === 1 && 'timeline-update-only-one'
                    }`}
                  ></div>
                </div>

                <div className='card  py-md-4 mb-4' onMouseLeave={() => setShowKebabMenu(false)}>
                  <div className='card-body p-0'>
                    <div className='d-flex justify-content-between border-bottom border-gray-300 px-5 pt-3 pt-md-0'>
                      <div className='overflow-auto d-flex flex-column gap-2'>
                        <p className='fs-6 fw-semibold m-0'>{activity?.title}</p>
                        <div className='d-flex align-items-center'>
                          <a className='text-primary fs-6' href={activity.meetingLink}>
                            {activity.meetingLink}
                          </a>
                          <span
                            className='input-group-btn border-left-0 text-primary'
                            style={{borderColor: '#e4e6ef !important'}}
                            onClick={() => {
                              navigator.clipboard.writeText(`${activity?.meetingLink}`)
                              toast.success(formatMessage({id: 'Copied Successfully'}))
                            }}
                          >
                            <i className='fa fa-copy  btn'></i>
                          </span>
                        </div>
                        <p className='fs-6 m-0 text-muted'>{activity?.meetingNotes}</p>
                      </div>

                      <div>
                        <div
                          className={`kebab-pin-container d-flex justify-content-center align-items-center cursor-pointer ${
                            investorId < 0 ? 'd-none' : ''
                          }`}
                          onClick={() => setShowKebabMenu(!showKebabMenu)}
                        >
                          <i className='bi-three-dots-vertical '></i>
                        </div>
                        {showKebabMenu && (
                          <div className='card w-200px h-125px shadow rounded kebab-menu-dropdown-container cursor-pointer z-index-1'>
                            <div className='border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items'>
                              <button
                                type='button'
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                disabled={activity.status === 'done' ? true : false}
                                onClick={() => {
                                  onSubmitActivity(activity.activityId)
                                }}
                              >
                                {formatMessage({id: 'Mark as Done'})}
                              </button>
                            </div>
                            <div className='border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items'>
                              <button
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                disabled={activity.status === 'done' ? true : false}
                                onClick={() => {
                                  setEditActivityModal(true)
                                  setActivityData(activity)
                                }}
                              >
                                {formatMessage({id: 'Edit Activity'})}
                              </button>
                            </div>
                            <div className='px-4 py-3 dropdown-items'>
                              <button
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                onClick={() => {
                                  onExportActivity(activity.activityId)
                                }}
                              >
                                {formatMessage({id: 'Export to CSV'})}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='px-5 mt-md-4 mt-1 mb-2 mb-md-0 d-flex justify-content-between align-items-center'>
                      <p className='fs-7 m-0'>
                        {/* <span>Friday, 15 Jan 2024</span> <span>3:30 - 4:00pm</span> */}
                        <span>
                          {getDateValue(activity.startActivityTime?.toString())
                            ? getDateValue(activity.startActivityTime?.toString())
                            : DateTime.fromISO(
                                activity.startActivityTime?.toString()
                              ).toLocaleString(DateTime.DATE_HUGE)}{' '}
                          {getTimeZoneValue(activity.startActivityTime?.toString())}
                        </span>
                      </p>

                      <DisplayImage
                        imgName={activity?.activityImg?.name}
                        height='30px'
                        width='30px'
                        alt='profile'
                        fit='contain'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          case 'tasks':
            return (
              <div className=' w-100 d-md-flex justify-content-md-center d-flex justify-content-start '>
                <div className='d-flex align-items-center me-2 position-relative'>
                  <img
                    src={
                      mode === 'dark'
                        ? toAbsoluteUrl('/media/icons/investor/ic_dark_tasks.svg')
                        : toAbsoluteUrl('/media/icons/investor/ic_tasks.svg')
                    }
                    alt='tasks icon'
                    className='w-25px h-25px w-md-40px h-md-40px z-index-1'
                  />
                  <div
                    className={`timeline-line ${
                      length - 1 === index && length !== 1 ? 'timeline-update-last' : ' '
                    } ${0 === index && length !== 1 ? 'timeline-update-first' : ' '} ${
                      length === 1 && 'timeline-update-only-one'
                    }`}
                  ></div>
                </div>

                <div className='card  py-md-4 mb-4' onMouseLeave={() => setShowKebabMenu(false)}>
                  <div className='card-body p-0'>
                    <div className='d-flex justify-content-between border-bottom border-gray-300 px-5 pt-3 pt-md-0'>
                      <div className='overflow-auto d-flex flex-column gap-2'>
                        <p className='fs-6 fw-semibold m-0'>{activity?.title}</p>
                        <p className='fs-6 '>
                          {activity?.meetingNotes ? activity?.meetingNotes : '-'}
                        </p>
                      </div>

                      <div>
                        <div
                          className={`kebab-pin-container d-flex justify-content-center align-items-center cursor-pointer ${
                            investorId < 0 ? 'd-none' : ''
                          }`}
                          onClick={() => setShowKebabMenu(!showKebabMenu)}
                        >
                          <i className='bi-three-dots-vertical '></i>
                        </div>
                        {showKebabMenu && (
                          <div className='card w-200px h-125px shadow rounded kebab-menu-dropdown-container cursor-pointer z-index-1'>
                            <div className='border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items'>
                              <button
                                type='button'
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                disabled={activity.status === 'done' ? true : false}
                                onClick={() => {
                                  onSubmitActivity(activity.activityId)
                                }}
                              >
                                {formatMessage({id: 'Mark as Done'})}
                              </button>
                            </div>
                            <div className='border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items'>
                              <button
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                disabled={activity.status === 'done' ? true : false}
                                onClick={() => {
                                  setEditActivityModal(true)
                                  setActivityData(activity)
                                }}
                              >
                                {formatMessage({id: 'Edit Activity'})}
                              </button>
                            </div>
                            <div className='px-4 py-3 dropdown-items'>
                              <button
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                onClick={() => {
                                  onExportActivity(activity.activityId)
                                }}
                              >
                                {formatMessage({id: 'Export to CSV'})}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='px-5 mt-md-4 mt-1 mb-2 mb-md-0 d-flex justify-content-between align-items-center'>
                      <p className='fs-7 m-0'>
                        <span>
                          {getDateValue(activity.startActivityTime?.toString())
                            ? getDateValue(activity.startActivityTime?.toString())
                            : DateTime.fromISO(
                                activity.startActivityTime?.toString()
                              ).toLocaleString(DateTime.DATE_HUGE)}{' '}
                          {getTimeZoneValue(activity.startActivityTime?.toString())}
                        </span>
                      </p>

                      <DisplayImage
                        imgName={activity?.activityImg?.name}
                        height='30px'
                        width='30px'
                        alt='profile'
                        fit='contain'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          case 'email':
            return (
              <div className=' w-100 d-md-flex justify-content-md-center d-flex justify-content-start '>
                <div className='d-flex align-items-center me-2 position-relative'>
                  <img
                    src={
                      mode === 'dark'
                        ? toAbsoluteUrl('/media/icons/investor/ic_dark_mail.svg')
                        : toAbsoluteUrl('/media/icons/investor/ic_mail.svg')
                    }
                    alt='email icon'
                    className='w-25px h-25px w-md-40px h-md-40px z-index-1'
                  />
                  <div
                    className={`timeline-line ${
                      length - 1 === index && length !== 1 ? 'timeline-update-last' : ' '
                    } ${0 === index && length !== 1 ? 'timeline-update-first' : ' '} ${
                      length === 1 && 'timeline-update-only-one'
                    }`}
                  ></div>
                </div>

                <div className='card  py-md-4 mb-4' onMouseLeave={() => setShowKebabMenu(false)}>
                  <div className='card-body p-0'>
                    <div className='d-flex justify-content-between border-bottom border-gray-300 px-5 pt-3 pt-md-0'>
                      <div className='overflow-auto d-flex flex-column gap-2'>
                        <p className='fs-6 fw-semibold m-0'>{activity?.title}</p>
                        <p className='fs-6 '>
                          {activity?.meetingNotes ? activity?.meetingNotes : '-'}
                        </p>
                      </div>
                      <div>
                        <div
                          className={`kebab-pin-container d-flex justify-content-center align-items-center cursor-pointer ${
                            investorId < 0 ? 'd-none' : ''
                          }`}
                          onClick={() => setShowKebabMenu(!showKebabMenu)}
                        >
                          <i className='bi-three-dots-vertical '></i>
                        </div>
                        {showKebabMenu && (
                          <div className='card w-200px h-125px shadow rounded kebab-menu-dropdown-container cursor-pointer z-index-1'>
                            <div className='border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items'>
                              <button
                                type='button'
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                onClick={() => {
                                  onSubmitActivity(activity.activityId)
                                }}
                                disabled={activity.status === 'done' ? true : false}
                              >
                                {formatMessage({id: 'Mark as Done'})}
                              </button>
                            </div>
                            <div className='border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items'>
                              <button
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                disabled={activity.status === 'done' ? true : false}
                                onClick={() => {
                                  setEditActivityModal(true)
                                  setActivityData(activity)
                                }}
                              >
                                {formatMessage({id: 'Edit Activity'})}
                              </button>
                            </div>
                            <div className='px-4 py-3 dropdown-items'>
                              <button
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                onClick={() => {
                                  onExportActivity(activity.activityId)
                                }}
                              >
                                {formatMessage({id: 'Export to CSV'})}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='px-5 mt-md-4 mt-1 mb-2 mb-md-0 d-flex justify-content-between align-items-center'>
                      <p className='fs-7 m-0'>
                        <span>
                          {getDateValue(activity.startActivityTime?.toString())
                            ? getDateValue(activity.startActivityTime?.toString())
                            : DateTime.fromISO(
                                activity.startActivityTime?.toString()
                              ).toLocaleString(DateTime.DATE_HUGE)}{' '}
                          {getTimeZoneValue(activity.startActivityTime?.toString())}
                        </span>
                      </p>
                      <DisplayImage
                        imgName={activity?.activityImg?.name}
                        height='30px'
                        width='30px'
                        alt='profile'
                        fit='contain'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          case 'notes':
            return (
              <div className=' w-100 d-md-flex justify-content-md-center d-flex justify-content-start '>
                <div className='d-flex align-items-center me-2 position-relative'>
                  <img
                    src={
                      mode === 'dark'
                        ? toAbsoluteUrl('/media/icons/investor/ic_dark_notes.svg')
                        : toAbsoluteUrl('/media/icons/investor/ic_notes.svg')
                    }
                    alt='notes icon'
                    className='w-25px h-25px w-md-40px h-md-40px z-index-1'
                  />
                  <div
                    className={`timeline-line ${
                      length - 1 === index && length !== 1 ? 'timeline-update-last' : ' '
                    } ${0 === index && length !== 1 ? 'timeline-update-first' : ' '} ${
                      length === 1 && 'timeline-update-only-one'
                    }`}
                  ></div>
                </div>

                <div className='card  py-md-4 mb-4' onMouseLeave={() => setShowKebabMenu(false)}>
                  <div className='card-body p-0'>
                    <div className='d-flex justify-content-between border-bottom border-gray-300 px-5 pt-3 pt-md-0'>
                      <div className='overflow-auto d-flex flex-column gap-2'>
                        <p className='fs-6 fw-semibold m-0'>{activity?.title}</p>
                        <p className='text-primary fs-6 '>
                          {activity?.meetingNotes ? activity?.meetingNotes : '-'}
                        </p>
                      </div>
                      <div>
                        <div
                          className={`kebab-pin-container d-flex justify-content-center align-items-center cursor-pointer ${
                            investorId < 0 ? 'd-none' : ''
                          }`}
                          onClick={() => setShowKebabMenu(!showKebabMenu)}
                        >
                          <i className='bi-three-dots-vertical '></i>
                        </div>
                        {showKebabMenu && (
                          <div className='card w-200px h-125px shadow rounded kebab-menu-dropdown-container cursor-pointer z-index-1'>
                            <div className='border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items'>
                              <button
                                type='button'
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                onClick={() => {
                                  onSubmitActivity(activity.activityId)
                                }}
                                disabled={activity.status === 'done' ? true : false}
                              >
                                {formatMessage({id: 'Mark as Done'})}
                              </button>
                            </div>
                            <div className='border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items'>
                              <button
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                disabled={activity.status === 'done' ? true : false}
                                onClick={() => {
                                  setEditActivityModal(true)
                                  setActivityData(activity)
                                }}
                              >
                                {formatMessage({id: 'Edit Activity'})}
                              </button>
                            </div>
                            <div className='px-4 py-3 dropdown-items'>
                              <button
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                onClick={() => {
                                  onExportActivity(activity.activityId)
                                }}
                              >
                                {formatMessage({id: 'Export to CSV'})}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='px-5 mt-md-4 mt-1 mb-2 mb-md-0 d-flex justify-content-between align-items-center'>
                      <p className='fs-7 m-0'>
                        <span>
                          {getDateValue(activity.startActivityTime?.toString())
                            ? getDateValue(activity.startActivityTime?.toString())
                            : DateTime.fromISO(
                                activity.startActivityTime?.toString()
                              ).toLocaleString(DateTime.DATE_HUGE)}{' '}
                          {getTimeZoneValue(activity.startActivityTime?.toString())}
                        </span>
                      </p>

                      <DisplayImage
                        imgName={activity?.activityImg?.name}
                        height='30px'
                        width='30px'
                        alt='profile'
                        fit='contain'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          case 'documents':
            return (
              <div className=' w-100 d-md-flex justify-content-md-center d-flex justify-content-start '>
                <div className='d-flex align-items-center me-2 position-relative'>
                  <img
                    src={
                      mode === 'dark'
                        ? toAbsoluteUrl('/media/icons/investor/ic_dark_documents.svg')
                        : toAbsoluteUrl('/media/icons/investor/ic_documents.svg')
                    }
                    alt='documents icon'
                    className='w-25px h-25px w-md-40px h-md-40px z-index-1'
                  />
                  <div
                    className={`timeline-line ${
                      length - 1 === index && length !== 1 ? 'timeline-update-last' : ' '
                    } ${0 === index && length !== 1 ? 'timeline-update-first' : ' '} ${
                      length === 1 && 'timeline-update-only-one'
                    }`}
                  ></div>
                </div>

                <div className='card  py-md-4 mb-4' onMouseLeave={() => setShowKebabMenu(false)}>
                  <div className='card-body p-0'>
                    <div className='d-flex justify-content-between border-bottom border-gray-300 px-5 pt-3 pt-md-0'>
                      <div className='overflow-auto d-flex flex-column gap-2'>
                        <p className='fs-6 fw-semibold m-0'>{activity?.title}</p>
                        <p className='fs-6'>
                          {activity.meetingNotes ? activity.meetingNotes : '-'}
                        </p>

                        <div className='d-flex flex-wrap pb-5'>
                          {activity?.documentImg && (
                            <div
                              className='d-flex flex-aligns-center pe-10 pe-lg-20'
                              key={activity?.documentImg.fileId}
                            >
                              {activity?.documentImg.name.split('.').pop() === 'pdf' ? (
                                <>
                                  <img
                                    alt=''
                                    className='w-30px me-3'
                                    src={toAbsoluteUrl('/media/svg/files/pdf.svg')}
                                  />

                                  <div className='ms-1'>
                                    <p
                                      className='fs-6 text-hover-primary cursor-pointer'
                                      onClick={() => onDownloadActivity(activity?.documentImg.name)}
                                    >
                                      {activity?.documentImg.name}
                                    </p>
                                  </div>
                                </>
                              ) : activity?.documentImg.name.split('.').pop() === 'png' ||
                                activity?.documentImg.name.split('.').pop() === 'jpg' ? (
                                <>
                                  <img
                                    alt=''
                                    className='w-30px me-3'
                                    src={toAbsoluteUrl('/media/svg/files/blank-image.svg')}
                                  />

                                  <div className='ms-1'>
                                    <p className='fs-6 text-hover-primary'>
                                      {activity?.documentImg.name}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <div className='ms-1'>
                                  <p className='fs-6 text-hover-primary'>
                                    {activity?.documentImg.name}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div
                          className={`kebab-pin-container d-flex justify-content-center align-items-center cursor-pointer ${
                            investorId < 0 ? 'd-none' : ''
                          }`}
                          onClick={() => setShowKebabMenu(!showKebabMenu)}
                        >
                          <i className='bi-three-dots-vertical '></i>
                        </div>
                        {showKebabMenu && (
                          <div className='card w-200px h-125px shadow rounded kebab-menu-dropdown-container cursor-pointer z-index-1'>
                            <div className='border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items'>
                              <button
                                type='button'
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                onClick={() => {
                                  onSubmitActivity(activity.activityId)
                                }}
                                disabled={activity.status === 'done' ? true : false}
                              >
                                {formatMessage({id: 'Mark as Done'})}
                              </button>
                            </div>
                            <div className='border-bottom border-gray-300 border-bottom-2 px-4 py-3 dropdown-items'>
                              <button
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                disabled={activity.status === 'done' ? true : false}
                                onClick={() => {
                                  setEditActivityModal(true)
                                  setActivityData(activity)
                                }}
                              >
                                {formatMessage({id: 'Edit Activity'})}
                              </button>
                            </div>
                            <div className='px-4 py-3 dropdown-items'>
                              <button
                                className='m-0 border-0 bg-transparent dropdown_dark_text'
                                onClick={() => {
                                  onExportActivity(activity.activityId)
                                }}
                              >
                                {formatMessage({id: 'Export to CSV'})}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='px-5 mt-md-4 mt-1 mb-2 mb-md-0 d-flex justify-content-between align-items-center'>
                      <p className='fs-7 m-0'>
                        {/* <span>Friday, 15 Jan 2024</span> <span>3:30 - 4:00pm</span> */}
                        <span>
                          {getDateValue(activity.startActivityTime?.toString())
                            ? getDateValue(activity.startActivityTime?.toString())
                            : DateTime.fromISO(
                                activity.startActivityTime?.toString()
                              ).toLocaleString(DateTime.DATE_HUGE)}{' '}
                          {getTimeZoneValue(activity.startActivityTime?.toString())}
                        </span>
                      </p>

                      <DisplayImage
                        imgName={activity?.activityImg?.name}
                        height='30px'
                        width='30px'
                        alt='profile'
                        fit='contain'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
        }
      })()}
      <EditActivityModal
        modalShow={editActivityModal}
        setModalShow={setEditActivityModal}
        activityData={activityData}
        investorId={investorId}
        getActivity={getActivity}
      />
    </>
  )
}
