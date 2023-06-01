import React from 'react'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useIntl} from 'react-intl'
import {InnerSidebar} from '../../widgets/components/General/InnerSidebar'
import {InvestorSidebarOptions} from '../../../core/_constants'

export const Update = () => {
  const {formatMessage} = useIntl()
  const {updateSidebarOptions} = InvestorSidebarOptions()
  return (
    <div className='d-md-flex mb-md-10'>
      <InnerSidebar sidebarOptions={updateSidebarOptions} />
      <div className={`card mt-4 ms-md-10 ms-0`}>
        {/* begin::Header */}

        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-7 d-flex flex-column justify-content-between'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-bordered table-row-gray-300 align-middle gs-0 gy-3 '>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-normal text-muted '>
                  <th className='min-w-150px'>Title</th>
                  <th className='min-w-125px'>Created On</th>
                  <th className='min-w-90px'>Publish by</th>
                  <th className='min-w-90px'>Status</th>
                  <th className='min-w-125px'>Send Status</th>
                  <th className='min-w-90px'>Send</th>
                  <th className='min-w-90px '>Email Opened</th>
                  <th className='min-w-90px '>Updated Opened</th>
                  <th className='min-w-90px '>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                <tr>
                  <td>
                    <p className='text-dark   fs-6'>Template_102698</p>
                  </td>
                  <td>
                    <p className='text-dark   d-block mb-1 fs-6'>05/28/2020</p>
                  </td>
                  <td>
                    <div className='text-dark   d-block mb-1 fs-6'>
                      <img
                        src={toAbsoluteUrl('/media/icons/investor/table-user.svg')}
                        alt='table user'
                      />
                    </div>
                  </td>
                  <td>
                    <p className='text-dark   d-block mb-1 fs-6'>Draft</p>
                  </td>
                  <td>
                    <div className='   d-block mb-1 fs-6'>
                      <img
                        src={toAbsoluteUrl('/media/icons/investor/send_status_green.svg')}
                        alt='send status'
                      />
                    </div>
                  </td>
                  <td className='text-dark   fs-6'>0</td>
                  <td className='text-dark   fs-6'>0</td>
                  <td className='text-dark   fs-6'>0</td>
                  <td>
                    <div className='kebab-pin-container d-flex justify-content-center align-items-center'>
                      <i className='bi-three-dots-vertical '></i>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className='text-dark   fs-6'>Template_102698</p>
                  </td>
                  <td>
                    <p className='text-dark   d-block mb-1 fs-6'>05/28/2020</p>
                  </td>
                  <td>
                    <div className='text-dark   d-block mb-1 fs-6'>
                      <img
                        src={toAbsoluteUrl('/media/icons/investor/table-user.svg')}
                        alt='table user'
                      />
                    </div>
                  </td>
                  <td>
                    <p className='text-dark   d-block mb-1 fs-6'>Draft</p>
                  </td>
                  <td>
                    <div className='   d-block mb-1 fs-6'>
                      <img
                        src={toAbsoluteUrl('/media/icons/investor/send_status_green.svg')}
                        alt='send status'
                      />
                    </div>
                  </td>
                  <td className='text-dark   fs-6'>0</td>
                  <td className='text-dark   fs-6'>0</td>
                  <td className='text-dark   fs-6'>0</td>
                  <td>
                    <div className='kebab-pin-container d-flex justify-content-center align-items-center'>
                      <i className='bi-three-dots-vertical '></i>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className='text-dark   fs-6'>Template_102698</p>
                  </td>
                  <td>
                    <p className='text-dark   d-block mb-1 fs-6'>05/28/2020</p>
                  </td>
                  <td>
                    <div className='text-dark   d-block mb-1 fs-6'>
                      <img
                        src={toAbsoluteUrl('/media/icons/investor/table-user.svg')}
                        alt='table user'
                      />
                    </div>
                  </td>
                  <td>
                    <p className='text-dark   d-block mb-1 fs-6'>Draft</p>
                  </td>
                  <td>
                    <div className='   d-block mb-1 fs-6'>
                      <img
                        src={toAbsoluteUrl('/media/icons/investor/send_status_green.svg')}
                        alt='send status'
                      />
                    </div>
                  </td>
                  <td className='text-dark   fs-6'>0</td>
                  <td className='text-dark   fs-6'>0</td>
                  <td className='text-dark   fs-6'>0</td>
                  <td>
                    <div className='kebab-pin-container d-flex justify-content-center align-items-center'>
                      <i className='bi-three-dots-vertical '></i>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className='text-dark   fs-6'>Template_102698</p>
                  </td>
                  <td>
                    <p className='text-dark   d-block mb-1 fs-6'>05/28/2020</p>
                  </td>
                  <td>
                    <div className='text-dark   d-block mb-1 fs-6'>
                      <img
                        src={toAbsoluteUrl('/media/icons/investor/table-user.svg')}
                        alt='table user'
                      />
                    </div>
                  </td>
                  <td>
                    <p className='text-dark   d-block mb-1 fs-6'>Draft</p>
                  </td>
                  <td>
                    <div className='   d-block mb-1 fs-6'>
                      <img
                        src={toAbsoluteUrl('/media/icons/investor/send_status_green.svg')}
                        alt='send status'
                      />
                    </div>
                  </td>
                  <td className='text-dark   fs-6'>0</td>
                  <td className='text-dark   fs-6'>0</td>
                  <td className='text-dark   fs-6'>0</td>
                  <td>
                    <div className='kebab-pin-container d-flex justify-content-center align-items-center'>
                      <i className='bi-three-dots-vertical '></i>
                    </div>
                  </td>
                </tr>
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
          <div className='d-md-flex justify-content-md-end d-flex justify-content-center  w-100 mt-10 '>
            <button className='btn btn-primary fw-normal fs-md-7 fs-5 w-100 h-50px w-md-150px'>
              {formatMessage({id: 'View All Updates'})}
            </button>
          </div>
        </div>
        {/* begin::Body */}
      </div>
    </div>
  )
}
