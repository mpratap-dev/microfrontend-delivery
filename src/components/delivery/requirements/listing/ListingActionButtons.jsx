import React, { useState } from "react";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import DeleteIcon from "@material-ui/icons/Delete";
import { REQUIREMENT_STATE } from "../../../../constant/delivery";
import ConfirmButton from "../../../common/confirm-button";

const { FROZEN, INACTIVE, OPEN } = REQUIREMENT_STATE;

const ListingActionButtons = ({
  id,
  state,
  changeReqState,
  reportingDate,
  toggleCollapse,
  getListingData,
}) => {
  const [status, setStatus] = useState(state);
  const currentDate = new Date(Date.now());
  const reportingTime = new Date(reportingDate);
  reportingTime.setDate(reportingTime.getDate() + 1);
  reportingTime.setHours(0, 0, 0);

  const isExpired = currentDate > reportingTime;

  const handleActionClick = async (currentState) => {
    const { status } = await changeReqState(id, currentState);
    if (status) {
      setStatus(currentState);
      getListingData();
    }

    toggleCollapse(false);
  };

  if (isExpired) return null;

  switch (status) {
    case FROZEN:
      return (
        <ConfirmButton
          onConfirm={() => handleActionClick(INACTIVE)}
          message="Are you sure you want to delete this requirement?"
          buttonProps={{
            startIcon: <DeleteIcon fontSize="small" />,
            color: "secondary",
            size: "small",
          }}
        >
          Delete
        </ConfirmButton>
      );
    case OPEN:
      return (
        <ConfirmButton
          onConfirm={() => handleActionClick(FROZEN)}
          message="Are you sure you want to freeze this requirement?"
          buttonProps={{
            startIcon: <BeenhereIcon fontSize="small" />,
            color: "primary",
            size: "small",
          }}
        >
          Freeze
        </ConfirmButton>
      );
    default:
      return null;
  }
};

export default ListingActionButtons;
