import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import filterIcon from '../../../../_metronic/assets/images/svg/data-room/Filter.svg'
import moreOptionsIcon from '../../../../_metronic/assets/images/svg/data-room/more-options-icon.svg'
import {KTSVG} from '../../../../_metronic/helpers'
import DataRoomsGrid from '../components/DataRoomsGrid'
import DataRoomsTable from '../components/DataRoomsTable'
function DataRoomsSpaces() {
  const [isView, setIsView] = useState(true)
  const handleClick = () => {
    setIsView(!isView)
  }
  return (
    <div className='data-rooms-spaces-wrapper'>
      <div className='Page_ToolBar-wrapper d-md-flex flex-row align-items-center justify-content-between'>
        <div className='Page_ToolBar-left'>
          <h5 className='mb-0'>Data Rooms</h5>
          <ul className='breadcrumb breadcrumb-line text-muted fs-6 fw-bold'>
            <li className='breadcrumb-item pe-3'>
              <Link to={`/`} className='pe-3 item_link'>
                Home
              </Link>
            </li>
            <li className='breadcrumb-item pe-3 text-muted'>Data Rooms</li>
          </ul>
        </div>
        <div className='Page_ToolBar-right d-flex flex-row align-items-center justify-content-md-end justify-content-between'>
          <button className='btn btn-bg-primary font-size-13 text-white font-weight-400 height-36 d-flex align-items-center justify-content-center '>
            Create Data Room
          </button>
          <div className='more-option bg-white'>
            <img src={moreOptionsIcon} alt=''></img>
          </div>
        </div>
      </div>
      <div className='spaces-toolbar-wrapper d-flex flex-md-row flex-column-reverse align-items-md-end justify-content-md-between'>
        <div className='all-data-rooms-head'>
          <p>All Data Rooms</p>
        </div>
        <div className='all-data-rooms-tools'>
          <div className='list-grid-toggle'>
            <div className={`grid-view ${isView ? 'active' : ''}`} onClick={handleClick}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clip-path='url(#clip0_4621_18294)'>
                  <path
                    d='M5 11C4.45 11 3.979 10.804 3.587 10.412C3.195 10.02 2.99934 9.54934 3 9V5C3 4.45 3.196 3.979 3.588 3.587C3.98 3.195 4.45067 2.99934 5 3H9C9.55 3 10.021 3.196 10.413 3.588C10.805 3.98 11.0007 4.45067 11 5V9C11 9.55 10.804 10.021 10.412 10.413C10.02 10.805 9.54934 11.0007 9 11H5ZM5 21C4.45 21 3.979 20.804 3.587 20.412C3.195 20.02 2.99934 19.5493 3 19V15C3 14.45 3.196 13.979 3.588 13.587C3.98 13.195 4.45067 12.9993 5 13H9C9.55 13 10.021 13.196 10.413 13.588C10.805 13.98 11.0007 14.4507 11 15V19C11 19.55 10.804 20.021 10.412 20.413C10.02 20.805 9.54934 21.0007 9 21H5ZM15 11C14.45 11 13.979 10.804 13.587 10.412C13.195 10.02 12.9993 9.54934 13 9V5C13 4.45 13.196 3.979 13.588 3.587C13.98 3.195 14.4507 2.99934 15 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V9C21 9.55 20.804 10.021 20.412 10.413C20.02 10.805 19.5493 11.0007 19 11H15ZM15 21C14.45 21 13.979 20.804 13.587 20.412C13.195 20.02 12.9993 19.5493 13 19V15C13 14.45 13.196 13.979 13.588 13.587C13.98 13.195 14.4507 12.9993 15 13H19C19.55 13 20.021 13.196 20.413 13.588C20.805 13.98 21.0007 14.4507 21 15V19C21 19.55 20.804 20.021 20.412 20.413C20.02 20.805 19.5493 21.0007 19 21H15Z'
                    fill={isView ? '#ffffff' : '#8898A6'}
                  />
                </g>
                <defs>
                  <clipPath id='clip0_4621_18294'>
                    <rect width='24' height='24' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className={`list-view ${!isView ? 'active' : ''}`} onClick={handleClick}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clip-path='url(#clip0_4588_18862)'>
                  <path
                    d='M4 10.5C3.17 10.5 2.5 11.17 2.5 12C2.5 12.83 3.17 13.5 4 13.5C4.83 13.5 5.5 12.83 5.5 12C5.5 11.17 4.83 10.5 4 10.5ZM4 4.5C3.17 4.5 2.5 5.17 2.5 6C2.5 6.83 3.17 7.5 4 7.5C4.83 7.5 5.5 6.83 5.5 6C5.5 5.17 4.83 4.5 4 4.5ZM4 16.5C3.17 16.5 2.5 17.18 2.5 18C2.5 18.82 3.18 19.5 4 19.5C4.82 19.5 5.5 18.82 5.5 18C5.5 17.18 4.83 16.5 4 16.5ZM7 19H21V17H7V19ZM7 13H21V11H7V13ZM7 5V7H21V5H7Z'
                    fill={!isView ? '#ffffff' : '#8898A6'}
                  />
                </g>
                <defs>
                  <clipPath id='clip0_4588_18862'>
                    <rect width='24' height='24' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className='all-data-rooms-filter d-flex flex-row align-items-center'>
            <img src={filterIcon} alt=''></img>
            <span className='d-md-block d-none'>Filter</span>
          </div>
          <div className='all-data-rooms-searchBar d-flex align-content-center bg-white '>
            <KTSVG
              path='/media/icons/duotune/general/gen021.svg'
              className='svg-icon-3 position-absolute '
            />
            <input
              type='text'
              className='bg-body form-control form-control-flush  font-size-13 font-weight-400  '
              name='search'
              placeholder='Search Data Room'
              data-kt-search-element='input'
              // onChange={(e) => storeSearchValue(e.target.value)}
            />
          </div>
          <div className='more-option bg-white'>
            <img src={moreOptionsIcon} alt=''></img>
          </div>
        </div>
      </div>

      <div className={`data-rooms-space-grid ${isView ? '' : 'd-none'}`}>
        <DataRoomsGrid />
      </div>

      <div className={`data-rooms-space-table bg-white ${!isView ? '' : 'd-none'}`}>
        <DataRoomsTable />
      </div>
    </div>
  )
}

export default DataRoomsSpaces
