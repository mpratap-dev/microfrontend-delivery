import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: ({ color }) => ({
    background: `${color}30`,
    color: color,
    border: `1px solid ${color}`,
    padding: "2px 5px",
    borderRadius: 5,
    fontSize: "10px",
    fontWeight: "bold",
    display: "inline-block",
    boxSizing: "border-box",
  }),
});

const Label = (props) => {
  const { children } = props;
  const classes = useStyles(props);
  return <span className={classes.root}>{children}</span>;
};

export default Label;
