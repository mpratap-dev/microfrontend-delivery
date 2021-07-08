import React, { useEffect, useState } from "react";
import AsyncTable from "../../common/table";
import UseColumns from "./fulfilmentColumns";
import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core";
import useSpacing from "../../../hooks/useSpacing";
import FulfilmentFilters from "./FulfilmentFilters";
import If from "../../common/if";

const RequirementListing = ({
  pageSize,
  pageCount,
  getListingData,
  freezedReqs,
  setFreezedReq,
  tableData,
  loading,
  totalRecords,
}) => {
  const columns = UseColumns(freezedReqs, setFreezedReq);
  const spacing = useSpacing();
  const [filterData, setFilterData] = useState({
    search_via: undefined,
    search_val: undefined,
    page_number: 1,
    page_size: pageSize,
  });
  const handleFilters = ({ page, pageSize }) => {
    setFilterData({ ...filterData, page_number: page, page_size: pageSize });
  };

  const paginationProps = {
    total: pageCount,
    page: filterData.page_number,
    handleChange: handleFilters,
    showSizeChanger: true,
  };

  useEffect(() => {
    getListingData(filterData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  return (
    <Paper>
      <Box p={2}>
        <Grid spacing={2} container justify="space-between" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="strong"
              className={spacing.mb0}
              color="primary"
            >
              All Transactions{" "}
              <small>
                <If condition={!!totalRecords}>
                  ({totalRecords} transactions)
                </If>
              </small>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FulfilmentFilters
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
        elevation={0}
        dense
        scroll
        rowKey="id"
        loading={loading}
        columns={columns}
        handleChange={handleFilters}
      />
    </Paper>
  );
};

export default RequirementListing;
