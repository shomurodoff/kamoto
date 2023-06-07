import pdfIcon from "../../../../_metronic/assets/images/svg/data-room/pdf-file-icon.svg";
import docIcon from "../../../../_metronic/assets/images/svg/data-room/doc-file-icon.svg";
import userImage from "../../../../_metronic/assets/images/svg/data-room/user-image.svg";
function RecentVisitsTable() {
  return (
    <div className="recent-visits-table-wrapper bg-white">
      <div className="recent-visits-header d-flex flex-row justify-content-between align-items-center">
        <div className="recent-visits-header-left">
          <h5 className="mb-0">Recent Visits</h5>
          <p className="mb-0">25 users visited recently</p>
        </div>
        <div className="recent-visits-header-right">
          <a
            href="https://example.com"
            className="btn btn-bg-light w-100px  btn-color-muted btn-active-color-primary d-flex justify-content-center align-items-center"
          >
            View All
          </a>
        </div>
      </div>
      <div className=" table-responsive">
        <table className="table table-hover visits-table">
          <thead>
            <tr className=" ">
              <th>Document</th>
              <th>User</th>
              <th>Company</th>
              <th>Recent Visits</th>
              <th>Last Visited</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={pdfIcon} alt=""></img> Company Updates quarterly wi...
              </td>
              <td>
                <img src={userImage} alt=""></img> Richard Kane
              </td>
              <td>AMC Ventures</td>
              <td>32</td>
              <td>15m ago</td>
              <td>
                <a
                  href="https://example.com"
                  className="btn btn-bg-light  btn-color-muted btn-active-color-primary btn-sm view-visit-button d-flex justify-content-center align-items-center"
                >
                  View
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <img src={docIcon} alt=""></img> NDA_20220923
              </td>
              <td>
                <img src={userImage} alt=""></img> Richard Kane
              </td>
              <td>AMC Ventures</td>
              <td>12</td>
              <td>15m ago</td>
              <td>
                <a
                  href="https://example.com"
                  className="btn btn-bg-light   btn-color-muted btn-active-color-primary btn-sm view-visit-button d-flex justify-content-center align-items-center"
                >
                  View
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <img src={pdfIcon} alt=""></img> Company Updates quarterly wi...
              </td>
              <td>
                <img src={userImage} alt=""></img> Richard Kane
              </td>
              <td>AMC Ventures</td>
              <td>32</td>
              <td>15m ago</td>
              <td>
                <a
                  href="https://example.com"
                  className="btn btn-bg-light  btn-color-muted btn-active-color-primary btn-sm view-visit-button d-flex justify-content-center align-items-center"
                >
                  View
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <img src={docIcon} alt=""></img> NDA_20220923
              </td>
              <td>
                <img src={userImage} alt=""></img> Richard Kane
              </td>
              <td>AMC Ventures</td>
              <td>12</td>
              <td>15m ago</td>
              <td>
                <a
                  href="https://example.com"
                  className="btn btn-bg-light   btn-color-muted btn-active-color-primary btn-sm view-visit-button d-flex justify-content-center align-items-center"
                >
                  View
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <img src={pdfIcon} alt=""></img> Company Updates quarterly wi...
              </td>
              <td>
                <img src={userImage} alt=""></img> Richard Kane
              </td>
              <td>AMC Ventures</td>
              <td>32</td>
              <td>15m ago</td>
              <td>
                <a
                  href="https://example.com"
                  className="btn btn-bg-light  btn-color-muted btn-active-color-primary btn-sm view-visit-button d-flex justify-content-center align-items-center"
                >
                  View
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <img src={docIcon} alt=""></img> NDA_20220923
              </td>
              <td>
                <img src={userImage} alt=""></img> Richard Kane
              </td>
              <td>AMC Ventures</td>
              <td>12</td>
              <td>15m ago</td>
              <td>
                <a
                  href="https://example.com"
                  className="btn btn-bg-light   btn-color-muted btn-active-color-primary btn-sm view-visit-button d-flex justify-content-center align-items-center"
                >
                  View
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentVisitsTable;
