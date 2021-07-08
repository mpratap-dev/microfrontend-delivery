import React from "react";
import { Typography } from "@material-ui/core";
import emptyImage from "./empty.png";
import useSpacing from "@oyerickshaw/common.hooks.use-spacing";

const Empty = (props) => {
  const spacing = useSpacing();

  return (
    <div style={{ textAlign: "center", margin: "0 auto" }}>
      <img src={emptyImage} alt="empty" width="15%"></img>
      <Typography className={spacing.mt4} variant="subtitle2">
        {props.message || "No Data Available"}
      </Typography>
    </div>
  );
};

export default Empty;
