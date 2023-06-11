import { useIntl } from "react-intl";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import TextInput from "../../widgets/components/Input/TextInput";
import { SelectInput } from "../../widgets/components/Input/SelectInput";
import { ToolTipUI } from "../../widgets/components/UI/ToolTipUI";
import TextArea from "../../widgets/components/Input/TextArea";
import { BasicButton } from "../../widgets/components/UI/BasicButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import { timeZoneOptions } from "../../profile/core/_constants";

import { activityInitialValues } from "../core/_constants";
import { useAuth } from "../../auth";
import { createActivity } from "../core/_requests";
import { toast } from "react-toastify";
import { FileUpload } from "../../widgets/components/FileUpload";

export const CreateAllActivity = ({
  setModalShow,
  allInvestors,
  allUsers,
  type,
  companyId,
  investorId,
  getActivity,
}: {
  setModalShow: Dispatch<SetStateAction<boolean>>;
  allInvestors: {
    id: number;
    name: string;
    value: number;
  };
  allUsers: any;
  type: string;
  companyId: string;
  investorId?: number;
  getActivity?: () => void;
}) => {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [formValues, setFormValues] = useState<any>(null);
  const [modelStatus, setModelStatus] = useState<boolean>(false);
  const [documentName, setDocumentName] = useState<string>();
  const { currentUser } = useAuth();

  const intializeActiveSchema = Yup.object().shape({
    title: Yup.string().required(formatMessage({ id: "Title is required" })),
    selectInvestor: Yup.string().required(
      formatMessage({ id: "Investor should be selected" })
    ),
    assignHost: Yup.string(),
    fromDate: Yup.date()
      .required(formatMessage({ id: "From date required" }))
      .nullable(),
    fromTime: Yup.string()
      .required(formatMessage({ id: "From time required" }))
      .nullable(),
    toDate: Yup.date()
      .required(formatMessage({ id: "To date required" }))
      .nullable(),
    toTime: Yup.string()
      .required(formatMessage({ id: "To time required" }))
      .nullable(),
    timeZone: Yup.string().required(
      formatMessage({ id: "Timezone is required" })
    ),
    guest: Yup.string(),
    meetingLink: Yup.string().url(),
    meetingNotes: Yup.string(),
    documentId: Yup.string(),
  });
  useEffect(() => {
    if (investorId) {
      activityInitialValues.selectInvestor = investorId.toString();
    }
  }, [investorId]);

  useEffect(() => {
    const storedTimeZone = localStorage.getItem("timeZone");
    const selectedTimeZone = timeZoneOptions.find((timeZone) => {
      return timeZone.value === storedTimeZone;
    });
    if (selectedTimeZone) {
      activityInitialValues.timeZone = selectedTimeZone.value;
    } else {
      activityInitialValues.timeZone = "UTC+05:30";
    }
  }, []);

  useEffect(() => {
    const time = new Date().toLocaleDateString("en-US").split("/");
    let date;
    if (+time[0] > 9) {
      date = time[2] + "-" + time[0] + "-" + time[1];
    } else {
      date = time[2] + "-0" + time[0] + "-" + time[1];
    }

    if (type === "tasks" || type === "notes" || type === "documents") {
      var currentHour = new Date().getHours();
      var currentMinutes = new Date().getMinutes();
      var futureTime = new Date(new Date().getTime() + 15 * 60000);
      var futureHour = futureTime.getHours();
      var futureMinutes = futureTime.getMinutes();
      setFormValues({
        ...activityInitialValues,
        fromDate: date,
        fromTime: `${currentHour}:${currentMinutes}`,
        toDate: date,
        toTime: `${futureHour}:${futureMinutes}`,
      });
    } else {
      setFormValues({
        ...activityInitialValues,
        fromDate: date,
        fromTime: "",
        toDate: date,
        toTime: "",
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpen = () => {
    setModelStatus(true);
  };
  const handleClose = () => {
    setModelStatus(false);
  };

  const onSubmit = async (values: any) => {
    setLoading(true);

    let data: any = {};
    data.activityType = type;
    data.companyId = companyId;
    data.status = "pending";
    data.title = values.title;
    data.investorId = +values.selectInvestor;
    data.startActivityTime = values.fromDate + " " + values.fromTime + "z";
    data.endActivityTime = values.toDate + " " + values.toTime + "z";
    data.timeZone = values.timeZone;
    if (values.guest.length > 0) {
      data.guest = values.guest;
    }
    if (values.documentId) {
      data.documentId = +values.documentId;
    }
    data.meetingLink = values.meetingLink;
    data.meetingNotes = values.meetingNotes;
    if (values.assignHost) {
      data.host = +values.assignHost;
    } else {
      data.host = currentUser?.userId;
    }
    const {
      data: { success, errors },
    } = await createActivity(data);
    if (success) {
      setLoading(false);
      setModalShow(false);
      if (investorId) {
        getActivity!();
      }
      toast.success(formatMessage({ id: "Activity created successfully" }));
    } else {
      setLoading(false);
      errors.forEach((error: string) => {
        toast.error(formatMessage({ id: error }));
      });
    }
    try {
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <Formik
        validationSchema={intializeActiveSchema}
        initialValues={formValues || activityInitialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="w-100 col-12 mt-5">
              <div className=" row">
                <div className="col-12 col-lg-6 col-xl-6 col-md-6">
                  <div className="mx-2">
                    <TextInput
                      fieldType={"text"}
                      label={formatMessage({ id: "Add Title" })}
                      fieldName={"title"}
                      placeholder={formatMessage({
                        id: "Enter activity title",
                      })}
                      formik={formik}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.ACTIVITY.TITLE",
                      })}
                      isTooltipNotRequired={false}
                      isStarRequired={true}
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-6 col-md-6">
                  <div className="mx-2">
                    <SelectInput
                      label={formatMessage({ id: "Select Investor" })}
                      fieldName={"selectInvestor"}
                      placeholder={formatMessage({ id: "Select a Investor" })}
                      formik={formik}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.ACTIVITY.SELECT_INVESTOR",
                      })}
                      options={allInvestors}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`row justify-content-between align-items-center ${
                  type === "tasks" || type === "notes" || type === "documents"
                    ? "d-none"
                    : ""
                }`}
              >
                <div className="col-12">
                  <label className="ps-0 font-size-13 mx-2">
                    {formatMessage({ id: "Select time" })}
                    <ToolTipUI
                      tooltipText={formatMessage({ id: "Select Meeting time" })}
                    />
                  </label>
                </div>
                <div className={`row align-items-center mx-2`}>
                  <div className="col-lg-2 col-md-2 col-xl-2 col-12 height-42px px-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={(isChecked) => {
                        if (isChecked.target.checked) {
                          formik.setFieldValue("fromTime", "00:01");
                          formik.setFieldValue("toTime", "23:59");
                          setAllDay(isChecked.target.checked);
                        } else {
                          formik.setFieldValue("fromTime", "");
                          formik.setFieldValue("toTime", "");
                          setAllDay(isChecked.target.checked);
                        }
                      }}
                    />
                    <label className="ms-3 fw-semibold">
                      {formatMessage({ id: "All day" })}{" "}
                    </label>
                  </div>
                  <div className="col-lg-2 col-md-2 col-xl-2 col-12">
                    <TextInput
                      fieldType={"date"}
                      fieldName={"fromDate"}
                      formik={formik}
                      placeholder=""
                      isTooltipNotRequired={true}
                      isWidthNotRequired={false}
                    />
                  </div>
                  <div className="col-lg-2 col-md-2 col-xl-2 col-12 reduce_padding">
                    <TextInput
                      fieldType={"time"}
                      fieldName={"fromTime"}
                      formik={formik}
                      placeholder=""
                      isTooltipNotRequired={true}
                      isWidthNotRequired={false}
                      isDisabled={allDay}
                    />
                  </div>

                  <div className="col-lg-2 col-md-2 col-xl-2 col-12">
                    <TextInput
                      fieldType={"date"}
                      fieldName={"toDate"}
                      formik={formik}
                      placeholder=""
                      isTooltipNotRequired={true}
                      isWidthNotRequired={false}
                    />
                  </div>
                  <div className="col-lg-2 col-md-2 col-xl-2 col-12 reduce_padding">
                    <TextInput
                      fieldType={"time"}
                      fieldName={"toTime"}
                      formik={formik}
                      placeholder=""
                      isTooltipNotRequired={true}
                      isWidthNotRequired={false}
                      isDisabled={allDay}
                    />
                  </div>
                  <div className="col-lg-2 col-md-2 col-xl-2 col-12">
                    <SelectInput
                      fieldName={"timeZone"}
                      placeholder={formatMessage({ id: "Select Timezone" })}
                      formik={formik}
                      options={timeZoneOptions}
                      isTooltipNotRequired={true}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-6 col-xl-6 col-md-6 mb-8">
                  <div className="mx-2">
                    <div>
                      <label className="form-label font-size-13 text-dark text-capitalize ms-3 ms-md-0">
                        {formatMessage({ id: "Assign Host" })}*{" "}
                        <ToolTipUI
                          tooltipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.ACTIVITY.ASSIGN_HOST",
                          })}
                        />
                      </label>

                      <Field
                        as="select"
                        name="assignHost"
                        defaultValue={currentUser?.userId}
                        className=" form-select h-40px font-size-13"
                      >
                        {allUsers?.map((user: any) => (
                          <option key={user.id} value={user.value}>
                            {user.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-12 col-lg-6 col-xl-6 col-md-6  ${
                    type === "documents" ? "" : "d-none"
                  }`}
                >
                  <div className="mx-2 d-flex flex-column">
                    <label className="form-label font-size-13 text-dark text-capitalize ms-3 ms-md-0">
                      {formatMessage({ id: "Document" })}
                      <ToolTipUI
                        tooltipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.ACTIVITY.DOCUMENT",
                        })}
                      />
                    </label>
                    <BasicButton
                      onClick={handleOpen}
                      buttonText={formatMessage({ id: "Upload Document" })}
                      border="none"
                      color="#F5F8FA"
                      textColor="#5E6278"
                      width="225px"
                    />
                    {documentName ? (
                      <p className="mt-2">
                        {documentName} file uploaded successfully
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div
                  className={`col-12 col-lg-6 col-xl-6 col-md-6 ${
                    type === "tasks" || type === "notes" || type === "documents"
                      ? "d-none"
                      : ""
                  }`}
                >
                  <div className="mx-2 ">
                    <TextInput
                      fieldType={"text"}
                      label={formatMessage({ id: "Add Guests" })}
                      fieldName={"guest"}
                      placeholder={formatMessage({
                        id: "Enter guests email address",
                      })}
                      formik={formik}
                      isStarRequired={false}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.ACTIVITY.ADD_GUESTS",
                      })}
                    />
                  </div>
                </div>
                <div
                  className={`col-12 col-lg-6 col-xl-6 col-md-6 ${
                    type === "tasks" || type === "notes" || type === "documents"
                      ? "d-none"
                      : ""
                  }`}
                >
                  <div className="mx-2">
                    <TextInput
                      fieldType={"text"}
                      label={formatMessage({ id: "Meeting link" })}
                      fieldName={"meetingLink"}
                      placeholder={formatMessage({ id: "Enter Meeting link" })}
                      formik={formik}
                      isStarRequired={false}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.ACTIVITY.MEETING_LINK",
                      })}
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-6 col-md-6">
                  <div className="mx-2">
                    <TextArea
                      label={formatMessage({ id: "Add Notes" })}
                      fieldName={"meetingNotes"}
                      placeholder={formatMessage({
                        id: "Enter notes",
                      })}
                      formik={formik}
                      isStarRequired={false}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.ACTIVITY.MEETING_NOTES",
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className=" row">
                <div className="d-flex justify-content-end me-md-6">
                  <BasicButton
                    onClick={() => setModalShow(false)}
                    buttonText={formatMessage({ id: "Cancel" })}
                    border="none"
                    color="#F5F8FA"
                    textColor="#5E6278"
                    minWidth={90}
                  />

                  <CustomButton
                    isSubmitting={formik.isSubmitting}
                    isValid={formik.isValid}
                    buttonText={formatMessage({ id: "Add Activity" })}
                    loading={loading}
                    width={12}
                    marginButtom={"mb-0 ms-3"}
                    widthLoading={4}
                    height={44}
                  />
                  <FileUpload
                    fileSize={10485760}
                    maxFileNumber={1}
                    allowType={[
                      "application/pdf",
                      "application/msword",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    ]}
                    metaData={{ module: "document", isProtected: true }}
                    modalStatus={modelStatus}
                    handleClose={handleClose}
                    handleSuccess={(id: number, name: string) => {
                      formik.setFieldValue("documentId", id);
                      setDocumentName(name.split("-")[0]);
                    }}
                  />
                </div>
                {/* </div> */}
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
