/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import If from "@oyerickshaw/common.ui.if";
import AsyncPagination from "./AsyncPagination";
import SearchIcon from "@material-ui/icons/Search";
import { debounce } from "lodash";
import { 
  Box, 
  Checkbox, 
  Divider, 
  Typography, 
  CircularProgress, 
  Backdrop, 
  Grid, 
  Popover, 
  TextField, 
  TableSortLabel,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
} from "@material-ui/core";
import Empty from "@oyerickshaw/common.ui.empty";
import useSpacing from "@oyerickshaw/common.hooks.use-spacing";
import AsyncPageSize from "./AsyncPageSize";
import Rows from "./Rows";
import useStyles from "./styles";

const AsyncTable = ({
  data = [],
  pagination,
  columns,
  dense,
  striped,
  handleChange,
  rowKey = "id",
  CollapseComponent,
  loading,
  title,
  scroll,
  collapseComponentProps,
  PageSizeComponent,
  selection,
  elevation,
  disableRow,
}) => {
  const {
    showSizeChanger,
    pageSizeOptions = [10, 15, 20],
    page,
    pageSize,
    handleChange: handlePageChange,
  } = pagination || {};
  const { colSpan = columns.length + 1 } = collapseComponentProps || {};
  const cellColSpan = CollapseComponent
    ? colSpan
    : selection
    ? columns.length + 1
    : columns.length;
  const classes = useStyles();
  const spacing = useSpacing();
  const [searchPopupData, setPopupData] = useState({
    anchorEl: null,
    activeColumnLabel: "",
    activeColumnName: "",
    searchTerm: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [pageData, setPageData] = useState({
    page: page || 1,
    pageSize: pageSize || 10,
  });
  const [activeRows, setActiveRows] = useState([]);

  const isSearchPopupOpen = Boolean(searchPopupData.anchorEl);

  const closeSearchPopup = () => {
    setPopupData({
      ...searchPopupData,
      anchorEl: null,
    });
  };

  const openSearchPopup = (event, label, name) => {
    setPopupData({
      ...searchPopupData,
      anchorEl: event.currentTarget,
      activeColumnLabel: label,
      activeColumnName: name,
    });
  };

  const debouceSearch = debounce((data) => {
    handleChange({ ...data, ...pageData });
    setPopupData({ ...searchPopupData, searchTerm: data.value });
  }, 500);

  const searchField = (event, column) => {
    const value = event.target.value;
    debouceSearch({ value, column });
  };

  const handleSelectAll = (event) => {
    let finalSelectedRows = [];
    if (event.target.checked) {
      finalSelectedRows = activeRows;
    } else {
      finalSelectedRows = [];
    }
    setSelectedRows(finalSelectedRows);
    handleChange(finalSelectedRows, finalSelectedRows);
  };

  const allRowsSelected =
    !!activeRows.length && activeRows.length === selectedRows.length;
  const isIndeterminate =
    !!selectedRows.length && selectedRows.length !== activeRows.length;
  const isAllRowsDisabled = data.every(
    (data) => typeof disableRow === "function" && disableRow(data)
  );

  useEffect(() => {
    setPageData({
      page: page || 1,
      pageSize: pageSize || 10,
    });
  }, [page]);

  useEffect(() => {
    const activeRows = data.filter((each) => {
      return typeof disableRow === "function" ? !disableRow(each) : data;
    });
    setActiveRows(activeRows);
  }, [data]);

  useEffect(() => {
    setSelectedRows([]);
  }, [loading]);

  return (
    <>
      <Paper className={`${spacing.pb4} ${classes.root}`} elevation={elevation}>
        <div
          className={`tableContainer ${scroll ? classes.tableContainer : ""}`}
        >
          <If condition={!!title}>
            <Box p={2}>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="strong"
                className={spacing.mb0}
                color="primary"
              >
                {title}
              </Typography>
            </Box>
            <Divider />
          </If>
          <Table
            className={`${classes.table} ${scroll ? classes.tableScroll : ""}`}
            aria-label="simple table"
            size={dense ? "small" : ""}
          >
            <TableHead>
              <TableRow>
                <If condition={!!CollapseComponent || !!selection}>
                  <TableCell style={{ width: 30 }}>
                    <If condition={!!selection}>
                      <Checkbox
                        onChange={handleSelectAll}
                        checked={allRowsSelected}
                        indeterminate={isIndeterminate}
                        disabled={isAllRowsDisabled}
                        size={dense ? "small" : "medium"}
                      />
                    </If>
                  </TableCell>
                </If>
                {columns.map(
                  ({
                    title,
                    key,
                    dataIndex,
                    align = "left",
                    search,
                    width,
                  }) => {
                    return (
                      <TableCell
                        component="th"
                        key={key}
                        align={align}
                        style={{ width: width || "", fontWeight: 600 }}
                      >
                        <If condition={!!search} defaultCase={title}>
                          <TableSortLabel
                            active
                            direction={"desc"}
                            IconComponent={() => (
                              <SearchIcon
                                className={spacing.ml4}
                                fontSize="small"
                              />
                            )}
                            onClick={(event) => {
                              openSearchPopup(event, title, key);
                            }}
                          >
                            {title}
                          </TableSortLabel>
                          <Popover
                            id={key}
                            open={isSearchPopupOpen}
                            anchorEl={searchPopupData.anchorEl}
                            onClose={closeSearchPopup}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                          >
                            <div className={classes.popover}>
                              <TextField
                                id={`standard-search-${key}`}
                                label={
                                  search &&
                                  search.type &&
                                  !search.type.includes("date")
                                    ? `Search ${searchPopupData.activeColumnLabel.toLowerCase()}`
                                    : ""
                                }
                                type={search && (search.type || "search")}
                                variant="outlined"
                                size="small"
                                onChange={(event) =>
                                  searchField(
                                    event,
                                    searchPopupData.activeColumnName
                                  )
                                }
                              />
                            </div>
                          </Popover>
                        </If>
                      </TableCell>
                    );
                  }
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <If
                condition={Array.isArray(data) && data.length}
                defaultCase={
                  <TableRow>
                    <TableCell
                      style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        borderBottom: 0,
                      }}
                      colSpan={cellColSpan}
                    >
                      <Box p={5}>
                        <Empty />
                      </Box>
                    </TableCell>
                  </TableRow>
                }
              >
                {data.map((row) => (
                  <Rows
                    columns={columns}
                    disableRow={disableRow}
                    rowKey={rowKey}
                    key={row[rowKey]}
                    row={row}
                    dense={dense}
                    CollapseComponent={CollapseComponent}
                    collapseComponentProps={collapseComponentProps}
                    selection={selection}
                    setSelectedRows={setSelectedRows}
                    handleChange={handleChange}
                    selectedRows={selectedRows}
                    striped={striped}
                  />
                ))}
              </If>
            </TableBody>
          </Table>
        </div>
        <If condition={!!(showSizeChanger || pagination)}>
          <div className={classes.footer}>
            <Grid
              container
              className={spacing.mt4}
              spacing={2}
              alignItems="center"
            >
              <Grid item xs={12} sm={2}>
                <If
                  condition={!!showSizeChanger}
                  defaultCase={PageSizeComponent}
                >
                  <AsyncPageSize
                    pageSizeOptions={pageSizeOptions}
                    setPageData={setPageData}
                    handleChange={handlePageChange}
                    pageData={pageData}
                    searchPopupData={searchPopupData}
                  />
                </If>
              </Grid>
              <Grid item xs={12} sm={10}>
                <If condition={!!pagination}>
                  <AsyncPagination
                    {...pagination}
                    setPageData={setPageData}
                    pageData={pageData}
                    searchPopupData={searchPopupData}
                  />
                </If>
              </Grid>
            </Grid>
          </div>
        </If>
        <Backdrop className={classes.backdrop} open={!!loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
    </>
  );
};

export default AsyncTable;
