import React from 'react'
import TextInput from '../../../widgets/components/Input/TextInput'
import {useIntl} from 'react-intl'
import {Form, Formik} from 'formik'
import TextArea from '../../../widgets/components/Input/TextArea'
import {InfoCard} from '../../../widgets/components/UI/InfoCard'
import Select from '../../../../components/select/select'

const Identity: React.FC<any> = ({setOpenEdit}) => {
  const {formatMessage} = useIntl()

  return (
    <div className={'grid grid-cols-12 gap-y-[20px] md:gap-x-[40px] px-[16px]'}>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(formik) => {
          return (
            <Form className={'col-span-12 md:col-span-7 order-0'}>
              <Select
                toltipText={'Commonly used filler words'}
                label={'Stage in life'}
                isClearable={false}
                defaultValue={{
                  value: 'Teenager',
                  label: 'Teenager',
                }}
                options={[
                  {value: 'Teenager', label: 'Teenager'},
                  {value: 'strawberry', label: 'Strawberry'},
                  {value: 'vanilla', label: 'Vanilla'},
                ]}
              />
              <TextInput
                fieldType={'text'}
                fieldName={'role'}
                value={'Tell me about your experience on working on Circus sets'}
                formik={formik}
                placeholder={'You can assign roles like doctor, artist or airplane pilot'}
                label={formatMessage({id: 'Role'})}
                toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.FORGOT_PASSWORD.EMAIL'})}
              />
              <Select
                toltipText={'Commonly used filler words'}
                isMulti={true}
                label={'Alternative Names'}
                isClearable={false}
                defaultValue={[
                  {value: 'Shah', label: 'Shah'},
                  {value: 'King', label: 'King'},
                ]}
                options={[
                  {value: 'Shah', label: 'Shah'},
                  {value: 'King', label: 'King'},
                  {value: 'vanilla', label: 'Vanilla'},
                ]}
              />
              <TextInput
                isFieldArray={true}
                fieldType={'text'}
                fieldName={'question'}
                value={'Tell me about your experience on working on Circus sets'}
                formik={formik}
                placeholder={
                  'If your character is any famous personality add his wikipedia page here'
                }
                label={formatMessage({id: 'Wikipedia link'})}
                toolTipText={formatMessage({id: 'GLOBAL.TOOLTIP.FORGOT_PASSWORD.EMAIL'})}
              />
              <TextArea
                label={formatMessage({id: 'Visual Appearance'})}
                fieldName={'description'}
                placeholder={formatMessage({
                  id: 'Explain briefly how the personality looks like in the real world',
                })}
                formik={formik}
                toolTipText={'text'}
                className={'!min-h-[107px]'}
              />
              <Select
                toltipText={'Commonly used filler words'}
                isMulti={true}
                label={'Racial Information'}
                isClearable={false}
                defaultValue={[
                  {value: 'asian', label: 'asian'},
                  {value: 'asian', label: 'asian'},
                ]}
                options={[
                  {value: 'asian', label: 'asian'},
                  {value: 'asian', label: 'asian'},
                  {value: 'vanilla', label: 'Vanilla'},
                ]}
              />
              <TextArea
                label={formatMessage({id: 'Family Details, if any'})}
                fieldName={'description'}
                placeholder={formatMessage({
                  id: 'Details of the AI Personality’s family. You can leave it blank if you want to.',
                })}
                formik={formik}
                toolTipText={'text'}
                className={'!min-h-[107px]'}
              />
              <TextArea
                label={formatMessage({id: 'Professional Life Details, if any'})}
                fieldName={'description'}
                placeholder={formatMessage({
                  id: 'Details of the AI Personality’s professional life. You can leave it blank if you want to.',
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

export default Identity
