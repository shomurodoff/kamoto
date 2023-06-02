import React from 'react'
import TextInput from '../../../widgets/components/Input/TextInput'
import {useIntl} from 'react-intl'
import {Form, Formik} from 'formik'
import TextArea from '../../../widgets/components/Input/TextArea'
import {InfoCard} from '../../../widgets/components/UI/InfoCard'

const Basic = () => {
  const {formatMessage} = useIntl()

  return (
    <div className={'flex flex-col mf:flex-row gap-[40px]'}>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(formik) => {
          return (
            <Form className={'flex-grow '}>
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
      <div className={'md:max-w-lg mt-[24px]'}>
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
