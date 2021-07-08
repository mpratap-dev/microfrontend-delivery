import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import If from "../../../../../common/if";
import ConfirmButton from "../../../../../common/confirm-button";
import { Button } from "@material-ui/core";
import { COMMITMENT_TYPE, COMMITMENT_STATE } from "../../../../../../constant/delivery";
import { changeCommitmentType } from "../../../../../../api/delivery";

const { BACKUP } = COMMITMENT_TYPE;
const { ACTIVE } = COMMITMENT_STATE;

const UseColumns = ({ setMessage, getCommitedVehicles, handleDelete }) => {
  const handleClick = async (event, id) => {
    event.stopPropagation();

    try {
      const { status, message } = await changeCommitmentType(id);
      if(status) {
        getCommitedVehicles();
        setMessage({
          type: "success",
          text: message || "Status changed successfully",
          visibility: true,
        });
      }
      else {
        setMessage({
          type: "error",
          text: message || "Something went wrong",
          visibility: true,
        });
      }
    }
    catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong",
        visibility: true,
      });
    }
  }

  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50
    },
    {
      title: "VBN No.",
      dataIndex: "oyeNumber",
      key: "oyeNumber",
      width: 65
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 50
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      width: 50,
      render: (data, rowData, {disableRow}) => (
        <>
          <If condition={rowData.state === 1}>
            <ConfirmButton
              iconBtn
              onConfirm={() => handleDelete([rowData.id])}
              message="Are you sure you want to delete this commitment?"
              buttonProps={{
                color: 'secondary',
                size: "small",
                disabled: disableRow(rowData)
              }}
            >
              <DeleteIcon fontSize="small" />
            </ConfirmButton>
          </If>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "type",
      key: "action",
      width: 80,
      render: (type, rowData) => {
        return (
          <If condition={rowData.state === ACTIVE && type === BACKUP}>
            <Button 
              variant="contained" 
              color="primary" 
              size="small"
              onClick={(event) => handleClick(event, rowData.id)}
            >Mark Primary</Button>
          </If>
        )
      }
    },
  ];
}

export default UseColumns;
