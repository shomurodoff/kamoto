import { useCallback, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../widgets/components/Input/TextInput";
import { useIntl } from "react-intl";
import "../styles/InvestorCrm.scss";
import { CiMinimize1, CiMaximize1 } from "react-icons/ci";
import {
  addColumn,
  editColumn,
  getAllColumnsFromRoundId,
} from "../core/_requests";
import { ToolTipUI } from "../../widgets/components/UI/ToolTipUI";
import { GET_FILE_URL } from "../../investor-database/core/_requests";
import { toast } from "react-toastify";
import { useShortScale } from "../../../hooks/useShortScale";

export const CurrentRound = ({
  activeRound,
  setModalShow,
  show,
  setShow,
  selectedRoundId,
  setGetAllColumns,
  columnDetails,
  setColumnsDetails,
  setIsEditRound,
}: any) => {
  const [color, setColor] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const { convertValueToShortScale } = useShortScale();

  const initialValues = {
    name: "",
  };

  const columnNameSchema = Yup.object().shape({
    name: Yup.string().required("Column Name is required"),
  });
  const { formatMessage } = useIntl();
  const colorArray = ["#383940", "#4776E6", "#1BC5BD", "#F64E60", "#50BEE8"];

  const onSubmit = useCallback(
    async (values: any) => {
      setLoading(true);
      const column: any = {};
      column["columnName"] = values.name;
      if (!color) {
        column["color"] = columnDetails.color;
      } else {
        column["color"] = color;
      }
      if (columnDetails?.columnId) {
        column["columnId"] = columnDetails.columnId;

        try {
          const {
            data: { success, errors },
          } = await editColumn(column);
          if (success) {
            setLoading(false);
            toast.success(formatMessage({ id: "Column edited successfully" }));
            if (selectedRoundId) {
              const {
                data: { success, data: allColumns },
              } = await getAllColumnsFromRoundId(selectedRoundId);
              if (success) {
                setGetAllColumns(allColumns);
                setShow(false);
              }
            }
          } else {
            setLoading(false);
            errors.forEach((error: string) => {
              toast.error(formatMessage({ id: error }));
            });
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      } else {
        column["roundId"] = parseInt(selectedRoundId);
        try {
          const {
            data: { success, errors },
          } = await addColumn(column);
          if (success) {
            setLoading(false);
            toast.success(formatMessage({ id: "Column added successfully" }));
            if (selectedRoundId) {
              const {
                data: { success, data: allColumns },
              } = await getAllColumnsFromRoundId(selectedRoundId);
              if (success) {
                setGetAllColumns(allColumns);
                setShow(false);
              }
            }
          } else {
            setLoading(false);
            errors.forEach((error: string) => {
              toast.error(formatMessage({ id: error }));
            });
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }
    },
    [
      columnDetails,
      color,
      selectedRoundId,
      setShow,
      setGetAllColumns,
      formatMessage,
    ]
  );

  const investorImg: string[] = [];
  activeRound?.allInvestors.forEach((investor: any) => {
    if (investor.file !== null) {
      investorImg.push(investor?.file?.name);
    }
  });

  const addRound = () => {
    setColumnsDetails({});
    setIsEditRound(false);
    setModalShow(true);
  };
  return (
    <>
      <div className="card col-12 p-3 py-3">
        <div className="w-100">
          {showAll && (
            <div className="d-md-flex col-md-12 w-100">
              <div className="d-flex flex-column justify-content-center col-md-3">
                <p className="mb-0">
                  {" "}
                  {formatMessage({ id: "Current Round" })}
                </p>
                <div>
                  <h3>{activeRound?.roundName}</h3>
                  <h4>
                    <span className="badge badge-secondary text-primary px-4 py-3">
                      {formatMessage({ id: "Ongoing" })}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="col-md-6 d-md-flex flex-md-column justify-content-center">
                <div className="col-12 mb-2 fs-5">
                  <span className="fw-bold ">
                    {activeRound?.currency?.symbol}
                    {convertValueToShortScale(activeRound?.amountAchieved)}{" "}
                    <span> </span> of {activeRound?.currency?.symbol}
                    {convertValueToShortScale(activeRound?.amountTargeted)}{" "}
                  </span>
                </div>
                <div className="col-12 d-flex">
                  <div className="col-6 h-6px progress  w-75">
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{
                        width: `${Math.ceil(
                          (activeRound?.amountAchieved /
                            parseInt(activeRound?.amountTargeted)) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="col-6 h-6px ps-2 w-25 d-flex">
                    <span className="ps-1">
                      <small>
                        {Math.ceil(
                          (activeRound?.amountAchieved /
                            parseInt(activeRound?.amountTargeted)) *
                            100
                        )}
                        %
                      </small>
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-start mt-2">
                  <div className=" mb-2 c-profile_list">
                    {investorImg.slice(0, 4).map((item: any) => (
                      <img
                        src={`${GET_FILE_URL}/${item}`}
                        className="c-profile"
                        alt="investor images"
                      />
                    ))}
                  </div>
                  {activeRound?.allInvestors.length > 0 &&
                    investorImg.length > 4 && (
                      <div className="align-items-lg-center d-flex mb-4 ps-3 pt-2">
                        +{activeRound?.allInvestors.length - 4} more
                      </div>
                    )}
                  {activeRound?.allInvestors.length > 0 &&
                    investorImg.length <= 4 &&
                    investorImg.length !== 0 && (
                      <div className="align-items-lg-center d-flex mb-4 ps-3 pt-2">
                        {activeRound?.allInvestors.length === investorImg.length
                          ? ``
                          : `+${
                              activeRound?.allInvestors.length -
                              investorImg.length
                            } more`}
                      </div>
                    )}
                  {activeRound?.allInvestors.length > 0 &&
                    investorImg.length === 0 && (
                      <div className="align-items-lg-center d-flex mb-4 ps-3 pt-2">
                        {activeRound?.allInvestors.length}
                      </div>
                    )}
                  {activeRound?.allInvestors.length === 0 &&
                    investorImg.length === 0 && (
                      <div className="align-items-lg-center d-flex mb-4 ps-3 pt-2">
                        -
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-2 d-flex d-md-flex justify-content-md-center align-items-center">
                <div>
                  <button
                    className=" border border-primary btn bg-body text-primary font-size-13 height-36 d-flex align-items-center"
                    onClick={addRound}
                  >
                    {formatMessage({ id: "Add New Round" })}
                  </button>{" "}
                </div>
              </div>
              <div className="menu-expand col-6 col-lg-1 col-md-1 col-xl-1 d-flex h-100 justify-content-end pe-md-4 col-md-1">
                <div className="d-flex flex-column justify-content-between align-items-start">
                  <div
                    className="align-self-center  pt-lg-0 pt-xl-0 pt-3 pt-md-0 cursor-pointer"
                    onClick={() => {
                      setShowAll(!showAll);
                    }}
                  >
                    <CiMinimize1 size="20px" className="pointer" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {!showAll && (
            <div className="col-md-12 d-md-flex align-items-center">
              <p className="mb-0 col-md-2">
                {" "}
                {formatMessage({ id: "Current Round" })}
              </p>
              <h4 className="  col-6 col-md-2 m-0">{activeRound?.roundName}</h4>
              <div className="col-md-5 d-flex align-items-center ">
                <div className="col-md-10 h-6px progress  w-90">
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{
                      width: `${Math.ceil(
                        (activeRound?.amountAchieved /
                          parseInt(activeRound?.amountTargeted)) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>

                <span className="ps-2">
                  <small>
                    {Math.ceil(
                      (activeRound?.amountAchieved /
                        parseInt(activeRound?.amountTargeted)) *
                        100
                    )}
                    %
                  </small>
                </span>
              </div>
              <div className=" col-12 col-md-2 d-flex justify-content-end">
                <button
                  className=" border border-primary btn  bg-body text-primary font-size-13 height-36 d-flex align-items-center"
                  onClick={addRound}
                >
                  {formatMessage({ id: "Add New Round" })}
                </button>
              </div>
              <div className="menu-expand col-6  col-md-1  d-flex justify-content-end h-100  pe-md-4">
                <div
                  className="align-self-center  pt-lg-0 pt-xl-0 pt-3 pt-md-0 cursor-pointer"
                  onClick={() => {
                    setShowAll(!showAll);
                  }}
                >
                  <CiMaximize1 size="20px" />
                </div>
              </div>
            </div>
          )}
        </div>

        <Modal show={show} onHide={() => setShow(false)}>
          <Formik
            initialValues={initialValues}
            validationSchema={columnNameSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => {
              initialValues.name = columnDetails?.columnName;
              return (
                <Form
                  className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                  id="kt_login_password_reset_form"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {columnDetails?.columnId
                        ? formatMessage({ id: "Edit Column" })
                        : formatMessage({ id: "Add New Column" })}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <TextInput
                      fieldType={"name"}
                      fieldName={"name"}
                      formik={formik}
                      placeholder={""}
                      label={formatMessage({ id: "Column Name" })}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.INVESTOR.COLUMNAME",
                      })}
                    />
                    <div>
                      <label className="form-label">
                        {formatMessage({ id: "Column Color" })}
                      </label>
                      <ToolTipUI
                        tooltipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INVESTOR.COLUMNCOLOR",
                        })}
                      />
                      <div className="col-5 color-input d-flex justify-content-around">
                        {colorArray &&
                          colorArray.map((item) => (
                            <button
                              key={item}
                              className="red border-0"
                              type="button"
                              style={{
                                backgroundColor: item,
                                height: "25px",
                                width: "25px",
                                borderRadius: "59px",
                              }}
                              onClick={() => {
                                setColor(item);
                                setColumnsDetails({
                                  ...columnDetails,
                                  color: item,
                                });
                              }}
                            >
                              {columnDetails?.color === item && (
                                <i className="fa-check fa-solid fs-5 my-0 py-1 text-white"></i>
                              )}
                            </button>
                          ))}
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                      {formatMessage({ id: "Cancel" })}
                    </Button>

                    <Button
                      variant="primary"
                      type="submit"
                      disabled={!formik.isValid || loading}
                    >
                      {!loading ? (
                        <>{formatMessage({ id: "Save" })}</>
                      ) : (
                        <span
                          className="indicator-progress"
                          style={{ display: "block" }}
                        >
                          Please wait...{" "}
                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                      )}
                    </Button>
                  </Modal.Footer>
                </Form>
              );
            }}
          </Formik>
        </Modal>
      </div>
    </>
  );
};
