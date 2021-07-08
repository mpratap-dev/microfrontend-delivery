import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import useSpacing from "../../../../../hooks/useSpacing";
import { Button, Divider, Grid, Paper } from "@material-ui/core";
import If from "../../../../common/if";
import DownloadUploadIcon from "@material-ui/icons/CloudDownload";
import CommitmentTable from "./Listing";
import { exportAsXLSX } from "../../../../../utils/export";
import {
  REQUIREMENT_STATE,
  COMMITMENT_STATE,
} from "../../../../../constant/delivery";
import AddCommitments from "./AddCommitment";
import { getCommitments } from "../../../../../api/delivery";
import { useParams } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "./style";
import CircularProgress from "@material-ui/core/CircularProgress";

const { FROZEN } = REQUIREMENT_STATE;
const { INACTIVE } = COMMITMENT_STATE;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CommitmentSection = ({
  requirement,
  setCommittedVehicles,
  committedVehicles,
}) => {
  const spacing = useSpacing();
  const classes = useStyles();
  const { id: requirementId } = useParams();
  const [commitments, setCommitments] = useState([]);
  const [totalAvaliableCommitments, setTotalAvaliableCommitments] = useState(1);
  const [loadingCommitments, setCommitmentLoader] = useState(false);
  const [message, setMessage] = useState({
    type: "success",
    text: "",
    visibility: false,
  });

  const currentDate = new Date(Date.now());
  const reportingTime = new Date(requirement.reportingTime);
  reportingTime.setDate(reportingTime.getDate() + 1);
  reportingTime.setHours(0, 0, 0);

  const isExpired = currentDate > reportingTime;

  const exportFile = async () => {
    try {
      setCommitmentLoader(true);
      const params = {
        search_via: "requirement_id",
        search_val: requirementId,
        page_number: 1,
        page_size: totalAvaliableCommitments,
      };
      const {
        data: { result },
        status,
      } = await getCommitments(params);

      if (status) {
        const commitmentsToExport = result
          .filter((commitment) => commitment.state !== INACTIVE)
          .map((commitment) => ({
            requirement_id: commitment.requirementId,
            oye_number: commitment.oyeNumber,
            type: "",
          }));
        exportAsXLSX(commitmentsToExport, `commitments_${requirementId}.xlsx`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCommitmentLoader(false);
    }
  };

  const getCommitedVehicles = async () => {
    try {
      setCommitmentLoader(true);
      const params = {
        search_via: "requirement_id",
        search_val: requirementId,
        page_number: 1,
        page_size: 50,
      };
      const {
        data: { result, totalAvailableResult },
        status,
      } = await getCommitments(params);

      if (status) {
        setCommitments(result);
        setTotalAvaliableCommitments(totalAvailableResult);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCommitmentLoader(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setMessage({ ...message, visibility: false });
  };

  const updateField = ({ action, count }) => {
    const updatedCommittedVehicles =
      action === "ADD" ? committedVehicles + count : committedVehicles - count;

    setCommittedVehicles(updatedCommittedVehicles);
  };

  return (
    <>
      <Grid container spacing={2} className={`${spacing.my0}`}>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Grid
              container
              alignItems="center"
              justify="space-between"
              className={` 
                ${spacing.px4} 
                ${spacing.py2}
                ${classes.tablesHeader}
              `}
            >
              <Grid item>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="primary"
                  component="div"
                >
                  COMMITED DRIVERS
                </Typography>
              </Grid>
              <Grid item>
                <Grid container justify="flex-end">
                  <If condition={commitments.length}>
                    <Button
                      variant="contained"
                      startIcon={
                        loadingCommitments ? (
                          <CircularProgress size={20} />
                        ) : (
                          <DownloadUploadIcon />
                        )
                      }
                      onClick={exportFile}
                      size="small"
                      disabled={loadingCommitments}
                    >
                      Export Commitments
                    </Button>
                  </If>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <CommitmentTable
              loadingCommitments={loadingCommitments}
              commitments={commitments}
              setCommitments={setCommitments}
              getCommitedVehicles={getCommitedVehicles}
              updateField={updateField}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <If condition={requirement.state === FROZEN && !isExpired}>
            <AddCommitments
              commitments={commitments}
              getCommitedVehicles={getCommitedVehicles}
              updateField={updateField}
              requirementId={requirementId}
            />
          </If>
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

export default CommitmentSection;
