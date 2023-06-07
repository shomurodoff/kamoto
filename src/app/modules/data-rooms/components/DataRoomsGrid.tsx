import React from "react";
import dataRoomOwner from "../../../../_metronic/assets/images/images/data-room-owner.png";
import shared1 from "../../../../_metronic/assets/images/images/room-shared-image-1.png";
import shared2 from "../../../../_metronic/assets/images/images/room-shared-image-2.png";
import shared3 from "../../../../_metronic/assets/images/images/room-shared-image-3.png";
function DataRoomsGrid() {
  const DataRoomCard = [
    {
      id: 1001,
      name: "Internal Investors",
      lastUpdated: "5h",
      publishStatus: "Publish",
      ownerName: "Toshendra",
      ownerImage: dataRoomOwner,
      totalDocuments: "24",
      totalViews: "152",
    },
    {
      id: 1002,
      name: "Internal Investors",
      lastUpdated: "5h",
      publishStatus: "Unpublished",
      ownerName: "Toshendra",
      ownerImage: dataRoomOwner,
      totalDocuments: "24",
      totalViews: "152",
    },
    {
      id: 1003,
      name: "Internal Investors",
      lastUpdated: "5h",
      publishStatus: "Published",
      ownerName: "Toshendra",
      ownerImage: dataRoomOwner,
      totalDocuments: "24",
      totalViews: "152",
    },
  ];

  return (
    <>
      {DataRoomCard.map((el) => (
        <div className="DataRoom-Card-Wrapper bg-white" key={el.id}>
          <div className="DataRoom-Card-head  d-flex align-items-center justify-content-between ">
            <h5 className="form-check-label m-0">{el.name}</h5>

            <div className="d-flex align-items-center">
              <label className="toggle" htmlFor={`${el.id}`}>
                <input
                  className="toggle__input"
                  name=""
                  type="checkbox"
                  id={`${el.id}`}
                />
                <div className="toggle__fill"></div>
              </label>
              <div className="card-option d-flex align-items-center justify-content-center">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_4455_17074)">
                    <path
                      d="M10.5015 2.75C9.5543 2.75 8.7793 3.525 8.7793 4.47222C8.7793 5.41944 9.5543 6.19444 10.5015 6.19444C11.4487 6.19444 12.2237 5.41944 12.2237 4.47222C12.2237 3.525 11.4487 2.75 10.5015 2.75ZM10.5015 14.8056C9.5543 14.8056 8.7793 15.5806 8.7793 16.5278C8.7793 17.475 9.5543 18.25 10.5015 18.25C11.4487 18.25 12.2237 17.475 12.2237 16.5278C12.2237 15.5806 11.4487 14.8056 10.5015 14.8056ZM10.5015 8.77778C9.5543 8.77778 8.7793 9.55278 8.7793 10.5C8.7793 11.4472 9.5543 12.2222 10.5015 12.2222C11.4487 12.2222 12.2237 11.4472 12.2237 10.5C12.2237 9.55278 11.4487 8.77778 10.5015 8.77778Z"
                      fill="#8898A6"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4455_17074">
                      <rect
                        width="20.6667"
                        height="20.6667"
                        fill="white"
                        transform="translate(0.167969 0.166016)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className="DataRoom-Card-body">
            <p className="last-updated">Last Updated {el.lastUpdated} ago</p>
            <span className="publish-status not_Publish">
              {el.publishStatus}
            </span>
            <div className="DataRoom-Card-body-grid">
              <div className="owner-wrapper">
                <p className="data-room-owner">Owner</p>
                <div className="d-flex flex-row align-items-center">
                  <img src={el.ownerImage} alt=""></img>
                  <p className="data-room-owner-name">{el.ownerName}</p>
                </div>
              </div>
              <div className="owner-wrapper">
                <p className="data-room-owner">Shared with</p>
                <div className="d-flex flex-row align-items-center">
                  <div className="d-flex flex-row align-items-center shared-user-stack">
                    <img src={shared1} alt=""></img>
                    <img src={shared2} alt=""></img>
                    <img src={shared3} alt=""></img>
                  </div>
                  <p className="data-room-owner-name">39+ More</p>
                </div>
              </div>
            </div>
            <div className="DataRoom-Card-body-grid ">
              <div className="">
                <p className="total-stats">Total Documents</p>
                <span>{el.totalDocuments}</span>
              </div>
              <div className="">
                <p className="total-stats">Total Views</p>
                <span>{el.totalViews}</span>
              </div>
            </div>
          </div>

          <div className="DataRoom-Card-bottom">
            <button className="btn btn-secondary font-size-13 w-100  font-weight-400 height-36 d-flex align-items-center justify-content-center ">
              View Details
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default DataRoomsGrid;
