import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../../../_metronic/helpers";

export const ToolTipUI = ({ tooltipText }: { tooltipText?: string }) => {
  return (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="tooltip">
            <p> {tooltipText}</p>
          </Tooltip>
        }
      >
        <img
          src={toAbsoluteUrl("/media/icons/duotune/general/tooltip.svg")}
          alt="Tooltip"
          className="text-secondary ms-1"
          width="18px"
          height="18px"
        />
      </OverlayTrigger>
    </>
  );
};
