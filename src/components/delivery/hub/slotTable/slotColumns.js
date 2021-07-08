import React from "react";
import { formatDateTime } from "../../../../utils/date-handler";
import { green, red, grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import useSpacing from "../../../../hooks/useSpacing";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { SLOT_STATE_NAME, SLOT_STATE } from "../../../../constant/delivery";
import { checkPermissions } from "../../../../utils/check-permission";
import SlotActionButtons from "./SlotActionButtons";
import LinkButton from "../../../common/link-button";
import EditIcon from "@material-ui/icons/Edit";
import If from "../../../common/if";

const { PENDING_APPROVAL } = SLOT_STATE;

const color = {
  2: grey[600],
  4: green[500],
  5: red[500],
};

const useStyles = makeStyles((theme) => ({
  status: {
    display: "flex",
    alignItems: "center",
  },
}));

const UseColumns = ({ slotStates, changeSlotState, setMessage }) => {
  const classes = useStyles();
  const spacing = useSpacing();

  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "state",
      key: "state",
      render: (state, rowData) => {
        const currentState = slotStates[rowData.id];
        return (
          <span
            style={{ color: color[currentState] }}
            className={classes.status}
          >
            <FiberManualRecordIcon fontSize="small" className={spacing.mr1} />
            {SLOT_STATE_NAME[currentState]}
          </span>
        );
      },
    },
    {
      title: "Start time",
      dataIndex: "slotStartTime",
      key: "slotStartTime",
    },
    {
      title: "End time",
      dataIndex: "slotEndTime",
      key: "slotEndTime",
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text, rowData) => {
        const date = text || rowData.createdAt;
        return formatDateTime(date);
      },
    },
    {
      title: "Action",
      dataIndex: "state",
      key: "action",
      render: (state, rowData, { toggleCollapse }) =>
        checkPermissions("delivery_client_hub_slot", "ACTIVATION") ? (
          <SlotActionButtons
            id={rowData.id}
            state={state}
            slotStates={slotStates}
            changeSlotState={changeSlotState}
            toggleCollapse={toggleCollapse}
          />
        ) : null,
    },
  ];
};

export default UseColumns;
