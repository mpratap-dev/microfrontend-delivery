import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import UseColumns from "./uploadedFilesColumns";
import AsyncTable from "../../common/table/AsyncTable";
import { getFilesList } from "../../../api/delivery";
import useSpacing from "../../../hooks/useSpacing";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import If from "../../common/if";

const UploadedFiles = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const spacing = useSpacing();
  const columns = UseColumns();
  const [filterData, setFilterData] = useState({
    file_type: undefined,
    search_via: undefined,
    search_val: undefined,
    page_number: 1,
    page_size: 10,
  });

  const getListingData = async () => {
    setLoading(true);
    try {
      const response = await getFilesList(filterData);
      const {
        status,
        data: {
          result: adminTaskFile,
          totalAvailableResult: totalAvailableRecord,
        },
      } = response || {};
      if (status) {
        const totalPages = Math.ceil(
          totalAvailableRecord / filterData.page_size
        );
        setTotalPage(totalPages);
        setTableData(adminTaskFile);
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

  const handleChange = (event) => {
    setFilterData({
      ...filterData,
      page_number: 1,
      file_type: event.target.value,
    });
  };

  useEffect(() => {
    getListingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  return (
    <>
      <Paper>
        <Box p={2}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item span={6}>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="strong"
                className={spacing.mb0}
                color="primary"
              >
                UPLOADED FILES{" "}
                <small>
                  <If condition={!!totalRecords}>({totalRecords} files)</If>
                </small>
              </Typography>
            </Grid>
            <Grid item span={6}>
              <TextField
                id="hub-status"
                select
                style={{ width: 190 }}
                label="Type"
                value={filterData.file_type}
                onChange={handleChange}
                variant="outlined"
                size="small"
              >
                <MenuItem value="requirement_excel">Requirements</MenuItem>
                <MenuItem value="commitment_excel">Commitments</MenuItem>
                <MenuItem value="fulfilment_excel">Fulfilment</MenuItem>
                <MenuItem value="client_driver_mapping_excel">
                  Client driver mapping
                </MenuItem>
              </TextField>
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

export default UploadedFiles;
