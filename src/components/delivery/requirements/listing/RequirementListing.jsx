import React, { useEffect, useState } from "react";
import AsyncTable from "../../../common/table";
import UseColumns from "./reqListingColumns";
import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core";
import useSpacing from "../../../../hooks/useSpacing";
import Snackbar from "@material-ui/core/Snackbar";
import If from "../../../common/if";
import RequirementFilters from "./RequirementFilters";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";
import { serialize } from "../../../../utils/url-handler";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RequirementListing = ({
  totalPage,
  getListingData,
  tableData,
  loading,
  reqStates,
  setReqState,
  totalRecords,
  filterData,
  setFilterData,
}) => {
  const spacing = useSpacing();
  const history = useHistory();

  const [message, setMessage] = useState({
    type: "success",
    text: "",
    visibility: false,
  });

  const columns = UseColumns({
    reqStates,
    setReqState,
    setMessage,
    getListingData,
  });

  const handleFilters = ({ page, pageSize }) => {
    setFilterData({ ...filterData, page_number: page, page_size: pageSize });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage({ ...message, visibility: false });
  };

  const paginationProps = {
    total: totalPage,
    page: filterData.page_number,
    pageSize: filterData.page_size,
    handleChange: handleFilters,
    showSizeChanger: true,
  };

  useEffect(() => {
    getListingData();
    history.push({ search: serialize(filterData) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterData.search_val,
    filterData.search_via,
    filterData.page_size,
    filterData.page_number,
  ]);

  return (
    <>
      <Paper>
        <Box p={2}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="strong"
                className={spacing.mb0}
                color="primary"
              >
                REQUIREMENTS{" "}
                <small>
                  <If condition={!!totalRecords}>
                    ({totalRecords} requirements)
                  </If>
                </small>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <RequirementFilters
                filterData={filterData}
                setFilterData={setFilterData}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <AsyncTable
          pagination={paginationProps}
          data={tableData}
          dense
          scroll
          striped
          rowKey="id"
          loading={loading}
          columns={columns}
          handleChange={handleFilters}
          setMessage={setMessage}
        />
      </Paper>
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

export default RequirementListing;
