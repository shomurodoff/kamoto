import { useIntl } from "react-intl";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Form, Formik } from "formik";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { DisplayImage } from "../../widgets/components/General/DisplayImage";
import "../../profile/styles/index.scss";
import TextInput from "../../widgets/components/Input/TextInput";
import * as Yup from "yup";
import { FileUpload } from "../../widgets/components/FileUpload";
import { addInvestorUser } from "../core/_requests";
import { toast } from "react-toastify";

const initialValues = {
  fullName: "",
  email: "",
  designation: "",
  linkedIn: "",
  profileImageId: "",
};

export const AddInvestorUserModal = ({
  userModalShow,
  setUserModalShow,
  id,
  getAllInvestorUser,
  getInvestor,
}: any) => {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const [modelStatus, setModelStatus] = useState<boolean>(false);
  const [imgName, setImgName] = useState<string>();
  const userSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Full name is required" }))
      .nullable(),
    email: Yup.string()
      .email(formatMessage({ id: "Invalid email format" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Email is required" })),
    designation: Yup.string().required(
      formatMessage({ id: "Designation is required" })
    ),
    linkedIn: Yup.string(),
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      const {
        data: { success, errors },
      } = await addInvestorUser(values, id);
      if (success) {
        if (getAllInvestorUser) {
          await getAllInvestorUser();
        }

        if (getInvestor) {
          await getInvestor();
        }
        toast.success(
          formatMessage({ id: "Investor User Added successfully" })
        );
        setLoading(false);
        setImgName("");
        setUserModalShow(false);
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleOpen = () => {
    setModelStatus(true);
  };
  const handleClose = () => {
    setModelStatus(false);
  };
  return (
    <Modal
      size="lg"
      show={userModalShow}
      onHide={() => setUserModalShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Modal.Body>
                <div className="d-flex justify-content-between m-5">
                  <h2>{formatMessage({ id: "Add Contact" })}</h2>
                  <img
                    src={toAbsoluteUrl("/media/icons/investor/Cancel.svg")}
                    alt="cancel"
                    className="cursor-pointer"
                    onClick={() => {
                      setUserModalShow(false);
                      setImgName("");
                    }}
                  />
                </div>
                <div className="mt-8 m-5">
                  <div className="d-flex flex-column flex-md-row col-12">
                    <div className="col-md-5 col-10">
                      <p>{formatMessage({ id: "Profile Picture" })}</p>
                      <div
                        className={`people-profile-card position-relative d-flex justify-content-center m-md-0 m-auto ${
                          imgName ? "card-name" : "p-0"
                        }`}
                        onClick={handleOpen}
                      >
                        <DisplayImage
                          imgName={imgName}
                          alt="profile"
                          width="100%"
                        />
                        <div className="pencil-container">
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/duotune/general/pencil.svg"
                            )}
                            alt=""
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="mt-4 allowedType">
                        {formatMessage({
                          id: "Allowed file types: png, jpg, jpeg.",
                        })}
                      </div>
                    </div>
                    <FileUpload
                      fileSize={2097152}
                      maxFileNumber={1}
                      allowType={["image/*", ".jpg", ".jpeg", ".png"]}
                      metaData={{ module: "profileimg", isProtected: true }}
                      modalStatus={modelStatus}
                      handleClose={handleClose}
                      handleSuccess={(id: number, name: string) => {
                        setImgName(name);
                        formik.setFieldValue("profileImageId", id);
                      }}
                    />
                    <div className="col-md-7 col-12 mt-md-0 mt-6">
                      <TextInput
                        fieldType={"text"}
                        label={formatMessage({ id: "Full Name" })}
                        fieldName={"fullName"}
                        formik={formik}
                        placeholder={formatMessage({ id: "Enter name" })}
                        margin="me-6"
                        width={15}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.PEOPLE.NAME",
                        })}
                        isStarRequired={true}
                      />
                      <TextInput
                        fieldType={"email"}
                        fieldName={"email"}
                        formik={formik}
                        placeholder={formatMessage({ id: "Enter Email" })}
                        label={formatMessage({ id: "Email" })}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.PEOPLE.EMAIL",
                        })}
                        isStarRequired={true}
                      />
                      <TextInput
                        fieldType={"text"}
                        fieldName={"designation"}
                        formik={formik}
                        placeholder={formatMessage({ id: "Enter Designation" })}
                        label={formatMessage({ id: "Designation" })}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.PEOPLE.DESIGNATION",
                        })}
                        isStarRequired={true}
                      />
                      <TextInput
                        fieldType={"url"}
                        fieldName={"linkedIn"}
                        formik={formik}
                        placeholder={""}
                        label={formatMessage({ id: "LinkedIn Profile Link" })}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.PEOPLE.LINKEDIN",
                        })}
                        isStarRequired={false}
                      />
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex gap-3 m-5 w-100 justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-bg-light w-50 w-md-auto font-size-13"
                    onClick={() => {
                      setUserModalShow(false);
                      setImgName("");
                    }}
                  >
                    {formatMessage({ id: "Cancel" })}
                  </button>
                  <button
                    className="btn btn-primary w-50 w-md-auto font-size-13"
                    disabled={loading}
                  >
                    {!loading && (
                      <span className="indicator-label font-size-13 p-0">
                        {formatMessage({ id: "Add Contact" })}
                      </span>
                    )}
                    {loading && (
                      <span className="indicator-label font-size-13 p-0">
                        {formatMessage({ id: "Please wait..." })}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    )}
                  </button>
                </div>
              </Modal.Footer>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};
