import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { green, red } from "@material-ui/core/colors";
import {
  DELIVERY_STATE_NAMES,
  DELIVERY_STATE,
} from "../../../constant/delivery";
import { makeStyles } from "@material-ui/core/styles";
import useSpacing from "../../../hooks/useSpacing";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { formatDateTime } from "../../../utils/date-handler";

const { INACTIVE, ACTIVE } = DELIVERY_STATE;

const color = {
  [INACTIVE]: red[500],
  [ACTIVE]: green[500],
};

const useStyles = makeStyles((theme) => ({
  status: {
    display: "flex",
    alignItems: "center",
  },
  menuButton: {
    width: "100%",
    textTransform: "none",
    textAlign: "left",

    "& .MuiButton-label": {
      justifyContent: "left",
    },
  },

  menu: {
    "& .MuiPaper-elevation8": {
      boxShadow: "0 0 10px rgba(0,0,0,0.08)",
    },
  },
}));

const UseColumns = ({ regions, openActionMenu }) => {
  const classes = useStyles();
  const spacing = useSpacing();

  return [
    {
      title: "Hub ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hub name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Client",
      dataIndex: "clientName",
      key: "clientName",
    },
    {
      title: "Oye Region",
      dataIndex: "regionId",
      key: "regionId",
      render: (text) => (text ? regions[text] : "-"),
    },
    {
      title: "Status",
      dataIndex: "state",
      key: "state",
      render: (state, rowData) => {
        return (
          <span style={{ color: color[state] }} className={classes.status}>
            <FiberManualRecordIcon fontSize="small" className={spacing.mr1} />
            {DELIVERY_STATE_NAMES[state]}
          </span>
        );
      },
    },
    {
      title: "Latitude",
      dataIndex: "hubLocation",
      key: "latitude",
      render: (hubLocation, rowData) =>
        hubLocation ? hubLocation.lat : "null",
    },
    {
      title: "Longitude",
      dataIndex: "hubLocation",
      key: "longitude",
      render: (hubLocation, rowData) =>
        hubLocation ? hubLocation.lon : "null",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDateTime(date),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id, rowData) => {
        return (
          <>
            <IconButton onClick={(event) => openActionMenu(event, rowData)}>
              <MoreVertIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
};

export default UseColumns;
