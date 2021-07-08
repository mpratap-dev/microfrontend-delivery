import React from "react";
import { DRIVER_DETAILS_STATE } from "../../../constant/delivery";
import EditIcon from "@material-ui/icons/Edit";
import LinkButton from "../../common/link-button";
import { formatDateTime } from "../../../utils/date-handler";

const UseColumns = () => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Client ID",
      dataIndex: "clientId",
      key: "clientId",
    },
    {
      title: "Client name",
      dataIndex: "clientName",
      key: "clientName",
      render: (text) => text || "-",
    },
    {
      title: "Client Driver ID",
      dataIndex: "clientDriverId",
      key: "clientDriverId",
      render: (text) => text || "-",
    },
    {
      title: "OYE Driver ID",
      dataIndex: "driverId",
      key: "driverId",
      render: (text) => text || "-",
    },
    {
      title: "Driver Contact",
      dataIndex: "clientDriverMobile",
      key: "clientDriverMobile",
      render: (text) => text || "-",
    },
    {
      title: "Status",
      dataIndex: "state",
      key: "state",
      render: (state) => DRIVER_DETAILS_STATE[state - 1],
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDateTime(date),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (text, rowData) => (
        <LinkButton
          to={`/delivery/driver-details/edit/${rowData.id}`}
          iconButton
          color="primary"
          size="small"
          // disabled
        >
          <EditIcon fontSize="small" />
        </LinkButton>
      ),
    },
  ];
};

export default UseColumns;
