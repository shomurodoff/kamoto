import React from 'react'

const Index: React.FC<any> = ({icon, title, description, canAccess}) => {
  return (
    <div
      className={
        'bg-[#11121C] border border-[#2E2F45] shadow-[0px_2px_8px_0px_#00000033] rounded-md  px-[20px] py-[32px] md:p-[20px]  md:pt-[35px] relative font-poppins h-full'
      }
    >
      {canAccess && (
        <span
          className={
            'absolute w-[32px] h-[32px] flex items-center justify-center bg-[#2E2F45] rounded-full top-2 right-2'
          }
        >
          <svg
            width='16'
            height='20'
            viewBox='0 0 16 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16 10.6V17.6C16 18.8 14.8 20 13.4 20H2.4C1.2 20 0 18.8 0 17.4V10.4C0 9.2 1.2 8 2.4 8V5C2.4 2.2 5.2 0 8 0C10.8 0 13.6 2.2 13.6 5V8C14.8 8 16 9.2 16 10.6ZM11 5C11 3.4 9.6 2.4 8 2.4C6.4 2.4 5 3.4 5 5V8H11V5Z'
              fill='#C2D24B'
            />
          </svg>
        </span>
      )}
      <div className={'mb-[20px]'}>{icon}</div>
      <div>
        <h3 className={'text-[16px] leading-6 text-[#FFFFFFCC] font-semibold mb-2'}>{title}</h3>
        <p className={'text-[13px] leading-5 text-[#FFFFFFA6] font-normal'}>{description}</p>
      </div>
    </div>
  )
}

export default Index
