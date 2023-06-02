import React from 'react'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'

const Published: React.FC<any> = ({
  userName = 'Shahrukh Khan',
  image = '/media/avatars/300-1.jpg',
  hasImage = false,
  text = '',
}) => {
  return (
    <div
      className={
        'bg-[#2E2F45] rounded border-[#FFFFFF1A] border p-[8px] b-[14px] md:px-[32px] md:pt-[16px] md:pb-[24px]'
      }
    >
      <div className={'text-[#FFFFFFCC] flex justify-between mb-[16px]'}>
        <div className={'flex gap-[8px]'}>
          <img
            alt='Pic'
            src={toAbsoluteUrl(`/media/avatars/300-1.jpg`)}
            className={'w-[48px] h-[48px] rounded-full'}
          />
          <div>
            <h4
              className={
                'flex items-center gap-[8px]  text-[16px] leading-[24px] font-semibold mb-1'
              }
            >
              {userName}
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 0L14.8553 3.21224L19.0534 2.2918L19.4753 6.56886L23.4127 8.2918L21.24 12L23.4127 15.7082L19.4753 17.4311L19.0534 21.7082L14.8553 20.7878L12 24L9.14468 20.7878L4.94658 21.7082L4.52468 17.4311L0.587322 15.7082L2.76 12L0.587322 8.2918L4.52468 6.56886L4.94658 2.2918L9.14468 3.21224L12 0Z'
                  fill='#C2D24B'
                />
                <path
                  d='M8.30762 12.0001L10.7745 14.7693L17.0768 9.23083'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            </h4>
            <p className={'text-[#FFFFFF80] text-[12px] leading-[18px]'}>Yesterday at 5:06 PM </p>
          </div>
        </div>
        <div>
          <button className={'bg-[#3C3D54] p-[6px] rounded-[6px]'}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_344_24498)'>
                <path
                  d='M21 12C21 10.9 20.1 10 19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12ZM7 12C7 10.9 6.1 10 5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12ZM14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12Z'
                  fill='white'
                  fillOpacity='0.65'
                />
              </g>
              <defs>
                <clipPath id='clip0_344_24498'>
                  <rect width='24' height='24' fill='white' transform='translate(24) rotate(90)' />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      <div>
        <p className={'mb-[8px]'}>{text}</p>
        {hasImage && <img src={toAbsoluteUrl(image)} className={'mb-[8px]'} />}
      </div>
      <div className={'flex items-center gap-[8px]'}>
        <svg
          width='23'
          height='23'
          viewBox='0 0 23 23'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_344_24492)'>
            <path
              d='M6.70833 10.5417V18.2084C6.70833 18.4625 6.60737 18.7063 6.42764 18.886C6.24792 19.0657 6.00417 19.1667 5.75 19.1667H3.83333C3.57917 19.1667 3.33541 19.0657 3.15569 18.886C2.97597 18.7063 2.875 18.4625 2.875 18.2084V11.5C2.875 11.2459 2.97597 11.0021 3.15569 10.8224C3.33541 10.6427 3.57917 10.5417 3.83333 10.5417H6.70833ZM6.70833 10.5417C7.725 10.5417 8.70002 10.1378 9.41891 9.41895C10.1378 8.70006 10.5417 7.72504 10.5417 6.70837V5.75004C10.5417 5.24171 10.7436 4.7542 11.103 4.39475C11.4625 4.03531 11.95 3.83337 12.4583 3.83337C12.9667 3.83337 13.4542 4.03531 13.8136 4.39475C14.1731 4.7542 14.375 5.24171 14.375 5.75004V10.5417H17.25C17.7583 10.5417 18.2458 10.7436 18.6053 11.1031C18.9647 11.4625 19.1667 11.95 19.1667 12.4584L18.2083 17.25C18.0705 17.838 17.8091 18.3428 17.4634 18.6885C17.1177 19.0342 16.7065 19.202 16.2917 19.1667H9.58333C8.82084 19.1667 8.08957 18.8638 7.5504 18.3246C7.01123 17.7855 6.70833 17.0542 6.70833 16.2917'
              stroke='white'
              strokeOpacity='0.8'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
          <defs>
            <clipPath id='clip0_344_24492'>
              <rect width='23' height='23' fill='white' />
            </clipPath>
          </defs>
        </svg>
        <span className={'text-[12px] leading-[18px] text-[#FFFFFF80]'}>47k Likes</span>
      </div>
    </div>
  )
}

export default Published
