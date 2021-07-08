import React, { useState, useEffect } from "react";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Button from "@material-ui/core/Button";
import RequirementListing from "./RequirementListing";
import useSpacing from "../../../../hooks/useSpacing";
import { useLocation } from "react-router";
import { Grid } from "@material-ui/core";
import {
  getRequirements,
  uploadRequirements,
  uploadVehicles,
} from "../../../../api/delivery";
import UploadButton from "../../../common/upload-button";
import { makeStyles } from "@material-ui/core/styles";
import If from "../../../common/if";
import { checkPermissions } from "../../../../utils/check-permission";
import { getQueryParamsFromURL } from "../../../../utils/url-handler";

const useStyles = makeStyles((theme) => ({
  btnLink: {
    textDecoration: "none",
  },
}));

const Requirements = () => {
  const spacing = useSpacing();
  const classes = useStyles();
  const { search } = useLocation();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [reqStates, setReqState] = useState({});
  const {
    search_via,
    search_val,
    page_number = 1,
    page_size = 10,
    dropdown_val,
  } = getQueryParamsFromURL(search);
  const [filterData, setFilterData] = useState({
    search_via,
    search_val,
    page_number,
    page_size,
    dropdown_val,
  });

  const getListingData = async () => {
    setLoading(true);
    try {
      const response = await getRequirements(filterData);
      const {
        status,
        data: {
          result: requirement,
          totalAvailableResult: totalAvailableRecord,
        },
      } = response || {};
      if (status) {
        const totalPages = Math.ceil(
          totalAvailableRecord / filterData.page_size
        );

        setTotalRecords(totalAvailableRecord);
        setTotalPage(totalPages);
        setTableData(requirement);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadReqCallback = () => {
    getListingData();
  };

  useEffect(() => {
    const mappedStatus = {};
    Array.isArray(tableData) &&
      tableData.forEach(({ id, state }) => {
        mappedStatus[id] = state;
      });
    setReqState(mappedStatus);
  }, [tableData]);

  return (
    <>
      <Grid container className={spacing.mb4} spacing={2}>
        <If condition={checkPermissions("delivery_requirement", "ADD")}>
          <Grid item>
            <UploadButton
              api={uploadRequirements}
              callback={uploadReqCallback}
              id="upload-requirements"
              accept=".xlsx"
              fileType="requirement_excel"
              buttonProps={{
                variant: "contained",
                color: "primary",
              }}
            >
              Upload Requirements
            </UploadButton>
          </Grid>
          <Grid item>
            <a
              href="https://docs.google.com/spreadsheets/d/1MAV23dPFG3NjZ-jkbY97rr6yzW_CbUQqHPmrmENH_pU/edit#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.btnLink}
            >
              <Button variant="contained" startIcon={<OpenInNewIcon />}>
                Sample Requirements
              </Button>
            </a>
          </Grid>
        </If>
        <Grid item>
          <UploadButton
            api={uploadVehicles}
            id="upload-commitments"
            callback={uploadReqCallback}
            fileType="commitment_excel"
            accept=".xlsx"
            buttonProps={{
              variant: "contained",
              color: "primary",
            }}
          >
            Upload Commitments
          </UploadButton>
        </Grid>
        <Grid item>
          <a
            href="https://docs.google.com/spreadsheets/d/1hQaDJgH6u6_AalLMAIXWoQ1Y_b7F65Yo33L7TbVP9uE/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.btnLink}
          >
            <Button variant="contained" startIcon={<OpenInNewIcon />}>
              Sample Commitments
            </Button>
          </a>
        </Grid>
      </Grid>

      <RequirementListing
        tableData={tableData}
        setTableData={setTableData}
        loading={loading}
        totalPage={totalPage}
        getListingData={getListingData}
        totalRecords={totalRecords}
        reqStates={reqStates}
        setReqState={setReqState}
        filterData={filterData}
        setFilterData={setFilterData}
      />
    </>
  );
};

export default Requirements;
