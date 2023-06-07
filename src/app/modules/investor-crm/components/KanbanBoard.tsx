import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/InvestorCrm.scss";
import { Dropdown, Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { DisplayImage } from "../../widgets/components/General/DisplayImage";
import {
  deleteColumn,
  deleteInvestorColumn,
  getAllColumnsFromRoundId,
  getAllInvestorUsers,
  getRoundById,
  updateColumnFromApi,
} from "../core/_requests";
import { toast } from "react-toastify";
import { useDateFormat } from "../../../hooks/useDateFormat";
import { DateTime } from "luxon";
import { useThemeMode } from "../../../../_metronic/partials";
import { BasicButton } from "../../widgets/components/UI/BasicButton";
import { InvestmentConfirmationModal } from "../views/InvestmentConfirmationModal";
import { InvestmentRejectionmModal } from "../views/InvestmentRejectionModal";
import { currencies } from "../../onboarding/core/_requests";
import { DropdownType } from "../../../core/_models";
import { useShortScale } from "../../../hooks/useShortScale";

export const KanbanBoard = ({
  allColumns,
  selectedRoundId,
  setShow,
  setColumnDetails,
  setGetAllColumns,
  setAddInvestorModalShow,
  getActiveRoundFromApi,
}: any) => {
  const { mode } = useThemeMode();
  const [modalShow, setModalShow] = useState(false);
  const [modalRejectShow, setModalRejectShow] = useState(false);
  const [columns, setColumns] = useState(allColumns);
  const [updateColumnEntries, setUpdateColumnEntries] = useState<any>();
  const { formatMessage } = useIntl();
  const [toggle, setToggle] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringForColumn, setIsHoveringForColumn] = useState(false);
  const [columnIndex, setColumnIndex] = useState(0);
  const { getDateValue } = useDateFormat();
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currencyOptions, setCurrencyOptions] = useState<any>();
  const [round, setRound] = useState<any>();
  const [investorUser, setInvestorUser] = useState<any>();
  const [refreshRound, setRefreshRound] = useState<boolean>(false);
  const [investorColumnObject, setInvestorColumnObject] = useState({
    investorId: 0,
    columnId: 0,
  });
  const { convertValueToShortScale } = useShortScale();

  const onDragEnd = (result: any, columns: any) => {
    if (!result.destination) {
      return;
    }
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const investorIndex = source.index;

      //sourceColumn is investor, that we are dragging from source to destination
      const sourceColumn =
        columns[findColumnIndex(parseInt(source.droppableId))].investors[
          investorIndex
        ];

      //Adding investor from destination column
      if (
        columns[findColumnIndex(parseInt(destination.droppableId))].investors
          .length === 0
      ) {
        columns[
          findColumnIndex(parseInt(destination.droppableId))
        ].investors.push(sourceColumn);
      } else {
        columns[
          findColumnIndex(parseInt(destination.droppableId))
        ].investors.splice(destination.index, 0, sourceColumn);
      }

      //remove investor from source column
      if (
        columns[findColumnIndex(parseInt(source.droppableId))].investors
          .length === 0
      ) {
        columns[findColumnIndex(parseInt(source.droppableId))].investors = [];
      } else {
        columns[findColumnIndex(parseInt(source.droppableId))].investors.splice(
          investorIndex,
          1
        );
      }

      // Setting up : Do we need to refresh active round or not
      const sourceColumnData = columns.find(
        ({ columnId }: { columnId: number }) => columnId === +source.droppableId
      );
      const destinationColumnData = columns.find(
        ({ columnId }: { columnId: number }) =>
          columnId === +destination.droppableId
      );
      if (
        sourceColumnData.status === "1" &&
        destinationColumnData.status !== "1"
      ) {
        setRefreshRound(true);
      }
      //end Setting Up

      //updating the state
      setUpdateColumnEntries({
        columnId: parseInt(destination.droppableId),
        investorId: parseInt(draggableId),
        isFavourite:
          columns[findColumnIndex(parseInt(destination.droppableId))].investors[
            destination.index
          ].investor_column.isFavourite,
        roundId: parseInt(selectedRoundId),
      });
    }

    function findColumnIndex(id: number) {
      return columns.findIndex(
        ({ columnId }: { columnId: number }) => columnId === id
      );
    }
  };

  //Getting round using selectedRoundId
  useEffect(() => {
    const getRoundFromId = async () => {
      try {
        if (selectedRoundId) {
          const {
            data: { success, data },
          } = await getRoundById(selectedRoundId);

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
  }, [selectedRoundId]);

  //getting all the currencies
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

  //getting all the investorUsers for the investor
  useEffect(() => {
    const getInvestorUsers = async () => {
      const {
        data: { data: investorUsers, success },
      } = await getAllInvestorUsers(updateColumnEntries?.investorId);
      if (success) {
        setInvestorUser(investorUsers);
      }
    };
    if (updateColumnEntries?.investorId) {
      getInvestorUsers();
    }
  }, [updateColumnEntries?.investorId]);

  //Update column API is getting called
  useEffect(() => {
    const updateColumn = async () => {
      const findAffirmative = columns.find(
        (column: { status: string }) => column.status === "1"
      );
      const findNegative = columns.find(
        (column: { status: string }) => column.status === "0"
      );

      try {
        if (updateColumnEntries) {
          if (findAffirmative.columnId === updateColumnEntries.columnId) {
            setModalShow(true);
          } else if (findNegative.columnId === updateColumnEntries.columnId) {
            setModalRejectShow(true);
          } else {
            const {
              data: { success, errors },
            } = await updateColumnFromApi(updateColumnEntries);
            if (success) {
              if (selectedRoundId) {
                const {
                  data: { success, data: allColumns },
                } = await getAllColumnsFromRoundId(selectedRoundId);
                if (success) {
                  setColumns(allColumns);
                  if (refreshRound) {
                    setRefreshRound(false);
                    getActiveRoundFromApi();
                  }
                }
              }
            } else {
              setRefreshRound(false);
              errors.forEach((error: string) => {
                toast.error(formatMessage({ id: error }));
              });
            }
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (
          (findAffirmative?.columnId === updateColumnEntries?.columnId ||
            findNegative?.columnId === updateColumnEntries?.columnId) &&
          selectedRoundId
        ) {
          const {
            data: { success, data: allColumns },
          } = await getAllColumnsFromRoundId(selectedRoundId);
          if (success) {
            setColumns(allColumns);
          }
        }
      }
    };
    updateColumn();
  }, [updateColumnEntries, selectedRoundId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setColumns(allColumns);
  }, [allColumns]);

  //ontoggle will work when user clicks on isFaviourte icon
  const onToggle = async (
    columnId: number,
    investorId: number,
    isFavourite: boolean
  ) => {
    const updatingIsFavourite = {
      columnId,
      investorId,
      isFavourite,
      roundId: parseInt(selectedRoundId),
    };
    try {
      if (updatingIsFavourite) {
        const {
          data: { success, errors },
        } = await updateColumnFromApi(updatingIsFavourite);
        if (success) {
          if (selectedRoundId) {
            const {
              data: { success, data: allColumns },
            } = await getAllColumnsFromRoundId(selectedRoundId);
            if (success) {
              setColumns(allColumns);
            }
          }
        } else {
          errors.forEach((error: string) => {
            toast.error(formatMessage({ id: error }));
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setToggle(!toggle);
    }
  };

  const handleDeleteColumn = async (columnId: number) => {
    try {
      const {
        data: { success, errors },
      } = await deleteColumn(columnId);
      if (success) {
        toast.success(formatMessage({ id: "Column deleted successfully" }));
        if (selectedRoundId) {
          const {
            data: { success, data: allColumns },
          } = await getAllColumnsFromRoundId(selectedRoundId);
          if (success) {
            setGetAllColumns(allColumns);
          }
        }
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  const handleAddInvestorModal = (e: boolean, column: any) => {
    setAddInvestorModalShow(e);
    setColumnDetails(column || null);
  };

  const getInvestorProgress = useCallback(
    (investor: any, round: any): number | null => {
      if (!round?.amountTargeted) {
        return null;
      }

      const investorTransactionsForRound = round?.transactions?.filter(
        (txn: any) => txn.investorId === investor?.investorId
      );

      if (!investorTransactionsForRound) {
        return null;
      }

      const sum = investorTransactionsForRound.reduce(
        (count: number, txn: any) => parseFloat(txn?.amount ?? 0) + count,
        0
      );

      return Math.ceil((sum / round.amountTargeted) * 100);
    },
    []
  );

  const deleteInvestorFromColumn = async (investorColumnObject: any) => {
    try {
      setDeleteLoading(true);
      const {
        data: { success, errors },
      } = await deleteInvestorColumn(investorColumnObject);
      if (success) {
        toast.success(formatMessage({ id: "Investor deleted from CRM" }));
        if (selectedRoundId) {
          const {
            data: { success, data: allColumns },
          } = await getAllColumnsFromRoundId(selectedRoundId);
          if (success) {
            setGetAllColumns(allColumns);
          }
        }
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
  return (
    <>
      <div className="flex-nowrap row overflow-scroll mt-n6">
        {allColumns && (
          <DragDropContext
            onDragEnd={(result: any) => onDragEnd(result, columns)}
          >
            {columns?.map((column: any, index: number) => {
              return (
                <div
                  className="col-lg-4 col-xl-4 col-md-4 col-12 kanbanboard-width px-1"
                  key={column.columnId}
                  onMouseEnter={() => {
                    setIsHoveringForColumn(true);
                    setColumnIndex(index);
                  }}
                  onMouseLeave={() => setIsHoveringForColumn(false)}
                >
                  <div
                    className="fix-item d-flex justify-content-between px-2 p-0 m-0 z-index-2"
                    onMouseEnter={() => {
                      setIsHovering(true);
                    }}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <h4
                      className="align-self-xl-center m-1 opacity-100 font-size-15 ps-3"
                      style={{ color: column.color }}
                    >
                      {column.columnName}
                    </h4>
                    {column.status === "0" || column.status === "1" ? (
                      <div className=""></div>
                    ) : (
                      isHovering &&
                      index === columnIndex && (
                        <Dropdown className="dropdown-container">
                          <Dropdown.Toggle
                            className="bi bi-three-dots-vertical btn p-1 dropdown-toggle w-25px h-25px"
                            style={{ color: column.color }}
                          ></Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <p
                                className="mb-0"
                                onClick={() => {
                                  setColumnDetails({
                                    columnId: column.columnId,
                                    columnName: column.columnName,
                                    color: column.color,
                                  });
                                  setShow(true);
                                }}
                              >
                                {formatMessage({ id: "Edit Column" })}
                              </p>
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleDeleteColumn(column.columnId)
                              }
                            >
                              {formatMessage({ id: "Delete Column" })}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )
                    )}
                  </div>

                  <div
                    className="d-flex justify-content-between mb-0 p-3 py-4 rounded-top text-start w-100 opacity-25 h-50px"
                    style={{ backgroundColor: column.color }}
                  ></div>
                  <div className="investor-column-body column-scroll">
                    <Droppable
                      droppableId={column.columnId.toString()}
                      key={column.columnId}
                    >
                      {(provided: any, snapshot: any) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? ""
                                : "white",
                              minHeight: 500,
                              border: `${
                                mode === "dark"
                                  ? "1px solid var(--kt-input-border-color)"
                                  : "1px solid white"
                              }`,
                            }}
                            className="w-100 p-2 pb-0 bg-transparent"
                          >
                            {column.investors?.map(
                              (investor: any, index: number) => {
                                return (
                                  <Draggable
                                    key={investor?.investorId}
                                    draggableId={investor?.investorId.toString()}
                                    index={index}
                                  >
                                    {(provided: any, snapshot: any) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: "none",
                                            padding: 1,
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            backgroundColor: snapshot.isDragging
                                              ? "white"
                                              : "",
                                            borderColor: snapshot.isDragging
                                              ? "pink"
                                              : "",
                                            color: "white",
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          <div
                                            className="accordion accordion-flush"
                                            id="accordionFlushExample"
                                          >
                                            <div className="investor-crm-accordion-item bg-white">
                                              <div className="accordion-item">
                                                <h2
                                                  className="accordion-header"
                                                  id="flush-headingOne"
                                                >
                                                  <div className="d-flex justify-content-between gap-1">
                                                    <div className="collapsed d-flex gap-2 pe-2 w-100 align-items-center">
                                                      <div className="bg-transparent investor-card p-2 pe-0">
                                                        <DisplayImage
                                                          imgName={
                                                            investor?.file?.name
                                                          }
                                                          height={28}
                                                          width={28}
                                                          alt={investor.name}
                                                          fit="contain"
                                                          className="show_square"
                                                        />
                                                      </div>
                                                      <h4
                                                        className="d-flex pe-2 mb-0 font-size-12 text-break"
                                                        onClick={() =>
                                                          navigate(
                                                            `/investor-crm/investor/${investor?.investorId}`,
                                                            {
                                                              state: {
                                                                roundId:
                                                                  selectedRoundId,
                                                                columns:
                                                                  columns,
                                                                columnId:
                                                                  column.columnId,
                                                              },
                                                            }
                                                          )
                                                        }
                                                      >
                                                        {investor?.name}
                                                      </h4>
                                                    </div>
                                                    <div className="">
                                                      <i
                                                        onClick={() => {
                                                          onToggle(
                                                            column.columnId,
                                                            investor.investorId,
                                                            !investor
                                                              .investor_column
                                                              .isFavourite
                                                          );
                                                        }}
                                                        className={` favourite fa-solid fa-bookmark position-relative 
                                                   ${
                                                     investor.investor_column
                                                       .isFavourite
                                                       ? "text-primary"
                                                       : " "
                                                   }`}
                                                      ></i>
                                                      <>
                                                        {" "}
                                                        {
                                                          investor
                                                            .investor_column
                                                            .isFavourite
                                                        }
                                                      </>
                                                    </div>
                                                  </div>
                                                </h2>

                                                <div
                                                  className="accordion-body cursor-pointer border-top border-top-2 "
                                                  onClick={() =>
                                                    navigate(
                                                      `/investor-crm/investor/${investor?.investorId}`,
                                                      {
                                                        state: {
                                                          roundId:
                                                            selectedRoundId,
                                                          columns: columns,
                                                          columnId:
                                                            column.columnId,
                                                        },
                                                      }
                                                    )
                                                  }
                                                >
                                                  <div>
                                                    {investor?.fund_size && (
                                                      <div className="d-flex gap-1">
                                                        <h4 className="font-size-16">
                                                          $
                                                        </h4>
                                                        <h4 className="font-size-16">
                                                          {convertValueToShortScale(
                                                            investor?.fund_size
                                                          )}
                                                        </h4>
                                                      </div>
                                                    )}

                                                    {getInvestorProgress(
                                                      investor,
                                                      column.round
                                                    ) !== null && (
                                                      <div className="d-flex">
                                                        <div className="progress col-10 ">
                                                          <div
                                                            className="progress-bar  bg-success "
                                                            role="progressbar"
                                                            style={{
                                                              width: `${getInvestorProgress(
                                                                investor,
                                                                column.round
                                                              )}%`,
                                                            }}
                                                          ></div>
                                                        </div>
                                                        <small className="col-2 ms-2">
                                                          {getInvestorProgress(
                                                            investor,
                                                            column.round
                                                          )}
                                                          %
                                                        </small>
                                                      </div>
                                                    )}
                                                    <p className="description_crm mt-2">
                                                      {investor?.description}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between ps-4 pb-3">
                                                  <small className="text-muted">
                                                    {getDateValue(
                                                      investor?.updatedAt?.toString()
                                                    )
                                                      ? getDateValue(
                                                          investor?.updatedAt?.toString()
                                                        )
                                                      : DateTime.fromISO(
                                                          investor?.updatedAt?.toString()
                                                        ).toLocaleString(
                                                          DateTime.DATE_MED
                                                        )}
                                                  </small>
                                                  <Dropdown
                                                    className="dropdown-container"
                                                    id="remove-investor"
                                                  >
                                                    <Dropdown.Toggle className="bi bi-three-dots-vertical  me-1 p-1 px-2"></Dropdown.Toggle>
                                                    <Dropdown.Menu className="m-2">
                                                      <Dropdown.Item
                                                        className="text-dark"
                                                        onClick={() =>
                                                          navigate(
                                                            `/investor-crm/investor/${investor?.investorId}`,
                                                            {
                                                              state: {
                                                                roundId:
                                                                  selectedRoundId,
                                                                columns:
                                                                  columns,
                                                                columnId:
                                                                  column.columnId,
                                                              },
                                                            }
                                                          )
                                                        }
                                                      >
                                                        <p className="mb-0">
                                                          {formatMessage({
                                                            id: "View Details",
                                                          })}
                                                        </p>
                                                      </Dropdown.Item>
                                                      <Dropdown.Item
                                                        className="text-dark"
                                                        onClick={() => {
                                                          setDeleteShowModal(
                                                            !showDeleteModal
                                                          );
                                                          setInvestorColumnObject(
                                                            {
                                                              investorId:
                                                                investor.investorId,
                                                              columnId:
                                                                column.columnId,
                                                            }
                                                          );
                                                        }}
                                                      >
                                                        <p className="mb-0">
                                                          {formatMessage({
                                                            id: "Remove Investor",
                                                          })}
                                                        </p>
                                                      </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                  </Dropdown>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div></div>
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              }
                            )}
                            <div className="d-flex justify-content-center mt-3">
                              {isHoveringForColumn && index === columnIndex ? (
                                column.status === "2" && (
                                  <button
                                    className=" border border-primary btn text-primary w-100 height-36 d-flex align-items-center justify-content-center font-size-13"
                                    onClick={(e) =>
                                      handleAddInvestorModal(true, column)
                                    }
                                  >
                                    {formatMessage({ id: "Add Investor" })}
                                  </button>
                                )
                              ) : (
                                <div className="height-36"></div>
                              )}
                            </div>
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>

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
                </div>
              );
            })}
          </DragDropContext>
        )}
      </div>
      <InvestmentConfirmationModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        currency={round?.currencyId}
        roundId={selectedRoundId}
        roundName={round?.roundName}
        investorId={updateColumnEntries?.investorId}
        currencyOptions={currencyOptions}
        getAllColumnsFromRoundId={getAllColumnsFromRoundId}
        setColumns={setColumns}
        getActiveRoundFromApi={getActiveRoundFromApi}
      />
      <InvestmentRejectionmModal
        modalRejectShow={modalRejectShow}
        setModalRejectShow={setModalRejectShow}
        roundId={selectedRoundId}
        investorId={updateColumnEntries?.investorId}
        investorUsers={investorUser}
        getAllColumnsFromRoundId={getAllColumnsFromRoundId}
        setColumns={setColumns}
        refreshRound={refreshRound}
        getActiveRoundFromApi={getActiveRoundFromApi}
        setRefreshRound={setRefreshRound}
      />
    </>
  );
};
