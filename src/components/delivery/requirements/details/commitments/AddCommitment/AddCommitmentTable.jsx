import React, { useEffect, useState } from "react";
import AsyncTable from "../../../../../common/table";
import UseColumns from "./addCommitmentColumns";
import { addCommitments, commitmentSearch } from "../../../../../../api/delivery";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import useSpacing from "../../../../../../hooks/useSpacing";
import ConfirmButton from "../../../../../common/confirm-button";
import { Grid, TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import { COMMITMENT_STATE, COMMITMENT_TYPE } from "../../../../../../constant/delivery";

const { ACTIVE } = COMMITMENT_STATE;

const useStyles = makeStyles({
  tableContainer: {
    height: 320,
    overflow: 'auto',
    "& th, & td": {
      fontSize: 12,
    },
  },
});

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const CommitmentTable = ({
  loading,
  commitmentsData,
  driversData,
  setdriverData,
  filterData,
  setLoading,
  getCommitedVehicles,
  updateField,
  requirementId,
  setSearchValue
}) => {
  const spacing = useSpacing();
  const classes = useStyles();
  const smWidth = useMediaQuery("(max-width:600px)");
  const [selectedRows, setSelectedRows] = useState([]);
  const [type, setType] = useState("");
  const [message, setMessage] = useState({
    type: "success",
    text: "",
    visibility: false,
  });

  const handleChange = (e) => setType(e.target.value);

  const getVehicles = async (listedCommitments) => {
    if (filterData && filterData.search_val) {
      setLoading(true);
      try {
        const { data, status } = await commitmentSearch(filterData);
        if (status) {
          const committedOyeNumbers = commitmentsData
            .filter((commitment) => commitment.state === ACTIVE)
            .map((commitment) => commitment.oyeNumber);

          const drivers = Array.isArray(listedCommitments)
            ? data.filter((commitment) => !committedOyeNumbers.includes(commitment.oyeNumber) 
              && !listedCommitments.includes(commitment.oyeNumber))
            : data.filter((commitment) => !committedOyeNumbers.includes(commitment.oyeNumber));

          setdriverData(drivers);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAdd = async (listedCommitments) => {
    try {
      const data = { 
        commitmentInfo: selectedRows.map((oyeNumber) => ({ oyeNumber, type })), 
        requirementId 
      };
      const { status, message } = await addCommitments(data);

      if (status) {
        setMessage({
          type: "success",
          text: message || "Commitment Add successfully",
          visibility: true,
        });
        setSelectedRows([]);
        setSearchValue("");
        setType("");
        getCommitedVehicles();
        updateField({action: 'ADD', count: listedCommitments.length});
        getVehicles(listedCommitments);
      } else {
        setMessage({
          type: "error",
          text: message || "Something went wrong",
          visibility: true,
        });
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
    if (reason === "clickaway") return;

    setMessage({ ...message, visibility: false });
  };

  const onTableChange = (values, selectedTableRows) => {
    setSelectedRows(selectedTableRows.map((each) => each.oyeNumber));
  };
  
  const columns = UseColumns();

  useEffect(() => {
    getVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData.search_val]);

  return (
    <>
      <div className={classes.tableContainer}>
        <AsyncTable
          data={driversData}
          dense
          rowKey="mobileNumber"
          loading={loading}
          columns={columns}
          selection
          scroll={smWidth}
          handleChange={onTableChange}
          elevation={0}
        />
      </div>
      <Grid container spacing={2} className={`${spacing.mx2} ${spacing.mt1}`}>
        <Grid item>
          <TextField
            id="hub-status"
            select
            style={{ width: 150 }}
            label="Select Type"
            required
            value={type}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {
              Object.keys(COMMITMENT_TYPE).map(type => (
                <MenuItem key={type} value={COMMITMENT_TYPE[type]}>{COMMITMENT_TYPE[type]}</MenuItem>
              ))
            }
          </TextField>
        </Grid>
        <Grid item>
          <ConfirmButton
            onConfirm={() => handleAdd(selectedRows)}
            message={`Are you sure you want to add ${
              selectedRows.length
            } commitment${selectedRows.length > 1 ? "s" : ""}?`}
            buttonProps={{
              startIcon: <AddIcon fontSize="small" />,
              color: "primary",
              size: "small",
              disabled: !selectedRows.length || !type,
              variant: "contained",
            }}
          >
            Add
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
