/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { login, sendVerifyEmail, verifyEmail } from "../core/_requests";
import { useAuth } from "../core/Auth";
import SocialLoginButtons from "../components/SocialLoginButtons";
import TextInput from "../../widgets/components/Input/TextInput";
import { useIntl } from "react-intl";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "../../widgets/components/UI/CustomToast";
import { FormikProps } from "../core/_models";
import { Toaster } from "../../widgets/components/General/Toaster";
import { toast } from "react-toastify";
import { Spinner } from "../../widgets/components/General/Spinner";

export function EmailVerify() {
  const { formatMessage } = useIntl();

  const { state } = useLocation() as any;
  const { currentUser } = useAuth();
  const [emailVerified, setIsEmailVerified] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  console.log({ currentUser })
  const sendVerifcationMail = async () => {
    // apply verification logic here ToDoAnand
    if (currentUser?.userId) {
      setLoading(true)
      let res = await sendVerifyEmail(currentUser.userId)
      if(res.data.success){
      toast.success(formatMessage({ id: "Verification email sent successfully" }))
      setIsEmailVerified(4)
      setLoading(false)
      }else {
        setIsEmailVerified(5)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    async function check() {
      if (searchParams.has('token')) {
        let token: string = searchParams.get('token') || ''
        let res = await verifyEmail(token)
        if (res?.data?.success) {
          const { isVerified, wasAlreadyVerified } = res?.data?.data
          if (isVerified) {
            wasAlreadyVerified ? setIsEmailVerified(1) : setIsEmailVerified(2)
          } else {
            setIsEmailVerified(3)
          }
        } else {
          setIsEmailVerified(3)
        }
      }
    }
    check()
  }, [])

  const renderMessage = (emailVerified: number) => {
    switch (emailVerified) {
      case 0:
        return (<p>
          Please verify your email first to use KamotoAI. We have already sent a verification email to your registered email. If you have not received email,
          <button className='text-[#1295ee] text-[14px] leading-5 font-medium py-[12px]'
            onClick={(e) => sendVerifcationMail()}
          >
            &nbsp;click here&nbsp;
          </button>
          to resend verification email. Don’t forgot to check your spam folder.
        </p>)

      case 1:
        return (<p>
          Your email is already verified.
          <Link to="/login" className='text-[#1295ee] text-[14px] leading-5 font-medium py-[12px]'>
            &nbsp;click here&nbsp;
          </Link>
          to go to login.
        </p>)


      case 2:
        return (<p>
          You have verified your email successfully
          <Link to="/login" className='text-[#1295ee] text-[14px] leading-5 font-medium py-[12px]'>
            &nbsp;click here&nbsp;
          </Link>
          to go to login.
        </p>)


      case 3:
        return (<p>
          Looks like the link you used to verify your email is invalid. Please retry again with correct verification link
        </p>)

      case 4:
        return (<p>
          We have sent an another verification email at your registered email, If email not received
          <button className='text-[#1295ee] text-[14px] leading-5 font-medium py-[12px]'
            onClick={(e) => sendVerifcationMail()}
          >
            &nbsp;click here&nbsp;
          </button>
          resend verification email.
        </p>)

      case 5:
        return (<p>
          Can't send email at the moment. Please try again later.
        </p>)

    }
  }
  return (
    <>
      {isLoading ? <div className="d-flex justify-content-center align-items-center"><Spinner/></div> : renderMessage(emailVerified)}

    </>
  );
}
