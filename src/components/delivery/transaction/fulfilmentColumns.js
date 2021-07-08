import React from "react";
import { formatDateTime } from "../../../utils/date-handler";
import useSpacing from "../../../hooks/useSpacing";
import { FULFILMENT_STATE_NAME } from "../../../constant/delivery";
import { green, red, grey } from "@material-ui/core/colors";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  status: {
    display: "flex",
    alignItems: "center",
  },
}));

const UseColumns = () => {
  const spacing = useSpacing();
  const classes = useStyles();
  const color = [grey[600], green[500], red[500]];
  return [
    {
      title: "Fulfilment ID",
      dataIndex: "id",
      key: "id",
      render: (value, rowData) => value || "-",
    },
    {
      title: "Fulfilment Status",
      dataIndex: "state",
      key: "state",
      render: (state, rowData) => {
        const fulfilmentState = rowData.state;
        return (
          <span
            style={{ color: color[fulfilmentState - 1] }}
            className={classes.status}
          >
            <FiberManualRecordIcon fontSize="small" className={spacing.mr1} />
            {FULFILMENT_STATE_NAME[fulfilmentState]}
          </span>
        );
      },
    },
    {
      title: "Unit Type",
      dataIndex: "workUnit",
      key: "unit",
      render: (value) =>
        Object.keys(value).map((key, index) => (
          <p key={index} className={`${spacing.mt0} ${spacing.mb0}`}>
            {key}
          </p>
        )),
    },
    {
      title: "Unit Value",
      dataIndex: "workUnit",
      align: "right",
      key: "workUnit",
      render: (value) =>
        Object.keys(value).map((key, index) => (
          <p key={index} className={`${spacing.mt0} ${spacing.mb0}`}>
            {value[key]}
          </p>
        )),
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (value, rowData) => value || "-",
    },
    {
      title: "Hub Name",
      dataIndex: "clientHubName",
      key: "clientHubName",
      render: (value, rowData) => value || "-",
    },
    {
      title: "Driver Contact",
      dataIndex: "clientDriverMobile",
      key: "clientDriverMobile",
    },
    {
      title: "Requirement ID",
      dataIndex: "requirementId",
      key: "requirementId",
      render: (value, rowData) => value || "-",
    },
    {
      title: "CheckIn time",
      dataIndex: "checkInTime",
      key: "checkInTime",
      render: (date) => (date ? formatDateTime(date) : "-"),
    },
    {
      title: "Checkout time",
      dataIndex: "checkOutTime",
      key: "checkOutTime",
      render: (date) => (date ? formatDateTime(date) : "-"),
    },
    {
      title: "Reporting time",
      dataIndex: "reportingTime",
      key: "reportingTime",
      render: (date) => (date ? formatDateTime(date) : "-"),
    },
    {
      title: "Slot",
      dataIndex: "clientHubSlotName",
      key: "clientHubSlotName",
      render: (value, rowData) => value || "-",
    },
    {
      title: "Oye Number",
      dataIndex: "committedOyeNumber",
      key: "committedOyeNumber",
      render: (value, rowData) => value || "-",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDateTime(date),
    },
  ];
};

export default UseColumns;
