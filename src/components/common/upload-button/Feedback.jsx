import React from "react";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  outputBtn: {
    textTransform: "none",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  container: {
    width: "50%",
  },
}));

const Feedback = ({
  outputFileName,
  isSnackVisible,
  handleClose,
  message,
  handleDialogClose,
  isDialogOpen,
  summary,
  downloadFile
}) => {
  const classes = useStyles();
  return (
    <>
      <Snackbar
        open={isSnackVisible}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert variant="filled" onClose={handleClose} severity={message.type}>
          {message.text}
        </Alert>
      </Snackbar>

      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="simple-dialog-title"
        open={isDialogOpen}
      >
        <DialogTitle id="simple-dialog-title">Upload summary</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} className={classes.container}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Success</TableCell>
                  <TableCell>Failed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{summary.success}</TableCell>
                  <TableCell>{summary.fail}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Divider className={classes.divider} />
          <small>Please check the output file for errors</small>
          <Button
            color="primary"
            className={classes.outputBtn}
            onClick={downloadFile}
          >
            {outputFileName}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Feedback;
