import React, { useState } from "react";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Button from "@material-ui/core/Button";
import FulfilmentListing from "./FulfilmentListing";
import useSpacing from "../../../hooks/useSpacing";
import { Grid } from "@material-ui/core";
import { getTransactions } from "../../../api/delivery";
import { checkPermissions } from "../../../utils/check-permission";
import If from "../../common/if";
import { makeStyles } from "@material-ui/core/styles";
import UploadFulfilment from "./UploadFulfilment";
import { FULFILMENT_STATE } from "../../../constant/delivery";

const { PENDING_APPROVAL } = FULFILMENT_STATE;

const useStyles = makeStyles((theme) => ({
  btnLink: {
    textDecoration: "none",
  },
}));

const Requirements = () => {
  const spacing = useSpacing();
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [freezedReqs, setFreezedReq] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const getListingData = async (filters) => {
    setLoading(true);
    setPageSize(filters.page_size);
    //make request body
    var params = new URLSearchParams();
    params.append("page_number", filters.page_number);
    params.append("page_size", filters.page_size);
    let search_via = "";
    if (filters.search_via) {
      search_via = filters.search_via + ",";
    }
    search_via += "state";
    params.append("search_via", search_via);
    if (filters.search_val) params.append("search_val", filters.search_val);
    params.append("search_val", PENDING_APPROVAL);
    try {
      const response = await getTransactions(params);
      const {
        status,
        data: {
          result: fulfilment,
          totalAvailableResult: totalAvailableRecord,
        },
      } = response || {};
      if (status) {
        const totalPages = Math.ceil(totalAvailableRecord / filters.page_size);

        setTableData(fulfilment);
        setPageCount(totalPages);
        setTotalRecords(totalAvailableRecord);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container className={spacing.mb4} spacing={2}>
        <If condition={checkPermissions("delivery_fulfilment", "ADD")}>
          <Grid item>
            <UploadFulfilment
              getListingData={getListingData}
              pageSize={pageSize}
            />
          </Grid>
          <Grid item>
            <a
              href="https://drive.google.com/drive/folders/1_bCBmrmAXfhBJDgAdPLKAsMHkJ_yvFtp"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.btnLink}
            >
              <Button variant="contained" startIcon={<OpenInNewIcon />}>
                Sample Fulfilments
              </Button>
            </a>
          </Grid>
        </If>
      </Grid>

      <FulfilmentListing
        tableData={tableData}
        setTableData={setTableData}
        loading={loading}
        pageCount={pageCount}
        pageSize={pageSize}
        getListingData={getListingData}
        freezedReqs={freezedReqs}
        setFreezedReq={setFreezedReq}
        totalRecords={totalRecords}
      />
    </>
  );
};

export default Requirements;
