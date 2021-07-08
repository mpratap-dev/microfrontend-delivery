import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import useSpacing from "../../../../../../hooks/useSpacing";
import { Divider, Grid, Paper } from "@material-ui/core";
import AddCommitmentTable from "./AddCommitmentTable";
import RequirementFilters from "./AddCommitmentsFilters";
import useStyles from "../style";

const AddCommitment = ({
  commitments,
  getCommitedVehicles,
  updateField,
  requirementId
}) => {
  const spacing = useSpacing();
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [filterData, setFilterData] = useState({
    search_val: undefined,
    limit: 100,
    is_delivery_eligible: true,
  });
  const [addCommitments, setAddCommitments] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Paper>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        className={`
        ${spacing.px4}
        ${spacing.pt2} 
        ${!addCommitments.length ? spacing.pb2 : ""}
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
            ADD DRIVERS
          </Typography>
        </Grid>
        <Grid item>
          <RequirementFilters
            filterData={filterData}
            setFilterData={setFilterData}
            loading={loading}
            setLoading={setLoading}
            setAddCommitments={setAddCommitments}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
        </Grid>
      </Grid>
      <Divider />
      <AddCommitmentTable
        commitmentsData={commitments}
        driversData={addCommitments}
        setdriverData={setAddCommitments}
        filterData={filterData}
        loading={loading}
        requirementId={requirementId}
        setLoading={setLoading}
        getCommitedVehicles={getCommitedVehicles}
        updateField={updateField}
        setSearchValue={setSearchValue}
      />
    </Paper>
  );
};

export default AddCommitment;
