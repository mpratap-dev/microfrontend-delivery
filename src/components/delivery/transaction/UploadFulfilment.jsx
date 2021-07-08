import React, { useState, useEffect } from "react";
import { uploadTransactions, getClientNames } from "../../../api/delivery";
import UploadButton from "../../common/upload-button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";

const UploadFulfilment = ({ getListingData, pageSize }) => {
  const uploadReqCallback = () =>
    getListingData({ page_number: 1, page_size: pageSize });
  const [clientNames, setClientNames] = useState([]);
  const [client, setClient] = useState("");
  const handleChange = (event, newVal) => {
    newVal ? setClient(newVal.key) : setClient("");
  };

  const getClients = async () => {
    try {
      const { status, data } = await getClientNames();
      if (status) {
        const processedClientNames = data.map((client) => ({
          key: client,
          label: client.replace("_", " "),
        }));
        setClientNames(processedClientNames);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            options={clientNames}
            onChange={handleChange}
            getOptionLabel={(option) => option.label}
            style={{ width: "210px" }}
            size="small"
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                label="Client"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item>
          <UploadButton
            params={{ client }}
            api={uploadTransactions}
            callback={uploadReqCallback}
            id="upload-fulfilment"
            accept=".xlsx"
            fileType="fulfilment_excel"
            condition={!!client}
            conditionFailMessage="Please select a client!"
            buttonProps={{
              variant: "contained",
              color: "primary",
            }}
          >
            Upload Fulfilments
          </UploadButton>
        </Grid>
      </Grid>
    </>
  );
};

export default UploadFulfilment;
