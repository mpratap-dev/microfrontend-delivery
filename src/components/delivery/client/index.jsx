import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getClients } from "../../../api/delivery";
import If from "../../common/if";
import AsyncTable from "../../common/table";
import ClientFilters from "./ClientFilters";
import UseColumns from "./clientListingColumns";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import LinkButton from "../../common/link-button";
import { checkPermissions } from "../../../utils/check-permission";
import useSpacing from "../../../hooks/useSpacing";

const ClientListing = () => {
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
        data: { result: client, totalAvailableResult: totalAvailableRecord },
      } = await getClients(filterData);
      if (status) {
        const totalPages = Math.ceil(
          totalAvailableRecord / filterData.page_size
        );

        setTableData(client);
        setTotalPage(totalPages);
        setTotalRecords(totalAvailableRecord);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
      <If condition={checkPermissions("delivery_client", "ADD")}>
        <LinkButton
          to="/delivery/clients/create"
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          className={spacing.mb4}
        >
          Add client
        </LinkButton>
      </If>
      <br />
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
                ONBOARDED CLIENTS{" "}
                <small>
                  <If condition={!!totalRecords}>({totalRecords} clients)</If>
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

export default ClientListing;
