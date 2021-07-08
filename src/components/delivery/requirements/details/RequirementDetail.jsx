import React from "react";

import If from "../../../common/if";
import Skeleton from "@material-ui/lab/Skeleton";
import { formatDateTime } from "../../../../utils/date-handler";
import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useSpacing from "../../../../hooks/useSpacing";
import { green, red, grey } from "@material-ui/core/colors";
import { REQUIREMENT_STATE_NAME } from "../../../../constant/delivery";
import { useHistory } from "react-router";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import Label from "../../../common/label";

const useStyles = makeStyles((theme) => ({
  keyname: {
    width: 200,
    display: "inline-block",
  },
  titleGrid: {
    display: "flex",
    alignItems: "center",
  },
  values: {
    width: 160,
    display: "inline-flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: 155,
    },
  },
  keys: {
    display: "inline-block",
    [theme.breakpoints.down("sm")]: {
      width: 130,
    },
  },
  status: {
    display: "inline-flex",
    alignItems: "center",
  },
  table: {
    "& .MuiTableCell-root": {
      borderBottom: 0,
    },
  },
}));

const RequirementDetails = ({ requirement, loading, committedVehicles }) => {
  const classes = useStyles();
  const spacing = useSpacing();
  const history = useHistory();
  const { location: { state: { fromListing } = {} } = {} } = history;
  const color = [grey[600], green[500], red[500]];
  const {
    id,
    clientHubSlotName,
    clientName,
    clientHubId,
    clientHubName,
    noOfVehicleRequired,
    reportingTime,
    state,
  } = requirement;

  const data = [
    {
      ID: id,
      Client: clientName,
      Status: state - 1,
    },
    {
      "Hub ID": clientHubId,
      Hub: clientHubName,
      Slot: clientHubSlotName,
    },
    {
      "Vehicles required": noOfVehicleRequired,
      "Vehicles committed": committedVehicles,
      Reporting: formatDateTime(reportingTime),
    },
  ];

  const handleBack = () => {
    if (fromListing) {
      history.goBack();
    } else {
      history.push(`/delivery/requirements/${requirement.id}`);
    }
  };

  return (
    <Paper elevation={1} className={spacing.mb4}>
      <If
        condition={loading}
        defaultCase={
          <>
            <Grid
              container
              justify="space-between"
              align="center"
              className={`${spacing.px3} ${spacing.py3}`}
            >
              <Grid item className={classes.titleGrid}>
                <IconButton
                  onClick={handleBack}
                  color="primary"
                  size="small"
                  className={spacing.mr2}
                >
                  <ArrowBackRoundedIcon />
                </IconButton>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  color="primary"
                  className={spacing.mb0}
                >
                  REQUIREMENT INFO
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container className={spacing.py2}>
              {data.map((each, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <TableContainer className={classes.table}>
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="simple table"
                    >
                      <TableBody>
                        {Object.keys(each).map((key) => (
                          <TableRow key={key}>
                            <TableCell
                              className={spacing.px3}
                              component="th"
                              scope="row"
                            >
                              <strong className={classes.keys}>{key}</strong>
                            </TableCell>
                            <TableCell>
                              <span className={classes.values}>
                                <span className={spacing.mr2}>:</span>
                                <If
                                  condition={key === "Status"}
                                  defaultCase={<span>{each[key]}</span>}
                                >
                                  <Label color={color[each[key]]}>
                                    {REQUIREMENT_STATE_NAME[each[key]]}
                                  </Label>
                                </If>
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ))}
            </Grid>
          </>
        }
      >
        <div className={spacing.pa3}>
          <div className={`${spacing.pb3} ${spacing.pt2}`}>
            <Skeleton animation="wave" />
          </div>
          <Divider />
          <Skeleton animation="wave" className={spacing.mt3} />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
      </If>
    </Paper>
  );
};

export default RequirementDetails;
