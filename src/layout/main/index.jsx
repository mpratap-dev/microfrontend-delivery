import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    zIndex: 2,
    boxShadow: "0 0 10px rgb(0 0 0 / 30%)",
    borderRadius: "25px 0 0 25px",
    padding: theme.spacing(4),
    marginLeft: -1,
    overflow: "auto",
    background: "#f5f5f5",
    height: "calc(100vh - 64px)",
  },
}));

const Main = ({ Route }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={6}>
      <Route />
    </Paper>
  );
};

export default Main;
