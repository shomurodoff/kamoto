import React from 'react'
import TextInput from '../../../widgets/components/Input/TextInput'
import { useIntl } from 'react-intl'
import { Form, Formik } from 'formik'
import TextArea from '../../../widgets/components/Input/TextArea'
import { InfoCard } from '../../../widgets/components/UI/InfoCard'
import * as Yup from "yup";

const Basic: React.FC<any> = ({ setOpenEdit }) => {
  const { formatMessage } = useIntl()

  const onSubmit = async (values: any) => {
    console.log(values)
  }

  const basicDetailsValidation = Yup.object().shape({
    description: Yup.string().required(formatMessage({id: 'Description is required'})),
    difficulties: Yup.string().required(formatMessage({id: 'Difficulties is required'})),
    motivations: Yup.string().required(formatMessage({id: 'Motivations is required'})),
  })

  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
      validationSchema={basicDetailsValidation}
      validateOnMount
    >
      {(formik) => {
        return (
          <Form>
            <div className={'grid grid-cols-12 gap-y-[20px] md:gap-x-[40px] px-[16px]'}>
              <div className={'col-span-12 md:col-span-7 order-0'}>
                <TextArea
                  label={formatMessage({ id: 'Description' })}
                  fieldName={'description'}
                  placeholder={formatMessage({
                    id: 'Write a paragraph describing who your personality is',
                  })}
                  formik={formik}
                  toolTipText={'text'}
                  className={'!min-h-[210px]'}
                />
                <TextArea
                  label={formatMessage({ id: 'Motivations' })}
                  fieldName={'motivations'}
                  placeholder={formatMessage({
                    id: 'What motivates your personality',
                  })}
                  formik={formik}
                  toolTipText={'text'}
                  className={'!min-h-[107px]'}
                />
                <TextArea
                  label={formatMessage({ id: 'Difficulties, insecurities of the characters' })}
                  fieldName={'difficulties'}
                  placeholder={formatMessage({
                    id: 'What kind of challenges your personality is facing in his world, this makes the personality more human',
                  })}
                  formik={formik}
                  toolTipText={'text'}
                  className={'!min-h-[107px]'}
                />
              </div>

              <div
                className={'col-span-12 md:col-span-5 flex flex-col justify-start gap-[20px] md:mt-[22px]'}
              >
                <div className={'flex justify-end gap-[10px] md:order-1 md:mt-auto'}>
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
                    type='submit'
                  >
                    Save
                  </button>
                </div>
                <InfoCard
                  title={formatMessage({ id: 'Understanding Basic Description of AI Personality' })}
                  desc={formatMessage({
                    id:
                    'In KamotoAI, the "Basic Description" category allows you to create virtual AI personalities that embody unique personalities and traits. You have the power to describe your AI persona in a comprehensive paragraph, capturing its essence and individuality. \n' +
                    "<br/>" +
                    "<br/>" +
                    "Dive into its motivations, understanding what drives and inspires this AI personality. By highlighting its difficulties and insecurities, you make the personality more human, relatable, and authentic. \n" +
                    "<br/>" +
                    "<br/>" +
                    "With KamotoAI, you can bring your virtual AI persona to life, shaping it into a dynamic and engaging character that resonates with users. Unleash your creativity and craft AI personalities that leave a lasting impression.",
                  })}
                  slug={'#'}
                />
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Basic;
