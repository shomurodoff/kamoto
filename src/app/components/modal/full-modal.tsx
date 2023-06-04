import React from 'react'
import clsx from 'clsx'

const FullModal: React.FC<any> = ({open, setOpen, children}) => {
  return (
    <div>
      <div
        className={clsx(
          'bg-[#11121C] z-[99999] fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto transition-all duration-1000',
          open ? 'translate-y-auto' : '-translate-y-full'
        )}
      >
        <div className={'p-[22px] gap-[24px] border-b border-[#2E2F45] flex items-center'}>
          <button onClick={() => setOpen(false)}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_344_28960)'>
                <path
                  d='M11.9997 10.586L16.9497 5.63599L18.3637 7.04999L13.4137 12L18.3637 16.95L16.9497 18.364L11.9997 13.414L7.04974 18.364L5.63574 16.95L10.5857 12L5.63574 7.04999L7.04974 5.63599L11.9997 10.586Z'
                  fill='white'
                  fillOpacity='0.65'
                />
              </g>
              <defs>
                <clipPath id='clip0_344_28960'>
                  <rect width='24' height='24' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </button>
          <h3 className={'text-[16px] leading-[24px] text-[#FFFFFFCC] font-medium'}>
            Edit AI Personality
          </h3>
        </div>
        <div className={'max-w-7xl mx-auto py-10'}>{children}</div>
      </div>
    </div>
  )
}

export default FullModal
