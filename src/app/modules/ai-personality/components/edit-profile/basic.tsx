import React from 'react'
import TextInput from '../../../widgets/components/Input/TextInput'
import {useIntl} from 'react-intl'
import {Form, Formik} from 'formik'
import TextArea from '../../../widgets/components/Input/TextArea'
import {InfoCard} from '../../../widgets/components/UI/InfoCard'

const Basic: React.FC<any> = ({setOpenEdit}) => {
  const {formatMessage} = useIntl()

  return (
    <div className={'grid grid-cols-12 gap-y-[20px] md:gap-x-[40px] px-[16px]'}>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(formik) => {
          return (
            <Form className={'col-span-12 md:col-span-7 order-0'}>
              <TextArea
                label={formatMessage({id: 'Description'})}
                fieldName={'description'}
                placeholder={formatMessage({
                  id: 'Write a paragraph describing who your personality is',
                })}
                formik={formik}
                toolTipText={'text'}
                className={'!min-h-[210px]'}
              />
              <TextArea
                label={formatMessage({id: 'Motivations'})}
                fieldName={'motivations'}
                placeholder={formatMessage({
                  id: 'What motivates your personality',
                })}
                formik={formik}
                toolTipText={'text'}
                className={'!min-h-[107px]'}
              />
              <TextArea
                label={formatMessage({id: 'Difficulties, insecurities of the characters'})}
                fieldName={'description'}
                placeholder={formatMessage({
                  id: 'What kind of challenges your personality is facing in his world, this makes the personality more human',
                })}
                formik={formik}
                toolTipText={'text'}
                className={'!min-h-[107px]'}
              />
            </Form>
          )
        }}
      </Formik>
      <div
        className={'col-span-12 md:col-span-5 flex flex-col justify-start gap-[20px] md:mt-[24px]'}
      >
        <div className={'flex justify-end gap-[10px] md:order-1'}>
          <button
            onClick={() => setOpenEdit(false)}
            className={
              'bg-[#C2D24B1A] text-[#C2D24B] text-[14px] leading-5 font-medium py-[12px] w-1/2 md:w-[128px] rounded'
            }
          >
            Cancel
          </button>
          <button
            className={
              'bg-[#C2D24B] text-black text-[14px] leading-5 font-medium py-[12px] w-1/2  md:w-[140px] rounded'
            }
          >
            Save
          </button>
        </div>
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
  )
}

export default Basic
