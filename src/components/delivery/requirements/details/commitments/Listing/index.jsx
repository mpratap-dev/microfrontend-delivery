import React, { useEffect, useState } from "react";
import AsyncTable from "../../../../../common/table/AsyncTable";
import UseColumns from "./commitmentColumns";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { deleteCommitment } from "../../../../../../api/delivery";
import DeleteIcon from "@material-ui/icons/Delete";
import { COMMITMENT_STATE } from "../../../../../../constant/delivery";
import ConfirmButton from "../../../../../common/confirm-button";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from "@material-ui/core";
import useSpacing from "../../../../../../hooks/useSpacing";

const { INACTIVE, ACTIVE } = COMMITMENT_STATE;

const useStyles = makeStyles({
  tableContainer: {
    height: 320,
    overflow: 'auto',
    // '& .tableContainer': {
    //   minHeight: 305,
    // },

    '& th, & td': {
      fontSize: 12,
      padding: '5px'
    },

    // '& .MuiFormControlLabel-label': {
    //   fontSize: 12
    // },

    // '& .MuiButton-label': {
    //   textTransform: 'none'
    // }
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CommitmentTable = ({
  commitments,
  getCommitedVehicles,
  loadingCommitments,
  updateField
}) => {
  const [message, setMessage] = useState({
    type: "success",
    text: "",
    visibility: false,
  });
  const smWidth = useMediaQuery('(max-width:600px)');
  const classes = useStyles();
  const [selectedRows, setSelectedRows] = useState([]);
  const spacing = useSpacing();

  const handleDelete = async (commitmentId) => {
    const mappedStatus = {};
    Array.isArray(commitments) && commitments.forEach(({id, state}) => {
      mappedStatus[id] = state;
    });
    commitmentId = commitmentId.filter(x => mappedStatus[x] === ACTIVE);
    try {
      const data = { id: commitmentId, state: 2 };
      const res = await deleteCommitment(data);
      const {status, message } = res;
      let difference = commitmentId.filter(x => !res.data.id.includes(x));
      if (status) {
        if(!difference.length) {
          setMessage({ type: "success", text: message || 'Commitment removed successfully', visibility: true });
        } else {
          let msg =  `Unable to delete commitments IDS: ${difference}`;
          setMessage({ type: "error", text: msg, visibility: true });
        }
        updateField({action: 'REMOVE', count: res.data.id.length});
        getCommitedVehicles();
        setSelectedRows([]);
      } else {
        setMessage({ type: "error", text: message || 'Something went wrong', visibility: true });
      }
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Something went wrong",
        visibility: true,
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage({ ...message, visibility: false });
  };

  const columns = UseColumns({
    setMessage,
    getCommitedVehicles,
    handleDelete
  });

  const onTableChange = (values, selectedTableRows) => setSelectedRows(selectedTableRows.map(each => each.id));

  const disableRowCondition = (row) => {
    const isInactive = row.state === INACTIVE;
    const currentDate = new Date(Date.now());
    const reportingTime = new Date(row.reportingTime);
    reportingTime.setDate(reportingTime.getDate() + 1)
    reportingTime.setHours(0, 0, 0);
  
    const isExpired = currentDate > reportingTime;

    return isInactive || isExpired;
  }

  useEffect(() => {
    getCommitedVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={classes.tableContainer}>
        <AsyncTable
          data={commitments}
          dense
          scroll={smWidth}
          rowKey="id"
          loading={loadingCommitments}
          columns={columns}
          selection
          handleChange={onTableChange}
          elevation={0}
          disableRow={disableRowCondition}
        />
      </div>
      <Grid container spacing={2} className={`${spacing.mx2} ${spacing.pb2} ${spacing.mt1}`}>
        <Grid item>
        <ConfirmButton
              onConfirm={() => handleDelete(selectedRows)}
              message={`Are you sure you want to delete ${selectedRows.length} commitment${selectedRows.length > 1 ? 's' : ''}?`}
              buttonProps={{
                startIcon: <DeleteIcon fontSize="small" />,
                color: 'secondary',
                size: "small",
                disabled: !selectedRows.length,
                variant: "contained",
              }}
            >
              Delete
            </ConfirmButton>
        </Grid>
      </Grid>
      <Snackbar
        open={message.visibility}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={message.type}>
          {message.text}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CommitmentTable;
