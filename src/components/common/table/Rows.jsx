import React, { useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import If from "../if";
import { Checkbox } from "@material-ui/core";
import useStyles from "./styles";

const Rows = ({
  row,
  columns,
  rowKey,
  CollapseComponent,
  collapseComponentProps,
  selection,
  setSelectedRows,
  selectedRows,
  handleChange,
  disableRow,
  striped,
  dense,
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [isRowDisabled, setRowDisabled] = useState(false);
  const { colSpan = columns.length + 1 } = collapseComponentProps || {};
  const isItemSelected = selectedRows
    .map((each) => each[rowKey])
    .includes(row[rowKey]);

  const selectRow = () => {
    let finalSelection = [];
    let changeType = "";
    if (isItemSelected) {
      finalSelection = selectedRows.filter(
        (each) => each[rowKey] !== row[rowKey]
      );
      changeType = "selected";
    } else {
      finalSelection = [...selectedRows, row];
      changeType = "unselected";
    }

    setSelectedRows(finalSelection);
    typeof handleChange === "function" &&
      handleChange(row, finalSelection, changeType);
  };

  const conditionalTableRowProps = {};

  if (selection && !isRowDisabled) {
    conditionalTableRowProps.onClick = selectRow;
  }

  useEffect(() => {
    typeof disableRow === "function" && setRowDisabled(disableRow(row));
    open && setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

  return (
    <>
      <TableRow
        {...conditionalTableRowProps}
        className={`
        ${striped ? classes.stripRow : ""}
        ${isRowDisabled ? classes.disableRow : ""}
      `}
      >
        <If condition={!!selection}>
          <TableCell>
            <Checkbox
              checked={isItemSelected}
              disabled={isRowDisabled}
              size={dense ? "small" : "medium"}
            />
          </TableCell>
        </If>
        <If condition={!!CollapseComponent}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </If>
        {columns.map(
          ({ key, dataIndex, render, width, align = "left" }, index) => {
            console.log(`${key}_${row[rowKey]}_${index}`);
            return (
              <TableCell
                style={{ width: width || "" }}
                key={`${key}_${row[rowKey]}_${index}`}
                align={align}
              >
                <span className={classes.tableCell}>
                  {render
                    ? render(row[dataIndex], row, {
                        toggleCollapse: setOpen,
                        disableRow,
                      })
                    : row[dataIndex]}
                </span>
              </TableCell>
            );
          }
        )}
      </TableRow>

      {/* Collapse row */}
      {CollapseComponent && (
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={colSpan}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <CollapseComponent row={row} {...collapseComponentProps} />
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default Rows;
