import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import { getHubs, fetchRegionDetail } from "../../../api/delivery";
import useSpacing from "../../../hooks/useSpacing";
import LinkButton from "../../common/link-button";
import AsyncTable from "../../common/table/AsyncTable";
import UseColumns from "./hubListingColumns";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import If from "../../common/if";
import HubFilters from "./HubFilters";
import HubDetailsDialog from "./HubDetailsDialog";
import { checkPermissions } from "../../../utils/check-permission";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  status: {
    display: "flex",
    alignItems: "center",
  },
  menuButton: {
    width: "100%",
    textTransform: "none",
    textAlign: "left",

    "& .MuiButton-label": {
      justifyContent: "left",
    },
  },
}));

const HubListing = () => {
  const HAVE_EDIT_PERMISSIONS = checkPermissions("delivery_client_hub", "EDIT");
  const HAVE_EDIT_SLOT_PERMISSION = checkPermissions(
    "delivery_client_hub_slot",
    "EDIT"
  );
  const HAVE_ADD_SLOT_PERMISSION = checkPermissions(
    "delivery_client_hub_slot",
    "ADD"
  );
  const [tableData, setTableData] = useState([]);
  const [regions, setRegions] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const spacing = useSpacing();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRowData, setActiveRowData] = useState("");
  const [filterData, setFilterData] = useState({
    search_via: undefined,
    search_val: undefined,
    page_number: 1,
    page_size: 10,
  });

  const openActionMenu = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setActiveRowData(rowData);
  };

  const closeActionMenu = () => setAnchorEl(null);

  const getRegionData = async (clientHub) => {
    const mappedRegionNames = {};
    const regionIds = clientHub
      .map((each) => each.regionId)
      .filter((each) => !!each);
    const uniqueRegionIDs = [...new Set(regionIds)];
    const {
      data: { data, status },
    } = await fetchRegionDetail(String(uniqueRegionIDs))();
    if (!status) {
    }

    Array.isArray(data) &&
      data.forEach(({ region_id, region_name }) => {
        mappedRegionNames[region_id] = region_name;
      });

    setRegions(mappedRegionNames);
  };

  const getListingData = async () => {
    setLoading(true);
    try {
      const response = await getHubs(filterData);
      const {
        status,
        data: { result: clientHub, totalAvailableResult: totalAvailableRecord },
      } = response || {};

      if (status) {
        const totalPages = Math.ceil(
          totalAvailableRecord / filterData.page_size
        );

        Array.isArray(clientHub) && getRegionData(clientHub);
        setTotalPages(totalPages);
        setTableData(clientHub);
        setTotalRecords(totalAvailableRecord);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilters = ({ page, pageSize }) => {
    setFilterData({ ...filterData, page_number: page, page_size: pageSize });
  };

  const openDialog = (rowData) => {
    setDialogData(rowData);
    setDialogOpen(true);
  };

  const paginationProps = {
    total: totalPages,
    page: filterData.page_number,
    pageSize: filterData.page_size,
    handleChange: handleFilters,
    showSizeChanger: true,
  };

  const columns = UseColumns({ regions, openActionMenu });

  useEffect(() => {
    getListingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  return (
    <>
      <If condition={checkPermissions("delivery_client_hub", "ADD")}>
        <LinkButton
          variant="contained"
          color="primary"
          to="/delivery/hubs/create"
          className={spacing.mb4}
          startIcon={<AddCircleOutlineIcon />}
        >
          Add hubs
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
                CLIENT HUBS{" "}
                <small>
                  <If condition={!!totalRecords}>({totalRecords} hubs)</If>
                </small>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <HubFilters
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

      <HubDetailsDialog
        dialogData={dialogData}
        setDialogOpen={setDialogOpen}
        isDialogOpen={isDialogOpen}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeActionMenu}
      >
        <If condition={HAVE_EDIT_PERMISSIONS}>
          <LinkButton
            className={`${spacing.pa0} ${classes.menuButton}`}
            to={`/delivery/hubs/edit/${activeRowData.id}`}
          >
            <MenuItem onClick={closeActionMenu}>Edit hubs</MenuItem>
          </LinkButton>
        </If>
        <If condition={HAVE_ADD_SLOT_PERMISSION}>
          <LinkButton
            className={`${spacing.pa0} ${classes.menuButton}`}
            to={`/delivery/hubs/create/${activeRowData.id}/slots`}
          >
            <MenuItem onClick={closeActionMenu}>Add slots</MenuItem>
          </LinkButton>
        </If>
        <If condition={HAVE_EDIT_SLOT_PERMISSION}>
          <LinkButton
            className={`${spacing.pa0} ${classes.menuButton}`}
            to={`/delivery/hubs/edit/${activeRowData.id}/slots`}
          >
            <MenuItem onClick={closeActionMenu}>Edit slots</MenuItem>
          </LinkButton>
        </If>
        <MenuItem onClick={() => openDialog(activeRowData)}>Details</MenuItem>
      </Menu>
    </>
  );
};

export default HubListing;
