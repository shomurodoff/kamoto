import React from 'react'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import TextareaAutosize from 'react-textarea-autosize'

const Unpublished = () => {
  return (
    <div
      className={
        'bg-[#2E2F45] rounded border-[#FFFFFF1A] border p-[8px] b-[14px] md:px-[32px] md:pt-[16px] md:pb-[24px]'
      }
    >
      <div className={'text-[#FFFFFFCC] flex justify-between mb-[60px]'}>
        <div className={'flex w-full gap-[8px]'}>
          <img
            alt='Pic'
            src={toAbsoluteUrl(`/media/avatars/300-1.jpg`)}
            className={'w-[48px] h-[48px] rounded-full'}
          />
          <div className={'flex-grow'}>
            <TextareaAutosize
              className={
                'text-[13px] leading-[20px] placeholder:text-[#FFFFFF80] placeholder:font-normal bg-transparent w-full form-control border-transparent focus:border-transparent focus:ring-0 '
              }
              data-kt-element='input'
              placeholder='Enter some funny conversations or interactions with the AI personality'
            />
          </div>
        </div>
      </div>
      <div className={'flex items-center justify-between'}>
        <button className={'px-[12px] py-[8px] bg-[#171825] rounded'}>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12.5 6.66667H12.5083M2.5 5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5H15C15.663 2.5 16.2989 2.76339 16.7678 3.23223C17.2366 3.70107 17.5 4.33696 17.5 5V15C17.5 15.663 17.2366 16.2989 16.7678 16.7678C16.2989 17.2366 15.663 17.5 15 17.5H5C4.33696 17.5 3.70107 17.2366 3.23223 16.7678C2.76339 16.2989 2.5 15.663 2.5 15V5Z'
              stroke='white'
              strokeWidth='1.4'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M2.5 13.3333L6.66667 9.16665C7.44 8.42248 8.39333 8.42248 9.16667 9.16665L13.3333 13.3333'
              stroke='white'
              strokeWidth='1.4'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M11.667 11.6667L12.5003 10.8333C13.2737 10.0892 14.227 10.0892 15.0003 10.8333L17.5003 13.3333'
              stroke='white'
              strokeWidth='1.4'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <button
          className={
            'text-[14px] leading-[20px] text-black py-[12px] px-[24px] bg-[#C2D24B] rounded'
          }
        >
          Post Now
        </button>
      </div>
    </div>
  )
}

export default Unpublished
