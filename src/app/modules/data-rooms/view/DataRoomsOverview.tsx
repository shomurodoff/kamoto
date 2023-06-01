import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import OverviewStats from '../components/OverviewStats'
import RecentVisitsTable from '../components/RecentVisitsTable'
function DataRoomsOverview() {
  const [progress, setProgress] = useState<string>('1')
  return (
    <div className='data-rooms-overview-wrapper'>
      <div className='Page_ToolBar-wrapper d-md-flex flex-row align-items-center justify-content-between'>
        <div className='Page_ToolBar-left'>
          <h5 className='mb-0'>Overview</h5>
          <ul className='breadcrumb breadcrumb-line text-muted fs-6 fw-bold'>
            <li className='breadcrumb-item pe-3'>
              <Link to={`/`} className='pe-3 item_link'>
                Home
              </Link>
            </li>
            <li className='breadcrumb-item pe-3 text-muted'>Data Rooms Overview</li>
          </ul>
        </div>
        <div className='Page_ToolBar-right d-flex flex-row align-items-center justify-content-md-end justify-content-between'>
          <select
            className='form-select form-select-sm   form-select-solid height-36 bg-white border-1 border-dark border-opacity-10 '
            data-control='select2'
            data-placeholder='Last week'
            data-hide-search='true'
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
          >
            <option value=''></option>
            <option value='1'>Last week</option>
            <option value='2'>Last day</option>
            <option value='3'>Last month</option>
          </select>
          <button className='btn btn-bg-primary font-size-13 text-white font-weight-400 height-36 d-flex align-items-center justify-content-center '>
            Add new file
          </button>
        </div>
      </div>
      <OverviewStats />
      <RecentVisitsTable />
    </div>
  )
}

export default DataRoomsOverview
