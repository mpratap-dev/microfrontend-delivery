import XLSX from "xlsx";
import { saveAs } from "file-saver";

const XLSX_TYPE = "application/octet-stream";

const saveFile = (buffer, fileName) => {
  const data = new Blob([buffer], { type: XLSX_TYPE });
  saveAs(data, fileName);
};

export const exportAsXLSX = (data, fileName) => {
  /* make the worksheet */
  var ws = XLSX.utils.json_to_sheet(data);

  /* add to workbook */
  var wb = {
    Sheets: {
      data: ws,
    },
    SheetNames: ["data"],
  };

  var buf = XLSX.write(wb, { bookType: "xlsx", type: "array" }); // generate a nodejs buffer
  saveFile(buf, fileName);
};
