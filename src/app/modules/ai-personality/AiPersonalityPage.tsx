import React, {useState} from 'react'
import '../../assets/index.css'
import Breadcrumb from '../dashboard/components/breadcrumb'
import Tabs, {Tab} from 'react-best-tabs'
import Chat from './components/chat'

import {isEqual, map, range} from 'lodash'
import Accordion from './components/accordion'
import CustomLink from '../../components/custom-link'
import TabContent from '../../components/tab-content'
import {PublishedPost, UnpublishedPost} from './components/post'
import {InfoCard} from '../widgets/components/UI/InfoCard'
import {useIntl} from 'react-intl'
import {FullModal} from '../../components/modal'
import EditProfile from './components/edit-profile'
import {useLocation, useNavigate} from 'react-router-dom'
const AiPersonalityPage = () => {
  const [expanded, setExpanded] = useState<false | number>(0)
  const {formatMessage} = useIntl()
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const navigate = useNavigate()
  const {pathname} = useLocation()

  return (
    <div className='overflow-scroll px-5 py-3'>
      <Breadcrumb />
      <div className={'flex md:justify-end gap-[8px] mt-[14px] md:mt-0'}>
        <button
          className={
            'bg-[#C2D24B] flex-grow md:max-w-xs rounded-[6px] text-[13px] leading-[20px] text-black '
          }
          onClick={() => setOpenEdit(true)}
        >
          Edit Personality
        </button>
        <button className={'bg-[#2E2F45] p-[6px] rounded-[6px]'}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_344_27955)'>
              <path
                d='M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z'
                fill='white'
                fillOpacity='0.65'
              />
            </g>
            <defs>
              <clipPath id='clip0_344_27955'>
                <rect width='24' height='24' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      <Tabs
        activeTab={isEqual('/my-ai/chat', pathname) || isEqual('/my-ai', pathname) ? 1 : 2}
        className='font-size-13'
        ulClassName='text-muted  dark-border !justify-start'
        activityClassName='bg-primary !text-primary'
        onClick={(event, tab) => {
          if (tab === 1) {
            navigate('/my-ai/chat')
          }
          if (tab === 2) {
            navigate('/my-ai/posts')
          }
        }}
      >
        <Tab title='Chat'>
          <div className='grid grid-cols-12 gap-[24px] bg-[#171825] shadow-[0px_1px_4px_0px_#0000001A] px-[16px] pb-10 md:p-[32px] md:pb-[100px] mt-4'>
            <div
              className={
                'col-span-12 md:col-span-7 lg:col-span-8 bg-[#11121C] rounded-lg px-[8px] md:px-[16px]'
              }
            >
              <Chat />
            </div>
            <div
              className={
                'col-span-12 md:col-span-5 lg:col-span-4 bg-[#11121C] rounded-lg px-[16px] py-[20px] px-[16px]'
              }
            >
              <div className={'text-[#FFFFFFCC] flex flex-col h-full'}>
                <h3 className={'text-[20px] leading-7 font-semibold mb-[18px]'}>
                  FAQs on AI Personality
                </h3>
                <div className={'flex-grow flex flex-col justify-between'}>
                  <ul className={'list-type-none'}>
                    {map(range(0, 4), (value, index) => (
                      <li className={'border-[#2E2F45] border-b py-[12px]'}>
                        <Accordion
                          i={index}
                          expanded={expanded}
                          setExpanded={setExpanded}
                          title={'What is an AI Personality?'}
                          paragraph={
                            'An AI Personality is a digital entity powered by advanced AI algorithms that  can simulate human-like conversations and behaviors.'
                          }
                        />
                      </li>
                    ))}
                  </ul>
                  <div className={'flex justify-end mt-5'}>
                    <CustomLink />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab title='Posts' className='mr-3'>
          <TabContent>
            <div className={'flex flex-col md:flex-row items-start gap-[18px]'}>
              <div className={'md:border-r md:pr-[18px] border-[#2E2F45]'}>
                <div className={'mb-[20px]'}>
                  <UnpublishedPost />
                </div>
                <ul className={'flex flex-col gap-[20px]'}>
                  {map(range(0, 2), (value, index) => (
                    <PublishedPost
                      hasImage={isEqual(index, 1) && true}
                      text={
                        'In a humorous twist, Shahrukh, sporting his famous dimpled grin, teased Karan Johar about his ever-changing hair color. Karan, always quick with a comeback, playfully retorted, "SRK, at least my hair isn\'t greying like yours!" The room burst into laughter.'
                      }
                    />
                  ))}
                </ul>
              </div>
              <div className={'md:max-w-3xl'}>
                <InfoCard
                  title={formatMessage({id: 'What is an AI Personality?'})}
                  desc={formatMessage({
                    id:
                      "KamotoAI empowers AI personality owners and managers to create engaging social media-like posts. These posts serve as broadcasted messages from the AI personality, similar to tweets or Facebook posts. They are visible on the AI Personality's Public page within the Marketplace. \n" +
                      '\n' +
                      "The purpose of these posts is to increase user engagement, fostering connections and interactions between the AI personality and KamotoAI's user base. By creating compelling content, AI personality owners can effectively grow their audience, enhance user engagement, and ultimately boost their revenue potential within the platform.",
                  })}
                  slug={'#'}
                />
              </div>
            </div>
          </TabContent>
        </Tab>
      </Tabs>
      <FullModal open={openEdit} setOpen={setOpenEdit}>
        <EditProfile setOpenEdit={setOpenEdit} />
      </FullModal>
    </div>
  )
}

export {AiPersonalityPage}
