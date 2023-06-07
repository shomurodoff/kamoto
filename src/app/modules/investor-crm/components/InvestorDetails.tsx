import cross from "../../../../_metronic/assets/images/svg/investor-crm/crossIcon.svg";
import tick from "../../../../_metronic/assets/images/svg/investor-crm/tickIcon.svg";
import { InvestmentConfirmationModal } from "../views/InvestmentConfirmationModal";
import { useEffect, useState } from "react";
import { InvestmentRejectionmModal } from "../views/InvestmentRejectionModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  deleteInvestorColumn,
  getRoundById,
  updateColumnFromApi,
} from "../core/_requests";
import { DisplayImage } from "../../widgets/components/General/DisplayImage";
import { BasicButton } from "../../widgets/components/UI/BasicButton";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
// import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import ModifyFieldModal from "../views/ModifyFieldModal";
import { DropdownType } from "../../../core/_models";
import { currencies } from "../../onboarding/core/_requests";
import { Dropdown, Modal } from "react-bootstrap";
import { AllInvestorUser } from "../../investor-database/core/_requests";
import { Spinner } from "../../widgets/components/General/Spinner";
import { useShortScale } from "../../../hooks/useShortScale";
export const InvestorDetails = ({
  investor,
  investorId,
  getInvestor,
}: {
  investorId: string | undefined;
  investor: any;
  getInvestor: () => void;
}) => {
  const { formatMessage } = useIntl();
  const { state } = useLocation() as any;
  const [modalShow, setModalShow] = useState(false);
  const [modalRejectShow, setModalRejectShow] = useState(false);
  const [transaction, setTransaction] = useState<any>();
  const [round, setRound] = useState<any>();
  const navigate = useNavigate();
  const [modifyFieldModal, setModifyFieldModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<any>();
  const [partialStatus, setPartialStatus] = useState<any>();
  const [currencyOptions, setCurrencyOptions] = useState<any>();
  const [status, setStatus] = useState(false);
  const [customFieldData, setCustomFieldData] = useState<any>();
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentColumnStatus, setCurrentColumnStatus] = useState("");
  const [allInvestorUser, setAllInvestorUser] = useState<any>([]);

  const [investorColumnObject, setInvestorColumnObject] = useState({
    investorId: 0,
    columnId: 0,
  });
  const [loading, setLoading] = useState(true);
  const { convertValueToShortScale } = useShortScale();

  useEffect(() => {
    if (round && currentStatus) setLoading(false);
  }, [round, currentStatus]);

  useEffect(() => {
    if (investor) {
      const find = investor?.columns.find(
        (column: any) => column.columnId === state?.columnId
      );
      if (find) {
        setCurrentStatus(find.columnId);
        setCurrentColumnStatus(find.status);
      } else {
        let columnId;
        for (let i = 0; i < state?.columns.length; i++) {
          const find: any = investor?.columns.find(
            (col: any) => col.columnId === state?.columns[i].columnId
          );
          if (find) {
            columnId = find.columnId;
            setCurrentColumnStatus(find.status);
            break;
          }
        }
        setCurrentStatus(columnId);
      }
    }
  }, [investor]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getRoundFromId = async () => {
      try {
        if (state.roundId) {
          const {
            data: { success, data },
          } = await getRoundById(state.roundId);

          if (success) {
            setRound(data);
            getCurrencies();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRoundFromId();
  }, [state?.roundId]);

  //calculating transaction
  const calculateTransaction = () => {
    const amount_commited = investor?.transactions?.filter((trans: any) => {
      return trans.roundId === state?.roundId;
    });
    if (amount_commited?.length > 0) {
      setTransaction(amount_commited[0]?.amount);
    } else {
      setTransaction(null);
    }
  };

  useEffect(() => {
    calculateTransaction();
  }, [investor?.transactions, transaction]); // eslint-disable-line react-hooks/exhaustive-deps

  //updating column for the investor
  const handleChange = async (event: any) => {
    setPartialStatus(event.target.value);
    const status =
      state.columns[
        state.columns.findIndex(
          (column: any) => column.columnId === +event.target.value
        )
      ].status;

    if (+status === 1) {
      setModalShow(true);
      return;
    }
    if (+status === 0) {
      setModalRejectShow(true);
      return;
    }
    const {
      data: { success },
    } = await updateColumnFromApi({
      investorId: parseInt(investorId!),
      roundId: +state.roundId,
      isFavourite: investor?.columns[0].investor_column.isFavourite,
      columnId: +event.target.value,
    });
    if (success) {
      setCurrentStatus(event.target.value);
      getInvestor();
      toast.success(formatMessage({ id: "Column Updated Successfully" }));
    }
  };
  const getCurrencies = async () => {
    let currencyData: DropdownType[] = [];
    try {
      const {
        data: { data: currency, success },
      } = await currencies();
      if (success) {
        currencyData = currency.map((curr: any) => {
          return {
            id: curr.currencyId,
            name: `${curr.code} (${curr.symbol}) - ${curr.currency}`,
            value: curr.currencyId,
          };
        });
        setCurrencyOptions([...currencyData]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteInvestorFromColumn = async (investorColumnObject: any) => {
    try {
      setDeleteLoading(true);
      const {
        data: { success, errors },
      } = await deleteInvestorColumn(investorColumnObject);
      if (success) {
        toast.success(formatMessage({ id: "Investor deleted from CRM" }));
        navigate("/investor-crm");
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
      setDeleteShowModal(!showDeleteModal);
    }
  };

  const getAllInvestorUser = async () => {
    try {
      const {
        data: { data, success, errors },
      } = await AllInvestorUser(Number(investorId));
      if (success) {
        setAllInvestorUser(data);
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllInvestorUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {loading ? <Spinner /> : null}
      <div className="d-sm-flex justify-content-between p-2">
        <div>
          <h4>{investor?.name}</h4>
          <p className="align-items-center d-flex font-size-12 text-primary">
            <Link to="/">{formatMessage({ id: "Home" })}</Link>
            <span className="h-1px bullet mx-2"></span>
            <Link to="/investor-crm">
              {formatMessage({ id: "Investor CRM" })}
            </Link>
            <span className="h-1px bullet mx-2"></span>
            <span className="text-muted font-size-12">
              {" "}
              {formatMessage({ id: "Investor" })}
            </span>
          </p>
        </div>
        <div className="d-flex gap-2">
          <div className="d-flex justify-content-between">
            <BasicButton
              buttonText={formatMessage({ id: "View Details" })}
              height="36px"
              border="none"
              color="#4776E6"
              textColor="#FFFFFF"
              padding="8px 24px"
              minWidth={127}
              onClick={() => {
                navigate(
                  `/investor-database/individual-investor/${investor.investorId}`
                );
              }}
            />
            <Dropdown className="dropdown-container ">
              <Dropdown.Toggle className="bi bi-three-dots-vertical  py-3 px-3 ms-2  "></Dropdown.Toggle>
              <Dropdown.Menu className="m-2">
                <Dropdown.Item
                  className="text-dark"
                  onClick={() => {
                    setDeleteShowModal(!showDeleteModal);
                    setInvestorColumnObject({
                      investorId: investor.investorId,
                      columnId: currentStatus,
                    });
                  }}
                >
                  <p className="mb-0">
                    {formatMessage({ id: "Remove Investor" })}
                  </p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="h-36px">
            {/* <button className='btn btn-bg-white h-36px p-0 px-5 py-2'>
              <img src={toAbsoluteUrl('/media/icons/investor/threeDots.svg')} alt='' />
            </button> */}
          </div>
        </div>
      </div>
      <div className="d-md-flex row">
        <div className="d-flex col-md-5">
          <div className="d-flex flex-wrap flex-sm-nowrap mb-3 pt-5">
            <div className="symbol symbol-100px symbol-lg-140px symbol-fixed position-relative">
              <DisplayImage
                imgName={investor?.file?.name}
                height={100}
                width={100}
                fit="fill"
                alt={investor?.name}
              />
            </div>
          </div>
          <div className="p-4 w-75">
            <h4>{investor?.name}</h4>
            <p className="description">{investor?.description}</p>
            <p
              className="text-primary cursor-pointer"
              onClick={() => {
                navigate(
                  `/investor-database/individual-investor/${investor?.investorId}`
                );
              }}
            >
              {formatMessage({ id: "View Details" })}
            </p>
          </div>
        </div>

        <div className="align-self-center col-lg-7 col-md-7 col-xl-7 d-md-flex justify-content-start gap-md-2 gap-xl-6">
          <div className="mt-5 mt-md-0 flex-grow-1">
            <label className="font-size-13 text-dark text-capitalize">
              {formatMessage({ id: "Select Round" })}
            </label>
            <select
              disabled
              id={state.roundId}
              className="form-select form-select-lg font-size-13 h-md-40px"
              placeholder="select Round"
            >
              <option value={state.roundId}>{round?.roundName}</option>
            </select>
          </div>
          <div className="mt-5 mt-md-0 flex-grow-1">
            <label className="font-size-13 text-dark text-capitalize">
              {formatMessage({ id: "Select Status" })}
            </label>
            <select
              className="form-select form-select-lg font-size-13 h-md-40px"
              onChange={handleChange}
              value={currentStatus}
            >
              {state.columns.map((column: any) => (
                <option value={column.columnId} key={column.columnId}>
                  {column?.columnName}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5 mt-md-0">
            <label>{formatMessage({ id: "Investor's Reply" })}</label>
            <div className="d-flex gap-4 gap-md-2 gap-xl-6">
              <button
                className={`btn btn-bg-white d-flex flex-grow-1 h-md-40px justify-content-md-center align-items-center font-size-13 border ${
                  currentColumnStatus === "1" ? "bg-success text-white" : ""
                }`}
                onClick={() => setModalShow(true)}
              >
                <img src={tick} alt="tick icon" className="me-3" />
                <p className="m-0"> {formatMessage({ id: "Yes" })}</p>
              </button>
              <button
                className={`btn btn-bg-white d-flex flex-grow-1 h-md-40px justify-content-md-center align-items-center font-size-13 ${
                  currentColumnStatus === "0" ? "bg-danger text-white" : ""
                }`}
                onClick={() => setModalRejectShow(true)}
              >
                <img src={cross} alt="cross icon" className="me-3" />
                <p className="m-0"> {formatMessage({ id: "No" })}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex p-4 mt-5 mt-md-10 amount-container">
        <div className="d-flex col justify-content-between">
          <div
            className={`col-8 d-flex align-items-center ${
              !transaction && "d-none"
            }`}
          >
            <div
              className="h-8px w-100 rounded"
              style={{ backgroundColor: "#a1a5b7" }}
            >
              <div
                className="rounded h-8px"
                role="progressbar"
                style={{
                  width: `${Math.min(
                    Math.ceil(
                      (transaction / parseInt(round?.amountTargeted)) * 100
                    ),
                    100
                  )}%`,
                  backgroundColor: "#4776E6",
                }}
              ></div>
            </div>

            <span className="ps-2">
              <small>
                {Math.ceil(
                  (transaction / parseInt(round?.amountTargeted)) * 100
                )}
                %
              </small>
            </span>
          </div>
          <div className="col-2">
            <p>{formatMessage({ id: "Amount Commited" })}</p>
            {transaction ? (
              <div className="d-flex gap-1">
                <p className="fw-bold">
                  {investor?.currency?.symbol
                    ? investor?.currency?.symbol
                    : "$"}
                </p>
                <p className="fw-bold">
                  {convertValueToShortScale(transaction)}
                </p>
              </div>
            ) : (
              "NA"
            )}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between  p-4 mt-1 mt-md-1 amount-container">
        <div className="d-flex w-25  justify-content-between">
          {customFieldData
            ? customFieldData.slice(0, 2).map((data: any, index: number) => {
                return (
                  <div className="d-flex flex-column" key={index}>
                    <p>{data.field}</p>
                    <p className="fw-bold">{data.value}</p>
                  </div>
                );
              })
            : ""}
        </div>
        <div>
          <button
            className="edit-container btn m-2"
            onClick={() => {
              setStatus(false);
              setModifyFieldModal(true);
            }}
          >
            {formatMessage({ id: "Modify Custom Fields" })}
          </button>
        </div>
      </div>

      <InvestmentConfirmationModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        currency={round?.currencyId}
        roundId={state.roundId}
        roundName={round?.roundName}
        investorId={investor?.investorId}
        currencyOptions={currencyOptions}
        getInvestor={getInvestor}
        setCurrentStatus={setCurrentStatus}
        partialStatus={partialStatus}
      />
      <InvestmentRejectionmModal
        modalRejectShow={modalRejectShow}
        setModalRejectShow={setModalRejectShow}
        roundId={state?.roundId}
        investorId={investor?.investorId}
        investorUsers={allInvestorUser}
        getInvestor={getInvestor}
        setCurrentStatus={setCurrentStatus}
        partialStatus={partialStatus}
      />
      <ModifyFieldModal
        setModifyFieldModal={setModifyFieldModal}
        modifyFieldModal={modifyFieldModal}
        investorId={investorId}
        state={state}
        status={status}
        setStatus={setStatus}
        setCustomFieldData={setCustomFieldData}
      />
      <Modal
        show={showDeleteModal}
        onHide={() => setDeleteShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>{formatMessage({ id: "Delete" })}</h2>
        </Modal.Header>
        <Modal.Body>
          <p>
            {formatMessage({
              id: "Please note that the delete investor from column is a permanent action and cannot be undone. As a result,you will no longer have the investor in this column. Are you certain you wish to proceed with this",
            })}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <BasicButton
            height="44px"
            border="none"
            color="#F5F8FA"
            textColor="#7E8299"
            padding="12px 16px"
            onClick={() => {
              setDeleteShowModal(!showDeleteModal);
            }}
            buttonText="Cancel"
            minWidth={56}
          />

          <BasicButton
            height="44px"
            border="1px solid #4776E6"
            color="#4776E6"
            textColor="white"
            padding="12px 24px"
            onClick={() => {
              deleteInvestorFromColumn(investorColumnObject);
            }}
            buttonText="Confirm Delete"
            minWidth={56}
            loading={deleteLoading}
            disabled={deleteLoading}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
