import React from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers/AssetHelpers'

export const InfoCard = ({title, desc, slug}: {title: string; desc: string; slug: string}) => {
  return (
    <div className='bg-[#1A1B25] rounded px-5 pt-4 pb-2.5 mb-[14px]'>
      <div className='flex'>
        <div className='me-4'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              opacity='0.3'
              d='M4.85714 1H11.7364C12.0911 1 12.4343 1.12568 12.7051 1.35474L17.4687 5.38394C17.8057 5.66895 18 6.08788 18 6.5292V19.0833C18 20.8739 17.9796 21 16.1429 21H4.85714C3.02045 21 3 20.8739 3 19.0833V2.91667C3 1.12612 3.02045 1 4.85714 1ZM8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12H8ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H11C11.5523 18 12 17.5523 12 17C12 16.4477 11.5523 16 11 16H8Z'
              fill='#C2D24B'
            />
            <path
              d='M6.85714 3H14.7364C15.0911 3 15.4343 3.12568 15.7051 3.35474L20.4687 7.38394C20.8057 7.66895 21 8.08788 21 8.5292V21.0833C21 22.8739 20.9796 23 19.1429 23H6.85714C5.02045 23 5 22.8739 5 21.0833V4.91667C5 3.12612 5.02045 3 6.85714 3ZM8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12H8ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H11C11.5523 18 12 17.5523 12 17C12 16.4477 11.5523 16 11 16H8Z'
              fill='#C2D24B'
            />
          </svg>
        </div>
        <div>
          <div className='text-[#FFFFFFCC] text-[13px] leading-5 font-medium mb-1'>{title}</div>
          <div dangerouslySetInnerHTML={{__html: desc}} />
          <div className='d-flex justify-content-end'>
            <Link
              to={slug}
              className='text-[#C2D24B] text-[12px] leading-[18px] font-medium flex items-center'
            >
              Learn More{' '}
              <span className=''>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    opacity='0.3'
                    d='M4.00065 7.33268C3.63246 7.33268 3.33398 7.63116 3.33398 7.99935C3.33398 8.36754 3.63246 8.66602 4.00065 8.66602H12.0007C12.3688 8.66602 12.6673 8.36754 12.6673 7.99935C12.6673 7.63116 12.3688 7.33268 12.0007 7.33268H4.00065Z'
                    fill='#C2D24B'
                  />
                  <path
                    d='M7.52794 11.5279C7.26759 11.7883 7.26759 12.2104 7.52794 12.4708C7.78829 12.7311 8.2104 12.7311 8.47075 12.4708L12.4708 8.47075C12.7231 8.21837 12.732 7.81198 12.4908 7.54887L8.82412 3.54887C8.57532 3.27746 8.15361 3.25912 7.8822 3.50791C7.61079 3.75671 7.59245 4.17842 7.84125 4.44983L11.0766 7.9793L7.52794 11.5279Z'
                    fill='#C2D24B'
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
