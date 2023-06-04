import React, {useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper'
import {filter, get, isEqual, map, range} from 'lodash'
import {personalities} from './constants'
import clsx from 'clsx'
import Basic from './basic'
import Welcome from './welcome'
import Avatar from './avatar'
import Voice from './voice'
import Identity from './identity'
import Dialog from './dialog'
import Personality from './personality'
const Index: React.FC<any> = ({setOpenEdit}) => {
  const [active, setActive] = useState(1)

  const settings = {
    breakpoints: {
      '480': {
        slidesPerView: 1.5,
      },
      '768': {
        slidesPerView: 3,
      },
      '1024': {
        slidesPerView: 4,
      },
      '1280': {
        slidesPerView: 5,
      },
    },
  }
  return (
    <div className={''}>
      <Swiper
        {...settings}
        modules={[Navigation]}
        className='w-full personality-swiper py-10'
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
      {filter(
        [
          <Basic setOpenEdit={setOpenEdit} />,
          <Welcome setOpenEdit={setOpenEdit} />,
          <Identity setOpenEdit={setOpenEdit} />,
          <Dialog setOpenEdit={setOpenEdit} />,
          <Personality setOpenEdit={setOpenEdit} />,
          <Voice setOpenEdit={setOpenEdit} />,
          <Avatar setOpenEdit={setOpenEdit} />,
        ],
        (item, index) => {
          return index === active
        }
      )}
    </div>
  )
}

export default Index
