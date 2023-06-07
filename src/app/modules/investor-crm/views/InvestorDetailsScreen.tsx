import { KanbanBoard } from "../components/KanbanBoard";
import { CurrentRound } from "../components/CurrentRound";
import { useIntl } from "react-intl";
import { KTSVG } from "../../../../_metronic/helpers";
import { useAuth } from "../../auth";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  deleteRoundById,
  exportAllInvestors,
  getActiveRound,
  getAllColumnsFromRoundId,
  getAllRounds,
  updateActiveRoundInCompany,
  updateColumnIndex,
} from "../core/_requests";
import "../styles/InvestorCrm.scss";
import { AddRoundModal } from "./AddRoundModal";
import { Dropdown, Modal } from "react-bootstrap";
import { AddNewActivityModal } from "./AddNewActivityModal";
import { AddInvestorModal } from "./AddInvestorModal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Toaster } from "../../widgets/components/General/Toaster";
import { Filter } from "../../widgets/components/General/Filter";
import { getAllInvestor } from "../../investor-database/core/_requests";
import { BasicButton } from "../../widgets/components/UI/BasicButton";
import { Spinner } from "../../widgets/components/General/Spinner";
export const InvestorDetailsScreen = () => {
  const { formatMessage } = useIntl();
  const { companyId } = useAuth();
  const [activeRound, setActiveRound] = useState<any>();
  const [allRounds, setAllRounds] = useState<any>();
  const [getAllColumns, setGetAllColumns] = useState<any>([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedRoundId, setSelectedRoundId] = useState<any>();
  const [show, setShow] = useState(false);
  const [activityModalShow, setActivityModalShow] = useState(false);
  const [columnDetails, setColumnDetails] = useState<any>();
  const [search, setSearch] = useState<string | undefined>();
  const [addInvestorModalShow, setAddInvestorModalShow] = useState(false);
  const [allInvestors, setAllInvestors] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [investorCrmFilter, setInvestorCrmFilter] = useState<boolean>(false);
  const [sort_by_investor, set_sort_by_investor] = useState<string | undefined>(
    undefined
  );
  const [sort_order_investor, set_sort_order_investor] = useState<
    string | undefined
  >(undefined);
  const [isEditRound, setIsEditRound] = useState(false);
  const getActiveRoundFromApi = async () => {
    try {
      if (companyId) {
        const {
          data: { success, data: apiActiveRound, errors },
        } = await getActiveRound(companyId);
        if (success) {
          setActiveRound(apiActiveRound);
          setSelectedRoundId(activeRound?.roundId);
        } else {
          // Show Add Round Modal
          setModalShow(true);
          errors.forEach((error: string) => {
            toast.error(formatMessage({ id: error }));
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getRoundsFromApi = async () => {
      try {
        if (companyId) {
          const {
            data: { success, data: apiRounds },
          } = await getAllRounds(companyId);
          if (success) {
            setAllRounds(apiRounds);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRoundsFromApi();
    getActiveRoundFromApi();
  }, [companyId, activeRound?.roundId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (allRounds && activeRound) {
      setSelectedRoundId(
        allRounds[
          allRounds?.findIndex(
            (round: any) => round?.roundId === activeRound?.roundId
          )
        ]?.roundId
      );
    }
  }, [activeRound?.roundId, allRounds, activeRound]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getColumnsFromRoundIdApi();
  }, [selectedRoundId, search, sort_by_investor, sort_order_investor]); // eslint-disable-line react-hooks/exhaustive-deps

  const getColumnsFromRoundIdApi = async () => {
    try {
      if (selectedRoundId) {
        const {
          data: { success, data: allColumns },
        } = await getAllColumnsFromRoundId(
          selectedRoundId,
          search,
          sort_by_investor,
          sort_order_investor
        );
        if (success) {
          setGetAllColumns(allColumns);
        }
      }
    } catch (error) {
      setGetAllColumns([]);
      console.log(error);
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
        } = await getAllInvestor("", "", "", "", companyId);
        if (success) {
          setAllInvestors(allApiInvestors);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getInvestors();
  }, [companyId]);

  useEffect(() => {
    setSelectedRoundId(
      allRounds?.[
        allRounds?.findIndex(
          (round: any) => round.roundId === activeRound?.roundId
        )
      ]?.roundId
    );
  }, [activeRound?.roundId, allRounds]);

  const onExportInvestors = async () => {
    if (selectedRoundId) {
      const {
        data: { data: values, success, errors },
      } = await exportAllInvestors({ roundId: selectedRoundId });
      if (success) {
        toast.success(formatMessage({ id: "Downloading all investors" }));
        const url = window.URL.createObjectURL(new Blob([values]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "investors.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(getAllColumns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setGetAllColumns(items);

    handleUpdateIndex(
      items.map((col: any, index: number) => {
        return { columnId: col.columnId, index };
      })
    );
  };

  const handleUpdateIndex = async (columns: any[]) => {
    try {
      const {
        data: { success },
      } = await updateColumnIndex(columns, selectedRoundId);

      if (success) {
        getColumnsFromRoundIdApi();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeRound = async (round: number) => {
    try {
      if (companyId && round) {
        const {
          data: { success },
        } = await updateActiveRoundInCompany({ companyId, activeRound: round });

        if (success) {
          getActiveRoundFromApi();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addRoundcolumn = async () => {
    setShow(true);
    setColumnDetails({
      name: "",
      color: "",
    });
  };

  const DeleteRound = async () => {
    try {
      setDeleteLoading(true);
      const {
        data: { success, errors },
      } = await deleteRoundById(activeRound.roundId);
      if (success) {
        toast.success(formatMessage({ id: "Round Deleted" }));
        getActiveRoundFromApi();
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
  const editRound = () => {
    setModalShow(!modalShow);
    setIsEditRound(true);
  };
  return (
    <>
      <Toaster />
      <Filter
        investorCrmFilter={investorCrmFilter}
        setInvestorCrmFilter={setInvestorCrmFilter}
        set_sort_by_investor={set_sort_by_investor}
        set_sort_order_investor={set_sort_order_investor}
      />
      <div className="investor-screen px-5 py-0 h-100">
        <div className="d-flex justify-content-between px-2">
          <div>
            <h4 className="mb-4"> {formatMessage({ id: "Investor CRM" })}</h4>
            <p className="align-items-center d-flex font-size-12 text-primary">
              <Link to="/">{formatMessage({ id: "Home" })}</Link>
              <span className="h-1px bullet mx-2"></span>
              <span className="text-muted font-size-12">
                {" "}
                {formatMessage({ id: "Investor CRM" })}
              </span>
            </p>
          </div>
          <div>
            <button
              className=" border border-primary btn btn-primary height-36 d-flex align-items-center font-size-13"
              onClick={() => setAddInvestorModalShow(true)}
            >
              {formatMessage({ id: "Add Investor" })}
            </button>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            {activeRound && (
              <CurrentRound
                activeRound={activeRound}
                setModalShow={setModalShow}
                show={show}
                setShow={setShow}
                selectedRoundId={selectedRoundId}
                setGetAllColumns={setGetAllColumns}
                columnDetails={columnDetails}
                setColumnsDetails={setColumnDetails}
                setIsEditRound={setIsEditRound}
              />
            )}

            {activeRound && (
              <div className="col-12 row d-flex  pt-3 ms-0 mt-2">
                <div className="align-self-center col-lg-5 col-md-5 col-xl-5 col-12 d-flex ps-0">
                  <div className="w-50">
                    <select
                      name=""
                      id=""
                      className=" form-select form-select-lg mb-3 h-36px d-flex align-items-center font-weight-400 font-size-12 cursor-pointer"
                      onChange={(e) =>
                        handleOnChangeRound(parseInt(e.target.value))
                      }
                      value={selectedRoundId}
                    >
                      {allRounds &&
                        activeRound &&
                        allRounds?.map(({ roundId, roundName }: any) => (
                          <option value={roundId} key={roundId}>
                            {roundName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-7 col-md-7 col-xl-7 col-12  d-flex justify-content-end mb-3 pe-0">
                  <div className="h-36px border bg-white d-flex align-items-center rounded">
                    <button
                      className="text-clr88 btn btn-sm btn-flex fw-semibold font-size-12"
                      id="fc-toogle"
                      title="Sort and Filter"
                      data-bs-toggle="tooltip"
                      data-bs-placement="left"
                      data-bs-dismiss="click"
                      data-bs-trigger="hover"
                      onClick={() => setInvestorCrmFilter(true)}
                    >
                      <KTSVG
                        path="/media/icons/duotune/general/gen031.svg"
                        className="svg-icon-6 svg-icon-muted me-1"
                      />
                      {formatMessage({ id: "Filter" })}
                    </button>
                  </div>
                  <div>
                    <form
                      data-kt-search-element="form"
                      className=" align-items-center d-flex  ms-2 position-relative ps-4"
                      autoComplete="off"
                    >
                      <KTSVG
                        path="/media/icons/duotune/general/gen021.svg"
                        className="svg-icon-3 position-absolute ms-3"
                      />
                      <input
                        type="text"
                        className="bg-body form-control form-control-flush ps-10 h-36px rounded font-weight-400 text-clrA1"
                        name="search"
                        placeholder={formatMessage({ id: "Search..." })}
                        data-kt-search-element="input"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </form>
                  </div>
                  <div className="align-items-center bg-body d-flex justify-content-center  mx-2 w-40px h-36px rounded">
                    <i className="fa-cloud-arrow-up fa-sharp fa-solid fs-2"></i>
                  </div>
                  <div className=' align-items-center d-flex dropdown-width h-36px rounded"'>
                    <Dropdown className="dropdown-container">
                      <Dropdown.Toggle className="bi bi-three-dots-vertical p-1 h-40px w-40px"></Dropdown.Toggle>
                      <Dropdown.Menu className="m-2">
                        <Dropdown.Item className="text-dark">
                          <p className="mb-0">
                            {formatMessage({ id: "Import CSV" })}
                          </p>
                        </Dropdown.Item>

                        <Dropdown.Item
                          className="text-dark"
                          onClick={onExportInvestors}
                        >
                          <p className="mb-0">
                            {formatMessage({ id: "Export to csv" })}
                          </p>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-dark"
                          onClick={() => setAddModal(!addModal)}
                        >
                          <p className="mb-0">
                            {formatMessage({ id: "Rearrange Columns" })}
                          </p>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-dark"
                          onClick={addRoundcolumn}
                        >
                          <p className="mb-0">
                            {formatMessage({ id: "Add new Column" })}
                          </p>
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setDeleteShowModal(!showDeleteModal)}
                        >
                          {formatMessage({ id: "Delete Round" })}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={editRound}>
                          {formatMessage({ id: "Edit Round" })}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <div>
                      <Modal
                        show={addModal}
                        onHide={() => setAddModal(!addModal)}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton>
                          <h2> {formatMessage({ id: "Rearrange Columns" })}</h2>
                        </Modal.Header>
                        <Modal.Body>
                          <ul>
                            {
                              <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="columns">
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                    >
                                      {getAllColumns.map(
                                        (column: any, index: number) => (
                                          <Draggable
                                            key={column.columnId}
                                            draggableId={column.columnId.toString()}
                                            index={index}
                                          >
                                            {(provided) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="d-flex gap-4 drag-drop-box mb-4"
                                              >
                                                <div>
                                                  <img
                                                    src={
                                                      "/media/icons/investor/hamburger.svg"
                                                    }
                                                    alt=""
                                                  />
                                                </div>
                                                <div>
                                                  <h4>{column.columnName}</h4>
                                                </div>
                                              </div>
                                            )}
                                          </Draggable>
                                        )
                                      )}
                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>
                              </DragDropContext>
                            }
                          </ul>
                        </Modal.Body>
                      </Modal>
                      <Modal
                        show={showDeleteModal}
                        onHide={() => setDeleteShowModal(false)}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton>
                          <h2>{formatMessage({ id: "Delete Round" })}</h2>
                        </Modal.Header>
                        <Modal.Body>
                          <p>
                            {formatMessage({
                              id: "Please note that the delete round is a permanent action and cannot be undone. As a result,you will no longer have the round. Are you certain you wish to proceed with this",
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
                              DeleteRound();
                            }}
                            buttonText="Confirm Delete"
                            minWidth={56}
                            loading={deleteLoading}
                            disabled={deleteLoading}
                          />
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="row col-12 flex-nowrap ms-0">
              <KanbanBoard
                allColumns={getAllColumns}
                selectedRoundId={selectedRoundId}
                show={show}
                setShow={setShow}
                setColumnDetails={setColumnDetails}
                setGetAllColumns={setGetAllColumns}
                setAddInvestorModalShow={setAddInvestorModalShow}
                getActiveRoundFromApi={getActiveRoundFromApi}
              />
            </div>
            <AddNewActivityModal
              modalShow={activityModalShow}
              setModalShow={setActivityModalShow}
            />
            <AddRoundModal
              modalShow={modalShow}
              setModalShow={setModalShow}
              currency={activeRound?.currency}
              setActiveRound={setActiveRound}
              setSelectedRoundId={setSelectedRoundId}
              activeRound={activeRound}
              setAllRounds={setAllRounds}
              isEditRound={isEditRound}
            />
            <AddInvestorModal
              addInvestorModalShow={addInvestorModalShow}
              setAddInvestorModalShow={setAddInvestorModalShow}
              allRounds={allRounds}
              allInvestors={allInvestors}
              activeRound={selectedRoundId}
              setGetAllColumns={setGetAllColumns}
              columnDetails={columnDetails}
              refreshActiveRound={getActiveRoundFromApi}
            />
          </div>
        )}
      </div>
    </>
  );
};
