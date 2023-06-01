import React from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers/AssetHelpers'

export const InfoCard = ({title,desc,slug}:{title:string,desc:string,slug:string}) => {
  return (
    <div className='info-card important-notice-card'>
      <div className='card mt-0 fs-6 flex-row mb-md-4 mb-8 '>
        <div className='me-4'>
          <img src={toAbsoluteUrl('/media/icons/duotune/general/file_image.svg')} alt='' />
        </div>
        <div>
          <div className=' fw-bold mb-1'>{title}</div>
          <div dangerouslySetInnerHTML={{__html: desc}}/>
            
          <div className='d-flex justify-content-end'>
            <Link to={slug} className='ms-1 link-primary'>
              Learn More{' '}
              <span className='ms-5'>
                <img src={toAbsoluteUrl('/media/icons/duotune/general/arrow-right.svg')} alt='' />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
