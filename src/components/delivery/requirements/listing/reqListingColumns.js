import React, { lazy } from "react";
import {
  changeReqStatus,
  editRequirements,
} from "../../../../api/delivery";
import ListingActionButtons from "./ListingActionButtons";
import { formatDateTime } from "../../../../utils/date-handler";
import {
  REQUIREMENT_STATE_NAME,
  REQUIREMENT_STATE,
  SLOT_STATE_NAME,
} from "../../../../constant/delivery";
import { green, red, grey } from "@material-ui/core/colors";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from "@material-ui/core/styles";
import useSpacing from "../../../../hooks/useSpacing";
import { checkPermissions } from "../../../../utils/check-permission";
import moment from "moment";
import If from "../../../common/if";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import Label from "../../../common/label";

const InlineEditInput = lazy(() => import("../../../common/inline-edit-input"));
const { OPEN, FROZEN, INACTIVE } = REQUIREMENT_STATE;

const useStyles = makeStyles((theme) => ({
  status: {
    display: "flex",
    alignItems: "center",
  },
  chip: {
    fontSize: "10px",
    color: "white",
    height: "auto",
    padding: "2px 0",
    fontWeight: "bold",
  },
}));

const UseColumns = ({ reqStates, setReqState, setMessage, getListingData }) => {
  const color = [grey[600], green[500], red[500]];
  const SlotColor = {
    2: grey[600],
    4: green[500],
    5: red[500],
  };
  const classes = useStyles();
  const spacing = useSpacing();
  const COLLAPSIBLE_ROWS = [INACTIVE, FROZEN];

  const changeReqState = async (id, state) => {
    const data = { id, state };
    const response = await changeReqStatus(data);
    try {
      const { status, message } = response;
      if (status) {
        const action = state === INACTIVE ? "deleted" : "frozen";
        setMessage({
          type: "success",
          text: `Requiement ${action} successfully`,
          visibility: true,
        });
        setReqState({ ...reqStates, [id]: state });
      } else {
        setMessage({
          type: "error",
          text: message || "Something went wrong",
          visibility: true,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong",
        visibility: true,
      });
    }

    return response;
  };

  const handleCommitedChange = async (noOfVehicleRequired, rowData) => {
    const { reportingTime, clientHubId, bufferTime } = rowData;
    const body = {
      clientHubId,
      noOfVehicleRequired: +noOfVehicleRequired,
      reportingTime: moment(reportingTime).format("YYYY-MM-DD HH:mm"),
      bufferTime,
    };
    const response = await editRequirements(rowData.id, body);
    console.log(response);
  };

  return [
    {
      title: "Req. ID",
      dataIndex: "id",
      key: "id",
      render: (id, rowData) => {
        const currentState = reqStates[rowData.id] - 1;
        return (
          <>
            <If
              condition={COLLAPSIBLE_ROWS.includes(rowData.state)}
              defaultCase={<span className={spacing.mr2}>{id}</span>}
            >
              <Link
                to={{
                  pathname: `/delivery/requirements/${rowData.id}`,
                  state: { fromListing: true },
                }}
                className={spacing.mr2}
              >
                {id}
              </Link>
            </If>
            <Label color={color[currentState]}>
              {REQUIREMENT_STATE_NAME[currentState]}
            </Label>
          </>
        );
      },
    },
    {
      title: "Slot",
      dataIndex: "clientHubSlotName",
      key: "clientHubSlotName",
      render: (value, rowData) => {
        const clientHubSlotState = rowData.clientHubSlotState;
        return (
          <>
            <span className={spacing.mr2}>{value}</span>
            <Label color={SlotColor[clientHubSlotState]}>
              {SLOT_STATE_NAME[clientHubSlotState]}
            </Label>
          </>
        );
      },
    },
    {
      title: "Client name",
      dataIndex: "clientName",
      key: "clientName",
    },
    {
      title: "Client hub ID - Name",
      dataIndex: "clientHubId",
      key: "clientHubId",
      render: (value, rowData) => `${value} - ${rowData.clientHubName}`,
    },
    // {
    //   title: "Client hub name",
    //   dataIndex: "clientHubName",
    //   key: "clientHubName",
    //   render: (value) => value || "-",
    // },
    {
      title: "Reporing time",
      dataIndex: "reportingTime",
      key: "reportingTime",
      render: (value, rowData) => formatDateTime(value) || "-",
    },
    {
      title: "Required 🛺",
      dataIndex: "noOfVehicleRequired",
      key: "noOfVehicleRequired",
      render: (value, rowData) => {
        const currentState = reqStates[rowData.id];
        const currentDate = new Date(Date.now());
        const reportingTime = new Date(rowData.reportingTime);
        reportingTime.setDate(reportingTime.getDate() + 1);
        reportingTime.setHours(0, 0, 0);
        const isExpired = currentDate > reportingTime;
        return (
          <If condition={!!value} defaultCase="-">
            <If
              condition={currentState === OPEN && !isExpired}
              defaultCase={value}
              lazyload
            >
              <InlineEditInput
                inputProps={{ type: "number", style: { width: 40 } }}
                handleChange={(newValue) =>
                  handleCommitedChange(newValue, rowData)
                }
                value={value}
              />
            </If>
          </If>
        );
      },
    },
    {
      title: "Committed 🛺",
      dataIndex: "committedVehicleCount",
      key: "committedVehicleCount",
      render: (value, rowData) => value || "-",
    },
    {
      title: "Buffer time(mins)",
      dataIndex: "bufferTime",
      key: "bufferTime",
      render: (value, rowData) => value || "-",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value, rowData) => formatDateTime(value) || "-",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, rowData, { toggleCollapse }) =>
        checkPermissions("delivery_requirement", "EDIT") ? (
          <ListingActionButtons
            id={rowData.id}
            state={rowData.state}
            reportingDate={rowData.reportingTime}
            changeReqState={changeReqState}
            toggleCollapse={toggleCollapse}
            getListingData={getListingData}
          />
        ) : null,
    },
  ];
};

export default UseColumns;
