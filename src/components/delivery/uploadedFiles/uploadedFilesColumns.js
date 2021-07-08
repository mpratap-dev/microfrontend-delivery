import { Button } from "@material-ui/core";
import React from "react";
import { getAdminTaskFile } from "../../../api/delivery";
import { formatDateTime } from "../../../utils/date-handler";

const { REACT_APP_FILES_HOST } = process.env;

const UseColumns = () => {
  const handleClick = async (event, { fileType, fileName, searchVia }) => {
    event.preventDefault();
    try {
      const filters = {
        file_type: fileType,
        search_via: searchVia,
        search_val: fileName,
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

  return [
    {
      title: "S.No.",
      dataIndex: "id",
      key: "id",
      width: 30,
    },
    {
      title: "Source file",
      dataIndex: "fileName",
      key: "file_name",
      width: 300,
      search: true,
      render: (text, { fileType, fileName }) => (
        <Button
          color="primary"
          style={{ textTransform: "none" }}
          onClick={(event) =>
            handleClick(event, { fileType, fileName, searchVia: "file_name" })
          }
          title={text}
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Output file",
      dataIndex: "outputFileName",
      key: "output_file_name",
      width: 300,
      render: (text, { fileType, outputFileName }) => (
        <Button
          onClick={(event) =>
            handleClick(event, {
              fileType,
              fileName: outputFileName,
              searchVia: "output_file_name",
            })
          }
          color="primary"
          style={{ textTransform: "none" }}
          title={text}
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => formatDateTime(text),
    },
  ];
};

export default UseColumns;
