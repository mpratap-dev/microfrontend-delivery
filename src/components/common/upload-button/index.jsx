import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import { getAdminTaskFile } from "../../../api/delivery";
import If from "../../common/if";
import Feedback from "./Feedback";

const { REACT_APP_FILES_HOST } = process.env;

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

const UploadButton = (props) => {
  const {
    callback,
    children,
    api,
    buttonProps,
    id,
    accept,
    defaultFeedback = true,
    fileType,
    params,
    condition = true,
    conditionFailMessage = "Unable to upload",
  } = props;
  const inputFile = useRef(null);
  const { current } = inputFile;
  const [uploading, setUploading] = useState(false);
  const classes = useStyles();
  const [isSnackVisible, toggleSnackbar] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [outputFileName, setOutputFileName] = useState("");
  const [summary, setSummary] = useState({});
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const showSnackbar = ({ message, status }) => {
    setMessage({ text: message, type: status ? "success" : "error" });
    toggleSnackbar(true);
  };

  const showFeedback = ({
    data: { summary: { success, fail } = {}, outputFileName } = {},
    message,
    status,
  }) => {
    if (status) {
      if (!fail) {
        return showSnackbar({
          message: `${fileType} uploaded successfully`,
          status,
        });
      }
      setSummary({ success, fail });
      setOutputFileName(outputFileName);
      setDialogOpen(true);
    } else {
      showSnackbar({ message, status });
    }
  };

  const handleUpload = async (event) => {
    try {
      if (condition) {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", event.target.files[0]);

        if (params) {
          Object.keys(params).forEach((key) => {
            formData.append(key, params[key]);
          });
        }

        const response = await api(formData);
        const { status, message } = response || {};

        if (status) {
          callback && callback(response);
          defaultFeedback && showFeedback(response);
        } else {
          showSnackbar({ message, status: false });
        }
      } else {
        showSnackbar({ message: conditionFailMessage, status: false });
      }
    } catch (error) {
      if (error.response) {
        const { data, statusText } = error.response;
        const message = data.message || statusText;
        showSnackbar({ message, status: false });
      } else if (error.message) {
        showSnackbar({ message: error.message, status: false });
      } else {
        showSnackbar({ message: "Something went wrong", status: false });
      }
    } finally {
      setUploading(false);
    }
  };

  const handleClose = (event, reason) => toggleSnackbar(false);

  const clearValue = () => {
    if (current) {
      current.value = "";
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const downloadFile = async (event) => {
    event.preventDefault();
    try {
      const filters = {
        file_type: fileType,
        search_via: "output_file_name",
        search_val: outputFileName,
      };

      const response = await getAdminTaskFile(filters);
      const { status, data } = response || {};
      if (status) {
        const BASE_HREF = `${REACT_APP_FILES_HOST}delivery/`;
        window.open(BASE_HREF + data.filePath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <input
          accept={accept}
          className={classes.input}
          id={id}
          type="file"
          onChange={handleUpload}
          ref={inputFile}
        />
        <label htmlFor={id}>
          <Button
            {...buttonProps}
            component="span"
            onClick={clearValue}
            startIcon={
              uploading ? (
                <CircularProgress color="inherit" size={16} />
              ) : (
                <BackupOutlinedIcon />
              )
            }
          >
            {children}
          </Button>
        </label>
      </div>

      <If condition={defaultFeedback}>
        <Feedback
          isSnackVisible={isSnackVisible}
          isDialogOpen={isDialogOpen}
          summary={summary}
          message={message}
          handleClose={handleClose}
          handleDialogClose={handleDialogClose}
          downloadFile={downloadFile}
          outputFileName={outputFileName}
        />
      </If>
    </>
  );
};

export default UploadButton;
