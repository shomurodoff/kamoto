import React, {useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper'
import {get, isEqual, map, range} from 'lodash'
import {personalities} from './constants'
import clsx from 'clsx'
const Index = () => {
  const [active, setActive] = useState(1)
  return (
    <div>
      <Swiper
        modules={[Navigation]}
        className='w-full personality-swiper py-10'
        slidesPerView={5}
        navigation={true}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
      >
        {map(personalities, (value, index) => (
          <SwiperSlide className={'mx-3'} key={get(value, 'key')} onClick={() => setActive(index)}>
            <div
              className={clsx(
                ' px-[12px] pt-[20px] pb-[12px] border rounded-md min-h-[100px]',
                isEqual(active, index)
                  ? '!border-[#C2D24B] bg-[#C2D24B1A] '
                  : 'border-[#2E2F45] bg-[#171825]'
              )}
            >
              <h4 className={'text-[#FFFFFF] font-medium text-[13px] leading-[18px] mb-[6px]'}>
                {get(value, 'title')}
              </h4>
              <p className={'text-[#FFFFFFA6] font-normal text-[12px] leading-[18px]'}>
                {get(value, 'text')}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={'mx-3'}>{get(personalities[active], 'component')}</div>
    </div>
  )
}

export default Index
