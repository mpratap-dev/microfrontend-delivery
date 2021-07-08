import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { getRateCard } from "../../../api/delivery";
import AsyncTable from "../../common/table/AsyncTable";
import UseColumns from "./rateCardColumns";
import useSpacing from "../../../hooks/useSpacing";
import If from "../../common/if";
import RateCardFilters from "./RateCardFilters";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ClientListing = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rateCardStatus, setStatus] = useState({});
  const [open, setOpen] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const columns = UseColumns({ rateCardStatus, setStatus, setOpen });
  const spacing = useSpacing();
  const [filterData, setFilterData] = useState({
    search_via: undefined,
    search_val: undefined,
    page_number: 1,
    page_size: 10,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getListingData = async () => {
    setLoading(true);
    try {
      const response = await getRateCard(filterData);
      const {
        status,
        data: { result, totalAvailableResult },
      } = response || {};
      if (status) {
        const totalPages = Math.ceil(
          totalAvailableResult / filterData.page_size
        );
        setTableData(result);
        setTotalPage(totalPages);
        setTotalRecords(totalAvailableResult);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilters = ({ page, pageSize }) => {
    setFilterData({ ...filterData, page_number: page, page_size: pageSize });
  };

  const paginationProps = {
    total: totalPage,
    page: filterData.page_number,
    pageSize: filterData.page_size,
    handleChange: handleFilters,
    showSizeChanger: true,
  };

  useEffect(() => {
    getListingData({ page_number: 1, page_size: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  useEffect(() => {
    const mappedStatus = {};

    Array.isArray(tableData) &&
      tableData.forEach(({ id, state }) => {
        mappedStatus[id] = state === 4;
      });
    setStatus(mappedStatus);
  }, [tableData]);

  return (
    <Paper>
      <Box p={2}>
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="strong"
              className={spacing.mb0}
              color="primary"
            >
              RATE CARDS{" "}
              <small>
                <If condition={!!totalRecords}>({totalRecords} rate cards)</If>
              </small>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <RateCardFilters
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
        rowKey="id"
        loading={loading}
        columns={columns}
        handleChange={handleFilters}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Status changed successfully
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ClientListing;
