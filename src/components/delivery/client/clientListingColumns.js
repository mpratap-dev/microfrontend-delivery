import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { formatDateTime } from "../../../utils/date-handler";
import { green, red } from "@material-ui/core/colors";
import {
  DELIVERY_STATE_NAMES,
  DELIVERY_STATE,
} from "../../../constant/delivery";
import { makeStyles } from "@material-ui/core/styles";
import useSpacing from "../../../hooks/useSpacing";

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
}));

const UseColumns = () => {
  const classes = useStyles();
  const spacing = useSpacing();
  return [
    {
      title: "Client ID",
      dataIndex: "id",
      key: "id",
      // search: true
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // search: true
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => text || "-",
    },
    {
      title: "Status",
      dataIndex: "state",
      key: "status",
      // search: true,
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text || "-",
    },
    {
      title: "Central SPOC",
      dataIndex: "spocName",
      key: "spocname",
      render: (text) => text || "-",
    },
    {
      title: "Central SPOC Contact",
      dataIndex: "spocContact",
      key: "spoccontact",
      render: (text) => text || "-",
    },
    // {
    //   title: 'Hub name',
    //   dataIndex: 'hubName',
    //   key: 'hubName',
    //   search: true,
    //   render: (text) => (text || '-')
    // },
    // {
    //   title: 'Oye region',
    //   dataIndex: 'oyeRegion',
    //   key: 'oyeRegion',
    //   search: true,
    //   // render: (text, rowData) => (

    //   //   <Link to={`/home/dashboard/delivery/client/${rowData.id}/hub`}>{text}</Link>
    //   // ),
    //   render: (text) => (text || '-')
    // },
    {
      title: "Address",
      dataIndex: "headOfficeAddress",
      key: "location",
      render: (text) => text || "-",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDateTime(date),
    },
    // {
    //   title: 'Rate card',
    //   dataIndex: 'rateCard',
    //   key: 'rateCard',
    //   render: (text, rowData) => (
    //     <LinkButton
    //       to={`/home/dashboard/delivery/client/${rowData.id}/rate-card`}
    //       iconButton
    //       size="small"
    //       color="secondary"
    //     >
    //       <MonetizationOnIcon fontSize="small" />
    //     </LinkButton>
    //   )
    // },
    // {
    //   title: 'Edit',
    //   dataIndex: 'edit',
    //   key: 'edit',
    //   render: (text, rowData) => (
    //     <LinkButton
    //       to={`/home/dashboard/delivery/client/${rowData.id}`}
    //       iconButton
    //       size="small"
    //       color="primary"
    //     >
    //       <EditIcon fontSize="small" />
    //     </LinkButton>
    //   )
    // }
  ];
};

export default UseColumns;
