/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState} from 'react'
import clsx from 'clsx'
import {
  toAbsoluteUrl,
  defaultMessages,
  defaultUserInfos,
  MessageModel,
  UserInfoModel,
  messageFromClient,
} from '../../../../../_metronic/helpers'
import TextareaAutosize from 'react-textarea-autosize'
import {isEqual} from 'lodash'
type Props = {
  isDrawer?: boolean
}

const bufferMessages = defaultMessages

const Index: FC<Props> = ({isDrawer = false}) => {
  const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<MessageModel[]>(bufferMessages)
  const [userInfos] = useState<UserInfoModel[]>(defaultUserInfos)

  const sendMessage = () => {
    const newMessage: MessageModel = {
      user: 2,
      type: 'out',
      text: message,
      time: 'Just now',
    }

    bufferMessages.push(newMessage)
    setMessages(bufferMessages)
    toggleChatUpdateFlat(!chatUpdateFlag)
    setMessage('')
    setTimeout(() => {
      bufferMessages.push(messageFromClient)
      setMessages(() => bufferMessages)
      toggleChatUpdateFlat((flag) => !flag)
    }, 1000)
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className='' id={isDrawer ? 'kt_drawer_chat_messenger_body' : 'kt_chat_messenger_body'}>
      <div
        className={clsx('scroll-y h-[50vh]')}
        data-kt-element='messages'
        data-kt-scroll='true'
        data-kt-scroll-activate='{default: false, lg: true}'
        data-kt-scroll-max-height='auto'
        data-kt-scroll-dependencies={
          isDrawer
            ? '#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer'
            : '#kt_header, #kt_app_header, #kt_app_toolbar, #kt_toolbar, #kt_footer, #kt_app_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer'
        }
        data-kt-scroll-wrappers={
          isDrawer
            ? '#kt_drawer_chat_messenger_body'
            : '#kt_content, #kt_app_content, #kt_chat_messenger_body'
        }
        data-kt-scroll-offset={isDrawer ? '0px' : '5px'}
      >
        {messages.map((message, index) => {
          const userInfo = userInfos[message.user]
          const state = message.type === 'in' ? 'in' : 'out'
          const templateAttr = {}
          if (message.template) {
            Object.defineProperty(templateAttr, 'data-kt-element', {
              value: `template-${message.type}`,
            })
          }
          const contentClass = `${isDrawer ? '' : 'd-flex'} justify-content-${
            message.type === 'in' ? 'start' : 'end'
          } mb-10`
          return (
            <div
              key={`message${index}`}
              className={clsx('d-flex', contentClass, 'mb-10', {'d-none': message.template})}
              {...templateAttr}
            >
              <div className={'flex flex-col md:flex-row md:items-start gap-x-8 gap-y-2'}>
                <div
                  className={clsx(
                    'flex items-start gap-x-2 rounded px-2 py-3 relative',
                    isEqual(state, 'in') ? 'bg-[#2E2F45] ' : 'bg-[#171825]'
                  )}
                >
                  {isEqual(state, 'in') && (
                    <span className={'text-[20px] absolute right-1 md:-right-3 -bottom-4'}>😅</span>
                  )}
                  <div className='flex items-center'>
                    {message.type === 'in' ? (
                      <>
                        <div className='symbol  symbol-35px symbol-circle w-12 h-12'>
                          <img alt='Pic' src={toAbsoluteUrl(`/media/${userInfo.avatar}`)} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className='symbol  symbol-35px symbol-circle  w-12 h-12'>
                          <img alt='Pic' src={toAbsoluteUrl(`/media/${userInfo.avatar}`)} />
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    className={clsx(
                      'text-[#FFFFFFCC] text-[14px] leading-[22px] font-normal max-w-2xl float-right'
                      // `text-${message.type === 'in' ? 'start' : 'end'}`
                    )}
                    data-kt-element='message-text'
                    dangerouslySetInnerHTML={{__html: message.text}}
                  ></div>
                </div>
                {message.type === 'in' && (
                  <div className={'flex items-center gap-x-2'}>
                    <button>
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <g clipPath='url(#clip0_344_24321)'>
                          <path
                            d='M6.66602 8.33341C6.66602 7.89139 6.84161 7.46746 7.15417 7.1549C7.46673 6.84234 7.89065 6.66675 8.33268 6.66675H14.9993C15.4414 6.66675 15.8653 6.84234 16.1779 7.1549C16.4904 7.46746 16.666 7.89139 16.666 8.33341V15.0001C16.666 15.4421 16.4904 15.866 16.1779 16.1786C15.8653 16.4912 15.4414 16.6667 14.9993 16.6667H8.33268C7.89065 16.6667 7.46673 16.4912 7.15417 16.1786C6.84161 15.866 6.66602 15.4421 6.66602 15.0001V8.33341Z'
                            stroke='white'
                            strokeOpacity='0.8'
                            strokeWidth='1.2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M13.333 6.66671V5.00004C13.333 4.55801 13.1574 4.13409 12.8449 3.82153C12.5323 3.50897 12.1084 3.33337 11.6663 3.33337H4.99967C4.55765 3.33337 4.13372 3.50897 3.82116 3.82153C3.5086 4.13409 3.33301 4.55801 3.33301 5.00004V11.6667C3.33301 12.1087 3.5086 12.5327 3.82116 12.8452C4.13372 13.1578 4.55765 13.3334 4.99967 13.3334H6.66634'
                            stroke='white'
                            strokeOpacity='0.8'
                            strokeWidth='1.2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_344_24321'>
                            <rect width='20' height='20' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <button>
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <g clipPath='url(#clip0_344_24326)'>
                          <path
                            d='M5.83333 9.16671V15.8334C5.83333 16.0544 5.74554 16.2664 5.58926 16.4226C5.43298 16.5789 5.22101 16.6667 5 16.6667H3.33333C3.11232 16.6667 2.90036 16.5789 2.74408 16.4226C2.5878 16.2664 2.5 16.0544 2.5 15.8334V10C2.5 9.77903 2.5878 9.56707 2.74408 9.41079C2.90036 9.25451 3.11232 9.16671 3.33333 9.16671H5.83333ZM5.83333 9.16671C6.71739 9.16671 7.56524 8.81552 8.19036 8.1904C8.81548 7.56528 9.16667 6.71743 9.16667 5.83337V5.00004C9.16667 4.55801 9.34226 4.13409 9.65482 3.82153C9.96738 3.50897 10.3913 3.33337 10.8333 3.33337C11.2754 3.33337 11.6993 3.50897 12.0118 3.82153C12.3244 4.13409 12.5 4.55801 12.5 5.00004V9.16671H15C15.442 9.16671 15.866 9.3423 16.1785 9.65486C16.4911 9.96742 16.6667 10.3913 16.6667 10.8334L15.8333 15C15.7135 15.5113 15.4861 15.9502 15.1855 16.2508C14.8849 16.5514 14.5274 16.6974 14.1667 16.6667H8.33333C7.67029 16.6667 7.03441 16.4033 6.56557 15.9345C6.09673 15.4656 5.83333 14.8297 5.83333 14.1667'
                            stroke='white'
                            strokeOpacity='0.8'
                            strokeWidth='1.2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_344_24326'>
                            <rect width='20' height='20' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <button>
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <g clipPath='url(#clip0_344_24329)'>
                          <path
                            d='M5.83333 10.8333V4.16663C5.83333 3.94561 5.74554 3.73365 5.58926 3.57737C5.43298 3.42109 5.22101 3.33329 5 3.33329H3.33333C3.11232 3.33329 2.90036 3.42109 2.74408 3.57737C2.5878 3.73365 2.5 3.94561 2.5 4.16663V9.99996C2.5 10.221 2.5878 10.4329 2.74408 10.5892C2.90036 10.7455 3.11232 10.8333 3.33333 10.8333H5.83333ZM5.83333 10.8333C6.71739 10.8333 7.56524 11.1845 8.19036 11.8096C8.81548 12.4347 9.16667 13.2826 9.16667 14.1666V15C9.16667 15.442 9.34226 15.8659 9.65482 16.1785C9.96738 16.491 10.3913 16.6666 10.8333 16.6666C11.2754 16.6666 11.6993 16.491 12.0118 16.1785C12.3244 15.8659 12.5 15.442 12.5 15V10.8333H15C15.442 10.8333 15.866 10.6577 16.1785 10.3451C16.4911 10.0326 16.6667 9.60865 16.6667 9.16663L15.8333 4.99996C15.7135 4.48873 15.4861 4.04975 15.1855 3.74915C14.8849 3.44855 14.5274 3.30261 14.1667 3.33329H8.33333C7.67029 3.33329 7.03441 3.59668 6.56557 4.06552C6.09673 4.53437 5.83333 5.17025 5.83333 5.83329'
                            stroke='white'
                            strokeOpacity='0.8'
                            strokeWidth='1.2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_344_24329'>
                            <rect
                              width='20'
                              height='20'
                              fill='white'
                              transform='matrix(1 0 0 -1 0 20)'
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div
        className='card-footer py-4'
        id={isDrawer ? 'kt_drawer_chat_messenger_footer' : 'kt_chat_messenger_footer'}
      >
        <div className={'flex flex-col  md:flex-row md:items-end'}>
          <div className={'relative flex-grow'}>
            <TextareaAutosize
              className={'form-control form-control-flush bg-[#2E2F45] rounded pr-10'}
              data-kt-element='input'
              placeholder='Type a message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={onEnterPress}
            />
            <button className={'absolute right-4 bottom-3'}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_344_24401)'>
                  <path
                    d='M9.99958 14L20.9996 3M9.99958 14L13.4996 21C13.5435 21.0957 13.6139 21.1769 13.7025 21.2338C13.7912 21.2906 13.8943 21.3209 13.9996 21.3209C14.1049 21.3209 14.208 21.2906 14.2966 21.2338C14.3853 21.1769 14.4557 21.0957 14.4996 21L20.9996 3M9.99958 14L2.99958 10.5C2.90384 10.4561 2.82271 10.3857 2.76583 10.2971C2.70895 10.2084 2.67871 10.1053 2.67871 10C2.67871 9.89468 2.70895 9.79158 2.76583 9.70295C2.82271 9.61431 2.90384 9.54387 2.99958 9.5L20.9996 3'
                    stroke='#C2D24B'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_344_24401'>
                    <rect width='24' height='24' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          <div className={'flex gap-2 p-4'}>
            <button>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M11.25 6.00004C11.7157 6.34934 12.0937 6.80228 12.3541 7.32299C12.6145 7.8437 12.75 8.41787 12.75 9.00004C12.75 9.58221 12.6145 10.1564 12.3541 10.6771C12.0937 11.1978 11.7157 11.6507 11.25 12M13.275 3.75004C14.058 4.38278 14.6895 5.18263 15.1234 6.09103C15.5572 6.99943 15.7824 7.99336 15.7824 9.00004C15.7824 10.0067 15.5572 11.0007 15.1234 11.909C14.6895 12.8174 14.058 13.6173 13.275 14.25M4.5 11.25H3C2.80109 11.25 2.61032 11.171 2.46967 11.0304C2.32902 10.8897 2.25 10.699 2.25 10.5V7.50004C2.25 7.30113 2.32902 7.11036 2.46967 6.96971C2.61032 6.82906 2.80109 6.75004 3 6.75004H4.5L7.125 3.37504C7.19055 3.24771 7.29949 3.14803 7.43212 3.09401C7.56475 3.03999 7.71233 3.03519 7.84819 3.08047C7.98405 3.12576 8.09923 3.21815 8.17292 3.34095C8.24662 3.46374 8.27395 3.60885 8.25 3.75004V14.25C8.27395 14.3912 8.24662 14.5363 8.17292 14.6591C8.09923 14.7819 7.98405 14.8743 7.84819 14.9196C7.71233 14.9649 7.56475 14.9601 7.43212 14.9061C7.29949 14.852 7.19055 14.7524 7.125 14.625L4.5 11.25Z'
                  stroke='white'
                  strokeOpacity='0.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <button>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6.75 3.75C6.75 3.15326 6.98705 2.58097 7.40901 2.15901C7.83097 1.73705 8.40326 1.5 9 1.5C9.59674 1.5 10.169 1.73705 10.591 2.15901C11.0129 2.58097 11.25 3.15326 11.25 3.75V7.5C11.25 8.09674 11.0129 8.66903 10.591 9.09099C10.169 9.51295 9.59674 9.75 9 9.75C8.40326 9.75 7.83097 9.51295 7.40901 9.09099C6.98705 8.66903 6.75 8.09674 6.75 7.5V3.75Z'
                  stroke='white'
                  strokeOpacity='0.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3.75 7.5C3.75 8.89239 4.30312 10.2277 5.28769 11.2123C6.27226 12.1969 7.60761 12.75 9 12.75M9 12.75C10.3924 12.75 11.7277 12.1969 12.7123 11.2123C13.6969 10.2277 14.25 8.89239 14.25 7.5M9 12.75V15.75M6 15.75H12'
                  stroke='white'
                  strokeOpacity='0.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <button>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M14.95 9.78075C14.8084 10.8607 14.3755 11.8818 13.6977 12.7344C13.0198 13.587 12.1227 14.239 11.1025 14.6205C10.0823 15.002 8.97747 15.0986 7.90653 14.8999C6.83559 14.7013 5.83894 14.2148 5.02345 13.4927C4.20797 12.7707 3.60442 11.8402 3.27754 10.8012C2.95066 9.76223 2.91278 8.65384 3.16796 7.59494C3.42313 6.53604 3.96174 5.56658 4.72602 4.79052C5.4903 4.01446 6.45142 3.46109 7.50629 3.18975C10.4305 2.43975 13.4575 3.945 14.575 6.75'
                  stroke='white'
                  strokeOpacity='0.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M15 3V6.75H11.25'
                  stroke='white'
                  strokeOpacity='0.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <button>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6 7.5C6 7.10218 6.15804 6.72064 6.43934 6.43934C6.72064 6.15804 7.10218 6 7.5 6H13.5C13.8978 6 14.2794 6.15804 14.5607 6.43934C14.842 6.72064 15 7.10218 15 7.5V13.5C15 13.8978 14.842 14.2794 14.5607 14.5607C14.2794 14.842 13.8978 15 13.5 15H7.5C7.10218 15 6.72064 14.842 6.43934 14.5607C6.15804 14.2794 6 13.8978 6 13.5V7.5Z'
                  stroke='white'
                  strokeOpacity='0.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 6V4.5C12 4.10218 11.842 3.72064 11.5607 3.43934C11.2794 3.15804 10.8978 3 10.5 3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V10.5C3 10.8978 3.15804 11.2794 3.43934 11.5607C3.72064 11.842 4.10218 12 4.5 12H6'
                  stroke='white'
                  strokeOpacity='0.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
