import React from "react";
import { Typography } from "@material-ui/core";
// import emptyImage from "../../assets/images/emptyImage.png";
import useSpacing from "../../../hooks/useSpacing";
const Empty = (props) => {
  const spacing = useSpacing();

  return (
    <div style={{ textAlign: "center", margin: "0 auto" }}>
      {/* <img src={emptyImage} alt="empty" width="15%"></img> */}
      <Typography className={spacing.mt4} variant="subtitle2">
        {props.message || "No Data Available"}
      </Typography>
    </div>
  );
};

export default Empty;
