import React from "react";
import dataRoomOwner from "../../../../_metronic/assets/images/images/data-room-owner.png";
import shared1 from "../../../../_metronic/assets/images/images/room-shared-image-1.png";
import shared2 from "../../../../_metronic/assets/images/images/room-shared-image-2.png";
import shared3 from "../../../../_metronic/assets/images/images/room-shared-image-3.png";
function DataRoomsTable() {
  const DataRoomTable = [
    {
      id: 101,
      name: "Internal Investors",
      lastUpdated: "5h",
      publishStatus: "Publish",
      ownerName: "Toshendra",
      ownerImage: dataRoomOwner,
      totalDocuments: "24",
      totalViews: "152",
    },
    {
      id: 102,
      name: "Internal Investors",
      lastUpdated: "5h",
      publishStatus: "Unpublished",
      ownerName: "Toshendra",
      ownerImage: dataRoomOwner,
      totalDocuments: "24",
      totalViews: "152",
    },
    {
      id: 103,
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
    <div className="data-rooms-space-table-wrapper bg-white">
      <div className=" table-responsive">
        <table className="table table-row-bordered space-table">
          <thead>
            <tr className=" ">
              <th>Name</th>
              <th>Last Modified</th>
              <th>owner</th>
              <th>Shared with</th>
              <th>Documents</th>
              <th>Views</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {DataRoomTable.map((el) => (
              <tr key={el.id}>
                <td className="room-space-name">{el.name}</td>
                <td className="last-updated">{el.lastUpdated} ago</td>
                <td className="room-space-owner">
                  <div className="d-flex align-items-center">
                    <img src={el.ownerImage} alt=""></img>
                    <p className="mb-0">{el.ownerName}</p>
                  </div>
                </td>
                <td className="shared-with">
                  <div className="d-flex flex-row align-items-center">
                    <div className="d-flex flex-row align-items-center shared-user-stack">
                      <img src={shared1} alt=""></img>
                      <img src={shared2} alt=""></img>
                      <img src={shared3} alt=""></img>
                    </div>
                    <p className=" mb-0">39+ More</p>
                  </div>
                </td>
                <td className="total-documents">{el.totalDocuments}</td>
                <td className="total-views">{el.totalViews}</td>
                <td className="publish-status">
                  <div className="Status">{el.publishStatus}</div>
                </td>
                <td className="Action">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataRoomsTable;
