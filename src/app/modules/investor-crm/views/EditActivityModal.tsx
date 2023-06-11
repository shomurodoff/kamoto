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
import { Modal } from "react-bootstrap";
import { activityTypeConst_ } from "../core/_constants";
import { activityModel } from "../core/_models";
import { getAllInvestor } from "../../investor-database/core/_requests";
import { editActivity, getAllUsers } from "../core/_requests";
import { useAuth } from "../../auth";
import { toast } from "react-toastify";
import { FileUpload } from "../../widgets/components/FileUpload";
import cross from "../../../../_metronic/assets/images/svg/investor-crm/crossIcon.svg";

const activityInitialValues = {
  title: "",
  selectInvestor: "",
  fromDate: "",
  fromTime: "",
  toDate: "",
  toTime: "",
  guest: "",
  meetingLink: "",
  activityType: "",
  meetingNotes: "",
  timeZone: "",
  documentId: "",
};

export const EditActivityModal = ({
  modalShow,
  setModalShow,
  activityData,
  investorId,
  getActivity,
}: {
  modalShow: boolean;
  setModalShow: Dispatch<SetStateAction<boolean>>;
  activityData: activityModel | undefined;
  investorId: number;
  getActivity: () => void;
}) => {
  const {personalityId, currentUser} = useAuth()
  const {formatMessage} = useIntl()
  const [loading, setLoading] = useState(false)
  const [allInvestors, setAllInvestors] = useState<any>()
  const [allUsers, setAllUsers] = useState<any>()
  const [allDay, setAllDay] = useState(false)
  const [hide, setHide] = useState(false)
  const [activityType, setActivityType] = useState<string>()
  const [modelStatus, setModelStatus] = useState<boolean>(false)
  const [documentName, setDocumentName] = useState<string>()
  const [formValues, setFormValues] = useState<any>()

  const intializeActiveSchema = Yup.object().shape({
    title: Yup.string().required(formatMessage({ id: "Title is required" })),
    selectInvestor: Yup.string(),
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
    activityType: Yup.string().required(
      formatMessage({ id: "Activity Type is required" })
    ),
    meetingLink: Yup.string().url(),
    meetingNotes: Yup.string(),
    documentId: Yup.string(),
  });

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      let data: any = {};
      data.activityId = activityData?.activityId;
      data.activityType = values.activityType;
      data.title = values.title;
      data.startActivityTime = values.fromDate + " " + values.fromTime + "z";
      data.endActivityTime = values.toDate + " " + values.toTime + "z";
      data.timeZone = values.timeZone;
      if (values.guest.length > 0) {
        data.guest = values.guest;
      }
      if (values.documentId) {
        data.documentId = +values.documentId;
      } else {
        data.documentId = null;
      }
      data.meetingLink = values.meetingLink;
      data.meetingNotes = values.meetingNotes;

      const {
        data: { success, errors },
      } = await editActivity(data);
      if (success) {
        getActivity();
        setLoading(false);
        setModalShow(false);
        toast.success(formatMessage({ id: "Acitivity edit successfully" }));
      } else {
        setLoading(false);
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    const getInvestors = async () => {
      try {
        const {
          data: {
            success,
            data: { data: allApiInvestors },
          },
        } = await getAllInvestor('', '', '', '', personalityId)
        if (success) {
          let investors: any = [];
          investors = allApiInvestors.map((investor: any) => {
            return {
              id: investor.investorId,
              name: investor.name,
              value: investor.investorId,
            };
          });
          if (investors.length > 0) {
            setAllInvestors(investors);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (personalityId) {
      getInvestors()
    }
  }, [personalityId])

  useEffect(() => {
    const getAllUser = async () => {
      if (personalityId) {
        const {
          data: {data: values, success},
        } = await getAllUsers(personalityId)
        if (success) {
          let users: any = [];
          users = values.map((user: any) => {
            return {
              id: user.userId,
              name: `${user?.firstName} ${user?.lastName}`,
              value: user.userId,
            };
          });
          if (users.length > 0) {
            setAllUsers(users);
          }
        }
      }
    }
    getAllUser()
  }, [personalityId])

  useEffect(() => {
    if (activityData) {
      setFormValues({
        ...activityInitialValues,
        title: activityData.title,
        selectInvestor: investorId.toString(),
        meetingLink: activityData?.meetingLink,
        timeZone: activityData.timeZone,
        meetingNotes: activityData?.meetingNotes,
        guest: activityData.guest || "",
        activityType: activityData.activityType,
        fromDate: activityData?.startActivityTime.slice(0, 10),
        fromTime: activityData?.startActivityTime.slice(11, 16),
        toDate: activityData?.endActivityTime.slice(0, 10),
        toTime: activityData?.startActivityTime.slice(11, 16),
        documentId: activityData?.documentId
          ? activityData?.documentId.toString()
          : "",
      });

      if (activityData?.documentId) {
        setDocumentName(activityData?.documentImg.name.split("-")[0]);
      }
    }
  }, [activityData, investorId]);

  useEffect(() => {
    if (activityType) {
      if (
        activityType === "tasks" ||
        activityType === "notes" ||
        activityType === "documents"
      ) {
        setHide(true);
      } else {
        setHide(false);
      }
    }
  }, [activityType]);

  const handleOpen = () => {
    setModelStatus(true);
  };
  const handleClose = () => {
    setModelStatus(false);
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
          setActivityType(formik.values.activityType);
          return (
            <Modal
              size="xl"
              show={modalShow}
              onHide={() => setModalShow(false)}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <div className="fs-4 fw-bold">
                  <h2>{formatMessage({ id: "Edit activity" })}</h2>
                </div>
              </Modal.Header>
              <Modal.Body className="py-3">
                <Form className="w-100 col-12 mt-5">
                  <div className=" row">
                    <div className="col-12 col-lg-6 col-xl-6 col-md-6">
                      <div className="mx-2">
                        <TextInput
                          fieldType={"text"}
                          label={formatMessage({ id: "Edit Title" })}
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
                          placeholder={formatMessage({
                            id: "Select a Investor",
                          })}
                          formik={formik}
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.ACTIVITY.SELECT_INVESTOR",
                          })}
                          options={allInvestors}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`row mx-2 justify-content-between align-items-center ${
                      hide ? "d-none" : ""
                    }`}
                  >
                    <div className="col-12">
                      <label className="ps-0 font-size-13">
                        {formatMessage({ id: "Select Meeting time" })}
                        <ToolTipUI
                          tooltipText={formatMessage({
                            id: "Select Meeting time",
                          })}
                        />
                      </label>
                    </div>
                    <div className="col-lg-2 col-md-2 col-xl-2 col-12 height-42px">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={(isChecked) => {
                          if (isChecked.target.checked) {
                            formik.setFieldValue("fromTime", "00:01");
                            formik.setFieldValue("toTime", "23:59");
                          } else {
                            formik.setFieldValue("fromTime", "");
                            formik.setFieldValue("toTime", "");
                          }
                          setAllDay(isChecked.target.checked);
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
                  <div className=" row">
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
                            disabled={true}
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
                      className={`col-12 col-lg-6 col-xl-6 col-md-6 mb-8 ${
                        activityType === "documents" ? "" : "d-none"
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
                        <div className="d-flex gap-5">
                          <BasicButton
                            onClick={handleOpen}
                            buttonText={formatMessage({
                              id: "Upload Document",
                            })}
                            border="none"
                            color="#F5F8FA"
                            textColor="#5E6278"
                            width="225px"
                          />
                          {documentName && documentName.length > 0 && (
                            <img
                              src={cross}
                              alt="cross icon"
                              className="me-3 cursor-pointer"
                              onClick={() => {
                                formik.setFieldValue("documentId", "");
                                setDocumentName("");
                              }}
                            />
                          )}
                        </div>

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
                        hide ? "d-none" : ""
                      }`}
                    >
                      <div className="mx-2">
                        <TextInput
                          fieldType={"text"}
                          label={formatMessage({ id: "Edit Guests" })}
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
                    <div className="col-12 col-lg-6 col-xl-6 col-md-6">
                      <div className="mx-2">
                        <SelectInput
                          label={formatMessage({ id: "Activity Type" })}
                          fieldName={"activityType"}
                          placeholder={formatMessage({
                            id: "Select a Activity Type",
                          })}
                          formik={formik}
                          toolTipText={formatMessage({
                            id: "GLOBAL.TOOLTIP.ACTIVITY.TYPE",
                          })}
                          options={activityTypeConst_}
                        />
                      </div>
                    </div>
                    <div
                      className={`col-12 col-lg-6 col-xl-6 col-md-6 ${
                        hide ? "d-none" : ""
                      }`}
                    >
                      <div className="mx-2">
                        <TextInput
                          fieldType={"text"}
                          label={formatMessage({ id: "Meeting link" })}
                          fieldName={"meetingLink"}
                          placeholder={formatMessage({
                            id: "Enter Meeting link",
                          })}
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
                          label={formatMessage({ id: "Edit Notes" })}
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
                    <div className="d-flex justify-content-end me-md-6 mb-8">
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
                        buttonText={formatMessage({ id: "Edit Activity" })}
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
              </Modal.Body>
            </Modal>
          );
        }}
      </Formik>
    </>
  );
};
