import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getDriverListing, uploadDriverDetails } from "../../../api/delivery";
import useSpacing from "../../../hooks/useSpacing";
import If from "../../common/if";
import AsyncTable from "../../common/table/AsyncTable";
import ClientFilters from "./DriverDetailsFilters";
import UseColumns from "./DriverDetailsListingColumns";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import LinkButton from "../../common/link-button";
import UploadButton from "../../common/upload-button";
import { makeStyles } from "@material-ui/core/styles";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  btnLink: {
    textDecoration: "none",
  },
}));

const DriverDetailsListing = () => {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const spacing = useSpacing();
  const columns = UseColumns();
  const [filterData, setFilterData] = useState({
    search_via: undefined,
    search_val: undefined,
    page_number: 1,
    page_size: 10,
  });

  const getListingData = async () => {
    setLoading(true);
    try {
      const {
        status,
        data: {
          result: clientDriverMapping,
          totalAvailableResult: totalAvailableRecord,
        },
      } = await getDriverListing(filterData);
      if (status) {
        const totalPages = Math.ceil(
          totalAvailableRecord / filterData.page_size
        );

        setTableData(clientDriverMapping);
        setTotalPage(totalPages);
        setTotalRecords(totalAvailableRecord);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const uploadReqCallback = () => {
    getListingData();
  };

  const handleFilters = ({ value, column, page, pageSize }) => {
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
    getListingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  return (
    <>
      <Grid container className={spacing.mb4} spacing={2}>
        <Grid item>
          <LinkButton
            to="/delivery/driver-details/create"
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            className={spacing.mb4}
          >
            Add driver details
          </LinkButton>
        </Grid>
        <Grid item>
          <UploadButton
            api={uploadDriverDetails}
            callback={uploadReqCallback}
            id="upload-mapping"
            accept=".xlsx"
            fileType="client_driver_mapping_excel"
            buttonProps={{
              variant: "contained",
              color: "primary",
            }}
          >
            Upload mapping
          </UploadButton>
        </Grid>
        <Grid item>
          <a
            href="https://docs.google.com/spreadsheets/d/1W3OiBFz-7WI29OuC10EAXxyqHkJYcOl9YDyxWX0vUe4/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.btnLink}
          >
            <Button
              variant="contained"
              // color="primary"
              startIcon={<OpenInNewIcon />}
            >
              Sample mapping
            </Button>
          </a>
        </Grid>
      </Grid>
      <Paper>
        <Box p={2}>
          <Grid
            container
            spacing={2}
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={4}>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="strong"
                className={spacing.mb0}
                color="primary"
              >
                CLIENT DRIVER DETAILS{" "}
                <small>
                  <If condition={!!totalRecords}>({totalRecords} records)</If>
                </small>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <ClientFilters
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
          rowKey="id"
          loading={loading}
          columns={columns}
          handleChange={handleFilters}
        />
      </Paper>
    </>
  );
};

export default DriverDetailsListing;
