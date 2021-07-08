import React, { useState } from "react";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import ArchiveIcon from "@material-ui/icons/Archive";
import { SLOT_STATE } from "../../../../constant/delivery";
import ConfirmButton from "../../../common/confirm-button";
// import moment from "moment";

const { PENDING_APPROVAL, ACTIVE, PHASED_OUT } = SLOT_STATE;

const SlotActionButtons = ({ id, changeSlotState, slotStates }) => {
  const currentState = slotStates[id];
  // const tomorrowsDate = moment().add(1,'days').format('YYYY-MM-DD');

  const [loading, setLoading] = useState(false);

  const handleActionClick = async (currentState) => {
    setLoading(true);
    await changeSlotState(id, currentState);
    setLoading(false);
  };

  switch (currentState) {
    case ACTIVE:
      return (
        <ConfirmButton
          onConfirm={() => handleActionClick(PHASED_OUT)}
          message={
            <>
              <p>
                Upcoming <small>(tomorrow onwards)</small> requirements and
                their respective commitments associated with this slot will be
                marked as Inactive!
              </p>
              <p>Are you sure you want to phase out this slot?</p>
            </>
          }
          loading={loading}
          buttonProps={{
            startIcon: <ArchiveIcon fontSize="small" />,
            color: "secondary",
            size: "small",
          }}
        >
          Phase out
        </ConfirmButton>
      );
    case PENDING_APPROVAL:
      return (
        <ConfirmButton
          onConfirm={() => handleActionClick(ACTIVE)}
          message="Are you sure you want to approve this slot?"
          loading={loading}
          buttonProps={{
            startIcon: <BeenhereIcon fontSize="small" />,
            color: "primary",
            size: "small",
          }}
        >
          Approve
        </ConfirmButton>
      );
    default:
      return null;
  }
};

export default SlotActionButtons;
