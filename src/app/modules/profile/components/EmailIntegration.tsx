import React, { useRef, useState } from "react";
import { useIntl } from "react-intl";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import TextInput from "../../widgets/components/Input/TextInput";
import { ToolTipUI } from "../../widgets/components/UI/ToolTipUI";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import { SelectInput } from "../../widgets/components/Input/SelectInput";
import {
  customSmtpOptions,
  postmarkInitialValues,
  initialValues,
  customSmtpInitialValues,
  senderInitialValues,
} from "../core/_constants";
import "../../profile/styles/index.scss";
import { InfoCard } from "../../widgets/components/UI/InfoCard";
import {
  createSenderProfileInfo,
  createSendgridMail,
  createCustomSmtpMail,
  createPostmarkMail,
  updateIsActive,
  sendTestMail,
} from "../core/_requests";
import { toast } from "react-toastify";

import { Editor } from "@tinymce/tinymce-react";
import { useThemeMode } from "../../../../_metronic/partials";

export const EmailIntegration = ({
  key,
  companyId,
  getMailInformation,
  postmarkRadio,
  sendgridRadio,
  foundercrateRadio,
  customsmtpRadio,
  emailSignature,
}: {
  key: number;
  companyId?: number;
  getMailInformation: () => Promise<void>;
  postmarkRadio?: any;
  sendgridRadio?: any;
  foundercrateRadio?: any;
  customsmtpRadio?: any;

  emailSignature: string;
}) => {
  const { mode } = useThemeMode();
  const { formatMessage } = useIntl();
  const [collapsePostmark, setCollapsePostmark] = useState(true);
  const [collapseSendGrid, setCollapseSendGrid] = useState(true);
  const [collapseFoundercrate, setCollapseFoundercrate] = useState(true);
  const [collapseSmtp, setCollapseSmtp] = useState(true);
  const [senderLoading, setSenderLoading] = useState(false);
  const [postmarkLoading, setPostmarkLoading] = useState(false);
  const [sendGridLoading, setSendGridLoading] = useState(false);
  const [customSmtpLoading, setCustomSmtpLoading] = useState(false);
  const [sendTestEmailLoading, setSendTestEmailLoading] = useState(false);
  const [sendGridTestEmailLoading, setSendGridTestEmailLoading] =
    useState(false);
  const [sendPostMarkTestEmailLoading, setSendPostMarkTestEmailLoading] =
    useState(false);
  const [errorValue, setErrorValue] = useState(false);
  const editorRef = useRef<any>(null);

  const postmarkSchema = Yup.object().shape({
    serverToken: Yup.string()
      .required(formatMessage({ id: "Server token is required" }))
      .nullable(),
  });

  const sendgridSchema = Yup.object().shape({
    apiKey: Yup.string()
      .required(formatMessage({ id: "API key is required" }))
      .nullable(),
  });

  const customSmtpSchema = Yup.object().shape({
    server: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Smtp server address is required" }))
      .nullable(),
    username: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Username is required" }))
      .nullable(),
    password: Yup.string()
      .min(6, formatMessage({ id: "Minimum 6 characters" }))
      .max(256, formatMessage({ id: "Maximum 256 characters" }))
      .required(formatMessage({ id: "Password is required" }))
      .nullable(),
    encryption: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Encrypt type is required" }))
      .nullable(),
    port: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Port number is required" }))
      .nullable(),
  });

  const senderSchema = Yup.object().shape({
    fromName: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Inverstor relation is required" }))
      .nullable(),
    fromEmail: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Investor email is required" }))
      .nullable(),
    replyToName: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Investor name is required" }))
      .nullable(),
    replyToEmail: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Investor email is required" }))
      .nullable(),
  });

  const onSubmitPostmark = async (values: any) => {
    try {
      setPostmarkLoading(true);
      const {
        data: { success, errors },
      } = await createPostmarkMail(companyId, values);
      if (success) {
        setPostmarkLoading(false);
        toast.success(
          formatMessage({ id: "Postmark config saved successfully" })
        );
      } else {
        setPostmarkLoading(false);
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      setPostmarkLoading(false);
      console.log(err);
    }
  };

  const onSubmitSendgrid = async (values: any) => {
    try {
      setSendGridLoading(true);
      const {
        data: { success, errors },
      } = await createSendgridMail(companyId, values);
      if (success) {
        setSendGridLoading(false);
        toast.success(
          formatMessage({ id: "Sendgrid config saved successfully" })
        );
      } else {
        setSendGridLoading(false);
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      setSendGridLoading(false);
      console.log(err);
    }
  };

  const onSubmit = async (values: any) => {
    console.log(values);
  };
  const onSubmitCustomSmtp = async (values: any) => {
    try {
      setCustomSmtpLoading(true);
      const {
        data: { success, errors },
      } = await createCustomSmtpMail(companyId, values);
      if (success) {
        setCustomSmtpLoading(false);
        toast.success(formatMessage({ id: "SMTP config saved successfully." }));
      } else {
        setCustomSmtpLoading(false);
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      setCustomSmtpLoading(false);
      console.log(err);
    }
  };

  const onSubmitSender = async (values: any) => {
    try {
      if (editorRef.current?.getContent().length === 0) {
        setErrorValue(true);
        return;
      }
      setSenderLoading(true);
      const {
        data: { success, errors },
      } = await createSenderProfileInfo({
        companyId,
        fromName: values.fromName,
        fromAddress: values.fromEmail,
        replyToName: values.replyToName,
        replyToAddress: values.replyToEmail,
        emailSignature: editorRef.current?.getContent(),
      });
      if (success) {
        setErrorValue(false);
        setSenderLoading(false);
        toast.success(formatMessage({ id: "Sender profile updated" }));
      } else {
        setErrorValue(false);
        setSenderLoading(false);
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      setErrorValue(false);
      setSenderLoading(false);
      console.log(err);
    }
  };

  const updateRadioButton = async (value: string) => {
    try {
      const {
        data: { success, errors },
      } = await updateIsActive(companyId, { isActive: value });
      if (success) {
        toast.success(formatMessage({ id: "Mailer updated successfully" }));
        getMailInformation();
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const SendTestEmail = async (e: any, mailType: string) => {
    e.preventDefault();
    if (mailType === "postmark") {
      setSendPostMarkTestEmailLoading(true);
    }
    if (mailType === "sendgrid") {
      setSendGridTestEmailLoading(true);
    } else {
      setSendTestEmailLoading(true);
    }

    const {
      data: { success, errors },
    } = await sendTestMail(companyId, mailType);
    if (success) {
      setSendTestEmailLoading(false);
      setSendGridTestEmailLoading(false);
      setSendPostMarkTestEmailLoading(false);
      toast.success(formatMessage({ id: "Mail sent successfully" }));
    } else {
      setSendTestEmailLoading(false);
      setSendGridTestEmailLoading(false);
      setSendPostMarkTestEmailLoading(false);
      errors.forEach((error: string) => {
        toast.error(formatMessage({ id: error }));
      });
    }
  };

  return (
    <>
      <div className="card row">
        <div className="card-body">
          <div>
            <div>
              <h4 className="card-label">
                {formatMessage({ id: "Sender Profile" })}
                <ToolTipUI
                  tooltipText={"GLOBAL.TOOLTIP.EMAILINTEGRATION.SENDER_PROFILE"}
                />
              </h4>
            </div>

            <div className="row mt-4 mb-4">
              <div className="col-md-6">
                <Formik
                  initialValues={senderInitialValues}
                  validationSchema={senderSchema}
                  onSubmit={onSubmitSender}
                >
                  {(formik) => {
                    return (
                      <Form>
                        <TextInput
                          fieldType={"text"}
                          label={formatMessage({ id: "From Name" })}
                          fieldName={"fromName"}
                          formik={formik}
                          placeholder={formatMessage({
                            id: "eg. Investor Relation",
                          })}
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.EMAILINTEGRATION.FROMNAME",
                          })}
                          width={14}
                          isStarRequired={true}
                        />
                        <TextInput
                          fieldType={"text"}
                          label={formatMessage({ id: "From Address" })}
                          fieldName={"fromEmail"}
                          formik={formik}
                          placeholder={formatMessage({
                            id: "eg. invest@yourcompany.com",
                          })}
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.EMAILINTEGRATION.FROMEMAIL",
                          })}
                          width={14}
                          isStarRequired={true}
                        />
                        <TextInput
                          fieldType={"text"}
                          label={formatMessage({ id: "Reply-to Name" })}
                          fieldName={"replyToName"}
                          formik={formik}
                          placeholder={formatMessage({
                            id: "eg. Investor Relation",
                          })}
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.EMAILINTEGRATION.REPLYTONAME",
                          })}
                          width={14}
                          isStarRequired={true}
                        />
                        <TextInput
                          fieldType={"text"}
                          label={formatMessage({ id: "Reply-to Address" })}
                          fieldName={"replyToEmail"}
                          formik={formik}
                          placeholder={formatMessage({
                            id: "eg. invest@yourcompany.com",
                          })}
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.EMAILINTEGRATION.REPLYTOEMAIL",
                          })}
                          width={14}
                          isStarRequired={true}
                        />
                        <div className="mb-5">
                          <div className="">
                            <label className="form-label font-size-13 text-dark text-capitalize ms-3 ms-md-0">
                              {formatMessage({ id: "Email Signature" })}*{" "}
                              <ToolTipUI
                                tooltipText={formatMessage({
                                  id: "GLOBAL.TOOLTIP.EMAILINTEGRATION.EMAILSIGNATURE",
                                })}
                              />
                            </label>
                            <Editor
                              apiKey={process.env.REACT_APP_TINYMCE_KEY}
                              onInit={(evt, editor) => {
                                editorRef.current = editor;
                              }}
                              initialValue={emailSignature}
                              init={{
                                branding: false,
                                menubar: false,
                                height: 200,
                                plugins:
                                  "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
                                toolbar:
                                  "undo redo | bold italic underline fontfamily fontsize |  blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview | insertfile image  template link anchor codesample | ltr rtl",
                                content_style: `body { font-family: Poppins; font-size:14px;color:${
                                  mode === "dark" ? "white" : "black"
                                }}`,
                              }}
                              onEditorChange={() => setErrorValue(false)}
                            />
                            <div className="mt-2">
                              {errorValue && (
                                <span className="text-danger font-size-13">
                                  {formatMessage({ id: "Value is required" })}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <CustomButton
                            isSubmitting={formik.isSubmitting}
                            isValid={formik.isValid}
                            buttonText={formatMessage({ id: "Save Changes" })}
                            loading={senderLoading}
                            widthLoading={2}
                            width={3}
                            onSubmit={formik.handleSubmit}
                          />
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
              <div className="col-md-6">
                <InfoCard
                  title={formatMessage({ id: "Important" })}
                  desc={formatMessage({
                    id: "Please ensure that your “from” email id is verified or <br/>whitelisted in your chosen email service provider.<br/><br/> For example, if you have chosen invest@yourcompany.com as a from email id and selected sendgrid as your email service provider, then either this particular email id or your entire domain should be verified (or whitelisted) in the Sendgrid. If this is not done, your emails will be blocked from the Sendgrid’s side.<br/><br/> <b>To improve deliverability</b>, please ensure that you have added all needed DNS records for your sernder domain like SPF, DKMI, etc in your email service provider’s dashboard.",
                  })}
                  slug={"#"}
                />
              </div>
            </div>
          </div>

          <div className="">
            <h4 className="card-label">
              {formatMessage({ id: "Email Integration" })}
              <ToolTipUI
                tooltipText={"GLOBAL.TOOLTIP.EMAILINTEGRATION.EMAIL"}
              />
            </h4>
          </div>

          <div className="accordion" id="parent-accordion">
            <div className="row ">
              <div className="col-md-6">
                <div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={sendgridSchema}
                    onSubmit={onSubmit}
                  >
                    {(formik) => {
                      return (
                        <Form>
                          <div className="accordion-item mailer-radio">
                            <h2
                              className="accordion-header parent-accordion"
                              id="panelsStayOpen-headingFive"
                            >
                              <button
                                className={`accordion-button ${
                                  collapseFoundercrate ? "hideIt" : ""
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseFive"
                                aria-expanded="true"
                                aria-controls="panelsStayOpen-collapseFive"
                                onClick={() => {
                                  setCollapseFoundercrate(
                                    !collapseFoundercrate
                                  );
                                  setCollapseSmtp(true);
                                  setCollapsePostmark(true);
                                  setCollapseSendGrid(true);
                                }}
                              >
                                <input
                                  onClick={() => {
                                    updateRadioButton("foundercrate");
                                  }}
                                  type="radio"
                                  id="foundercrate"
                                  name="radio_button"
                                  className="radio-btn"
                                  checked={foundercrateRadio}
                                />
                                <img
                                  src={toAbsoluteUrl(
                                    "/media/auth/founderCrateOnlyLogo.svg"
                                  )}
                                  alt=""
                                  className="button-icon mt-4 ms-6"
                                />
                                <h6 className="font-weight-500 font-size-14 text-dark">
                                  {formatMessage({ id: "Foundercrate" })}
                                </h6>
                              </button>
                            </h2>
                            <div
                              id="panelsStayOpen-collapseFive"
                              className="accordion-collapse collapse"
                              aria-labelledby="panelsStayOpen-headingFive"
                              data-bs-parent="#parent-accordion"
                            >
                              <div className="accordion-body">
                                <p>
                                  {formatMessage({
                                    id: "Foundercrate SMTP server is limited to 1 email per second, 60 emails per hour & 2000 emails per month. If you need more emails, please use custom SMTP server.",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <div>
                  <Formik
                    initialValues={postmarkInitialValues}
                    validationSchema={postmarkSchema}
                    onSubmit={onSubmitPostmark}
                  >
                    {(formik) => {
                      return (
                        <Form>
                          <div className="accordion-item mailer-radio">
                            <h2
                              className="accordion-header parent-accordion"
                              id="panelsStayOpen-headingOne"
                            >
                              <button
                                className={`accordion-button ${
                                  collapsePostmark ? "hideIt" : ""
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseOne"
                                aria-expanded="true"
                                aria-controls="panelsStayOpen-collapseOne"
                                onClick={() => {
                                  setCollapsePostmark(!collapsePostmark);
                                  setCollapseSendGrid(true);
                                  setCollapseFoundercrate(true);
                                  setCollapseSmtp(true);
                                }}
                              >
                                <input
                                  onClick={() => {
                                    updateRadioButton("postmark");
                                  }}
                                  type="radio"
                                  id="postmark"
                                  name="radio_button"
                                  className="radio-btn"
                                  checked={postmarkRadio}
                                />
                                <img
                                  src={toAbsoluteUrl(
                                    "/media/icons/setting/postmark.png"
                                  )}
                                  alt=""
                                  className="button-icon mt-4 ms-6"
                                />
                                <h6 className=" font-weight-500 font-size-14 text-dark">
                                  {formatMessage({ id: "Postmark" })}
                                </h6>
                              </button>
                            </h2>
                            <div
                              id="panelsStayOpen-collapseOne"
                              className="accordion-collapse collapse"
                              aria-labelledby="panelsStayOpen-headingOne"
                              data-bs-parent="#parent-accordion"
                            >
                              <div className="accordion-body">
                                <div className="info-card important-notice-card">
                                  <div className="card mt-0 fs-6 flex-row mb-md-4 mb-8 ">
                                    {formatMessage({
                                      id: "Important! Please ensure your above defined sender profile is whitelisted in the server settings. Emails (even test emails) will not be delivered if this is not done.",
                                    })}
                                  </div>
                                </div>
                                <TextInput
                                  fieldType={"text"}
                                  label={formatMessage({ id: "Server Token" })}
                                  fieldName={"serverToken"}
                                  formik={formik}
                                  placeholder={formatMessage({
                                    id: "Enter Server Token of Postmark",
                                  })}
                                  toolTipText={formatMessage({
                                    id: "GLOBAL.TOOLTIP.EMAILINTEGRATION.SERVERTOKEN",
                                  })}
                                  width={14}
                                  isStarRequired={true}
                                />
                                <div className="d-flex justify-content-end">
                                  <div>
                                    {sendPostMarkTestEmailLoading ? (
                                      <button className="btn btn-bg-light me-2">
                                        <span className="indicator-label font-size-13 me-3">
                                          {formatMessage({
                                            id: "Please wait...",
                                          })}
                                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                        </span>
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-bg-light me-2"
                                        onClick={(e) => {
                                          SendTestEmail(e, "postmark");
                                        }}
                                      >
                                        {formatMessage({
                                          id: "Send Test Email",
                                        })}
                                      </button>
                                    )}
                                  </div>
                                  <div>
                                    <CustomButton
                                      isSubmitting={formik.isSubmitting}
                                      isValid={formik.isValid}
                                      buttonText={formatMessage({
                                        id: "Save Changes",
                                      })}
                                      loading={postmarkLoading}
                                      widthLoading={2}
                                      width={3}
                                      onSubmit={formik.handleSubmit}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={sendgridSchema}
                    onSubmit={onSubmitSendgrid}
                  >
                    {(formik) => {
                      return (
                        <Form>
                          <div className="accordion-item mailer-radio">
                            <h2
                              className="accordion-header parent-accordion"
                              id="panelsStayOpen-headingTwo"
                            >
                              <button
                                className={`accordion-button ${
                                  collapseSendGrid ? "hideIt" : ""
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseTwo"
                                aria-expanded="true"
                                aria-controls="panelsStayOpen-collapseTwo"
                                onClick={() => {
                                  setCollapseSendGrid(!collapseSendGrid);
                                  setCollapseFoundercrate(true);
                                  setCollapseSmtp(true);
                                  setCollapsePostmark(true);
                                }}
                              >
                                <input
                                  onClick={() => {
                                    updateRadioButton("sendgrid");
                                  }}
                                  type="radio"
                                  id="sendgrid"
                                  name="radio_button"
                                  className="radio-btn"
                                  checked={sendgridRadio}
                                />
                                <img
                                  src={toAbsoluteUrl(
                                    "/media/icons/setting/send_grid.svg"
                                  )}
                                  alt=""
                                  className="button-icon mt-4 ms-6"
                                />
                                <h6 className="font-weight-500 font-size-14 text-dark">
                                  {formatMessage({ id: "Sendgrid" })}
                                </h6>
                              </button>
                            </h2>
                            <div
                              id="panelsStayOpen-collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="panelsStayOpen-headingTwo"
                              data-bs-parent="#parent-accordion"
                            >
                              <div className="accordion-body">
                                <TextInput
                                  fieldType={"text"}
                                  label={formatMessage({ id: "API Key" })}
                                  fieldName={"apiKey"}
                                  formik={formik}
                                  placeholder={formatMessage({
                                    id: "Enter API key of sendgrid",
                                  })}
                                  toolTipText={formatMessage({
                                    id: "GLOBAL.TOOLTIP.EMAILINTEGRATION.API_KEY",
                                  })}
                                  width={14}
                                  isStarRequired={true}
                                />
                                <div className="d-flex justify-content-end">
                                  <div>
                                    {sendGridTestEmailLoading ? (
                                      <button className="btn btn-bg-light me-2">
                                        <span className="indicator-label font-size-13 me-3">
                                          {formatMessage({
                                            id: "Please wait...",
                                          })}
                                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                        </span>
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-bg-light me-2"
                                        onClick={(e) => {
                                          SendTestEmail(e, "sendgrid");
                                        }}
                                      >
                                        {formatMessage({
                                          id: "Send Test Email",
                                        })}
                                      </button>
                                    )}
                                  </div>
                                  <CustomButton
                                    isSubmitting={formik.isSubmitting}
                                    isValid={formik.isValid}
                                    buttonText={formatMessage({
                                      id: "Save Changes",
                                    })}
                                    loading={sendGridLoading}
                                    widthLoading={2}
                                    width={3}
                                    onSubmit={formik.handleSubmit}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <div>
                  <Formik
                    initialValues={customSmtpInitialValues}
                    validationSchema={customSmtpSchema}
                    onSubmit={onSubmitCustomSmtp}
                  >
                    {(formik) => {
                      return (
                        <Form>
                          <div className="accordion-item mailer-radio">
                            <h2
                              className="accordion-header parent-accordion"
                              id="panelsStayOpen-headingFour"
                            >
                              <button
                                className={`accordion-button ${
                                  collapseSmtp ? "hideIt" : ""
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseFour"
                                aria-expanded="true"
                                aria-controls="panelsStayOpen-collapseFour"
                                onClick={() => {
                                  setCollapseSmtp(!collapseSmtp);
                                  setCollapseSendGrid(true);
                                  setCollapseFoundercrate(true);
                                  setCollapsePostmark(true);
                                }}
                              >
                                <input
                                  onClick={() => {
                                    updateRadioButton("smtp");
                                  }}
                                  type="radio"
                                  id="customsmtp"
                                  name="radio_button"
                                  className="radio-btn"
                                  checked={customsmtpRadio}
                                />
                                <img
                                  src={toAbsoluteUrl(
                                    "/media/icons/setting/custom_smts.svg"
                                  )}
                                  alt=""
                                  className="button-icon mt-4 ms-6"
                                />
                                <h6 className="font-weight-500 font-size-14 text-dark">
                                  {formatMessage({ id: "Custom SMTP" })}
                                </h6>
                              </button>
                            </h2>
                            <div
                              id="panelsStayOpen-collapseFour"
                              className="accordion-collapse collapse"
                              aria-labelledby="panelsStayOpen-headingFour"
                              data-bs-parent="#parent-accordion"
                            >
                              <div className="accordion-body">
                                <TextInput
                                  fieldType={"text"}
                                  label={formatMessage({
                                    id: "SMTP Server Address",
                                  })}
                                  fieldName={"server"}
                                  formik={formik}
                                  placeholder={formatMessage({
                                    id: "e.g smtp.gmail.com",
                                  })}
                                  toolTipText={formatMessage({
                                    id: "GLOBAL.TOOLTIP.EMAILINTEGRATION.SMTP_SERVER_ADDRESS",
                                  })}
                                  width={14}
                                  isStarRequired={true}
                                />
                                <TextInput
                                  fieldType={"text"}
                                  label={formatMessage({ id: "Username" })}
                                  fieldName={"username"}
                                  formik={formik}
                                  placeholder={formatMessage({
                                    id: "Enter User name",
                                  })}
                                  toolTipText={formatMessage({
                                    id: "GLOBAL.TOOLTIP.EMAILINTEGRATION.USERNAME",
                                  })}
                                  width={14}
                                  isStarRequired={true}
                                />
                                <TextInput
                                  fieldType={"password"}
                                  label={formatMessage({ id: "Password" })}
                                  fieldName={"password"}
                                  formik={formik}
                                  placeholder={formatMessage({
                                    id: "Enter your password here",
                                  })}
                                  toolTipText={formatMessage({
                                    id: "GLOBAL.TOOLTIP.EMAILINTEGRATION.PASSWORD",
                                  })}
                                  width={14}
                                  isStarRequired={true}
                                />
                                <div>
                                  <div className="col-md-12">
                                    <label className="form-label font-size-13 text-dark">
                                      {formatMessage({
                                        id: "Encrypt type and port number*",
                                      })}
                                    </label>
                                    <ToolTipUI
                                      tooltipText={
                                        "GLOBAL.TOOLTIP.REFFERAL.ENCRYPTTYPE_PORTNUMBER"
                                      }
                                    />
                                  </div>

                                  <div className="row">
                                    <div className="col-md-2 mt-2 p-0">
                                      <SelectInput
                                        fieldName={"encryption"}
                                        placeholder={formatMessage({
                                          id: "SSL",
                                        })}
                                        formik={formik}
                                        options={customSmtpOptions}
                                        width={10}
                                        isTooltipNotRequired={true}
                                      />
                                    </div>
                                    <div className="col-md-10 p-0 pe-2">
                                      <TextInput
                                        fieldType={"text"}
                                        fieldName={"port"}
                                        formik={formik}
                                        placeholder={formatMessage({
                                          id: "e.g 465,587",
                                        })}
                                        width={14}
                                        isTooltipNotRequired={true}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                  <div>
                                    {sendTestEmailLoading ? (
                                      <button className="btn btn-bg-light me-2">
                                        <span className="indicator-label font-size-13 me-3">
                                          {formatMessage({
                                            id: "Please wait...",
                                          })}
                                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                        </span>
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-bg-light me-2"
                                        onClick={(e) => {
                                          SendTestEmail(e, "smtp");
                                        }}
                                      >
                                        {formatMessage({
                                          id: "Send Test Email",
                                        })}
                                      </button>
                                    )}
                                  </div>
                                  <CustomButton
                                    isSubmitting={formik.isSubmitting}
                                    isValid={formik.isValid}
                                    buttonText={formatMessage({
                                      id: "Save Changes",
                                    })}
                                    loading={customSmtpLoading}
                                    widthLoading={2}
                                    width={3}
                                    onSubmit={formik.handleSubmit}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
